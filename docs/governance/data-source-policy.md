# Data source, provenance and publication policy

## Core rule

Digital Ghana indexes or republishes data only when authority, provenance and permitted use are explicit. A technically accessible source is not automatically licensed for canonical reuse.

## Required source record

Every canonical source must record:

- source authority and publisher;
- source title and stable URL or reference;
- publication/effective/retrieval dates;
- licence or written permission, including unknown status;
- checksum of the retrieved artifact where possible;
- importer/version and transformation history;
- reviewer and publication decision;
- limitations, expiry or next-review date.

## Publication workflow

1. Discover or receive source material.
2. Record provenance and licence status.
3. Import into an isolated draft/staging area.
4. Validate schema, identifiers, referential integrity and domain rules.
5. Review diffs and conflicts with a human data steward.
6. Publish an immutable version with checksum and changelog.
7. Monitor freshness and retain a tested rollback path.

Automated watchers may detect changes and prepare drafts. They may not silently publish canonical data scraped from the web.

## Safety boundaries

- Unknown licence means `unknown`, not assumed open.
- Restricted sources may be linked/indexed when permitted but are not copied.
- Personal data is minimized; these products are public-reference infrastructure, not citizen profiles.
- Official status or government endorsement is never implied without written authorization.
- Conflicting authoritative sources are surfaced for review; systems never guess silently.
- Historical corrections preserve effective dates and stable identifier lineage.
