#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "httpx",
#     "python-dotenv",
# ]
# ///
"""
Add domain aliases to a Netlify site for all clinic subdomains.

Usage:
    uv run scripts/add_netlify_domain_aliases.py [--execute]

Reads data/contacts.json, constructs {subdomain}.seo-doctor.ro for each clinic,
and adds them as domain aliases on the stomatologie.netlify.app site.

Runs in dry-run mode by default. Pass --execute to actually create aliases.
Requires NETLIFY_API_KEY in .env or environment.
"""

import argparse
import json
import os
import sys
from pathlib import Path

import httpx
from dotenv import load_dotenv


NETLIFY_API = "https://api.netlify.com/api/v1"
SITE_SLUG = "stomatologie.netlify.app"
DOMAIN_SUFFIX = "seo-doctor.ro"


def load_subdomains(contacts_path: Path) -> list[str]:
    with open(contacts_path) as f:
        contacts = json.load(f)
    subdomains = [c["subdomain"] for c in contacts if c.get("subdomain")]
    return subdomains


def get_site(client: httpx.Client) -> dict:
    resp = client.get(f"{NETLIFY_API}/sites/{SITE_SLUG}")
    resp.raise_for_status()
    return resp.json()


def update_site_domain_aliases(client: httpx.Client, site_id: str, aliases: list[str]) -> dict:
    resp = client.patch(
        f"{NETLIFY_API}/sites/{site_id}",
        json={"domain_aliases": aliases},
    )
    resp.raise_for_status()
    return resp.json()


def main() -> None:
    load_dotenv()

    token = os.environ.get("NETLIFY_API_KEY")
    if not token:
        print(
            "Error: NETLIFY_API_KEY not found. Set it in .env or as an environment variable.",
            file=sys.stderr,
        )
        sys.exit(1)

    parser = argparse.ArgumentParser(
        description="Add domain aliases to a Netlify site for all clinic subdomains.",
    )
    parser.add_argument(
        "--execute",
        action="store_true",
        help="Actually create the domain aliases (default: dry run only)",
    )
    parser.add_argument(
        "--skip",
        type=int,
        default=0,
        help="Number of entries to skip from the beginning",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Maximum number of entries to process",
    )
    parser.add_argument(
        "--contacts",
        type=Path,
        default=None,
        help="Path to contacts.json (default: data/contacts.json relative to repo root)",
    )
    args = parser.parse_args()

    # Resolve contacts.json path
    if args.contacts:
        contacts_path = args.contacts
    else:
        repo_root = Path(__file__).resolve().parent.parent
        contacts_path = repo_root / "data" / "contacts.json"

    if not contacts_path.exists():
        print(f"Error: {contacts_path} not found.", file=sys.stderr)
        sys.exit(1)

    subdomains = load_subdomains(contacts_path)
    if not subdomains:
        print("No subdomains found in contacts.json.", file=sys.stderr)
        sys.exit(1)

    all_domains = [f"{s}.{DOMAIN_SUFFIX}" for s in subdomains]
    new_domains = all_domains[args.skip:]
    if args.limit is not None:
        new_domains = new_domains[:args.limit]

    dry_run = not args.execute
    mode = "[DRY RUN] " if dry_run else ""

    if args.skip or args.limit:
        print(f"\n{mode}Domain aliases to add ({len(new_domains)} of {len(all_domains)} total, skip={args.skip}):\n")
    else:
        print(f"\n{mode}Domain aliases to add ({len(new_domains)}):\n")
    for domain in new_domains:
        print(f"  {domain}")
    print()

    if dry_run:
        print("Dry run complete. Pass --execute to create these domain aliases.")
        return

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    with httpx.Client(headers=headers, timeout=30) as client:
        print(f"Fetching site info for {SITE_SLUG}...")
        site = get_site(client)
        site_id = site["id"]
        existing_aliases = site.get("domain_aliases") or []
        print(f"Site ID: {site_id}")
        print(f"Existing domain aliases: {len(existing_aliases)}")

        # Determine which domains are actually new
        existing_set = set(existing_aliases)
        to_add = [d for d in new_domains if d not in existing_set]
        already_present = [d for d in new_domains if d in existing_set]

        if already_present:
            print(f"\nAlready present (will skip):")
            for d in already_present:
                print(f"  {d}")

        if not to_add:
            print("\nAll requested aliases already exist. Nothing to do.")
            return

        merged = existing_aliases + to_add

        print(f"\nWill add {len(to_add)} new alias(es) (total after: {len(merged)}):")
        for d in to_add:
            print(f"  + {d}")
        print()

        # Confirm before creating
        try:
            answer = input(
                f"Update {SITE_SLUG} domain aliases? [y/N] "
            ).strip()
        except (EOFError, KeyboardInterrupt):
            print("\nAborted.")
            sys.exit(1)

        if answer.lower() != "y":
            print("Aborted.")
            return

        try:
            result = update_site_domain_aliases(client, site_id, merged)
            final_aliases = result.get("domain_aliases") or []
            print(f"\nDone. Site now has {len(final_aliases)} domain alias(es).")
        except httpx.HTTPStatusError as e:
            print(
                f"\nFAILED: {e.response.status_code}: {e.response.text}",
                file=sys.stderr,
            )
            sys.exit(1)


if __name__ == "__main__":
    main()
