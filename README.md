# Cremer Lab Website

This is the source for [cremerlab.github.io](https://cremerlab.github.io), built with [Quarto](https://quarto.org).

## Prerequisites

- [Quarto CLI](https://quarto.org/docs/get-started/) installed
- Python with `pandas` available

## Local preview

```bash
quarto preview
```

## Publishing

```bash
quarto publish gh-pages
```

---

## Site structure

| File | Purpose |
|---|---|
| `_quarto.yml` | Site config, navigation bar, footer |
| `index.qmd` | Homepage (news feed, research themes) |
| `people.qmd` | People grid, Lab Life gallery, Alumni table |
| `publications.qmd` | Publications list |
| `research.qmd` | Research page |
| `software.qmd` | Tools & code page |
| `courses.qmd` | Courses page |
| `join.qmd` | Join/open positions page |
| `contact.qmd` | Contact page |
| `styles.scss` | Custom CSS |

All dynamic content is driven by CSV files in `data/`.

---

## How to add or update people

Edit `data/people.csv`. Each row is one person.

**Columns:**

| Column | Description | Example |
|---|---|---|
| `name` | Full name | `Jane Smith` |
| `title` | Role/position | `PhD Student in Biology` |
| `dates` | Date range string | `September 2023 – present` |
| `image` | Filename in `images/members/` | `jane.jpg` |
| `email` | Email address (no `mailto:`) | `jsmith@stanford.edu` |
| `twitter` | Full Twitter/X URL | `https://twitter.com/jsmith` |
| `bluesky` | Full Bluesky URL | `https://bsky.app/profile/...` |
| `website` | Personal website URL | `https://jsmith.com` |
| `orcid` | Full ORCID URL | `https://orcid.org/0000-...` |
| `scholar` | Full Google Scholar URL | `https://scholar.google.com/...` |
| `github` | Full GitHub URL | `https://github.com/jsmith` |
| `bio` | Short biography text | `Jane is a PhD student...` |
| `alumni` | Set to `true` to move to Alumni section | `true` |
| `now` | Current position (alumni only) | `Postdoc at MIT` |
| `now_link` | Link for current position (alumni only) | `https://mit.edu/...` |

**Adding a new member:**
1. Add a row to `data/people.csv` with `alumni` left blank (not `true`).
2. Add their photo to `images/members/` — the filename must match the `image` column.
3. If no photo is available yet, leave the `image` column blank; a placeholder will be shown.

Members are displayed alphabetically by last name, with Jonas Cremer always first.

**Moving someone to alumni:**
1. In their row in `data/people.csv`, set `alumni` to `true`.
2. Update `dates` so it ends with a year (e.g. `September 2023 – June 2025`) — the last 4-digit year is used as the "Year" in the alumni table.
3. Optionally fill in `now` and `now_link` for their current position.

Alumni are sorted by departure year, most recent first.

---

## How to add news items

Edit `data/news.csv`.

| Column | Description |
|---|---|
| `date` | Year-month string, e.g. `2025-09` |
| `text` | News text. Supports `**bold**` and `*italic*` markdown |
| `link` | Optional URL |
| `link_text` | Link label shown after the text (e.g. `Read paper`) |

News items are sorted by date, newest first.

---

## How to add publications

Edit `data/publications.csv`. See existing rows for the column format. Key columns: `year`, `authors`, `title`, `journal`, `doi`, `preprint`, `github`.

---

## How to add Lab Life photos

1. Copy the image file to `images/social/`. Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`.
2. Optionally add a caption in `data/social_photos.csv`:

| Column | Description |
|---|---|
| `filename` | Exact filename, e.g. `retreat_2025.jpg` |
| `caption` | Caption shown below the photo |

If a photo has no entry in `social_photos.csv`, the caption defaults to the filename (underscores replaced with spaces, title-cased).

Photos appear in the **Lab Life** section of the People page, sorted by filename.

---

## Member photos

- Store photos in `images/members/`.
- Recommended format: square crop, `.jpg` or `.png`.
- The `image` value in `people.csv` must match the exact filename (case-sensitive).
- If the image file is missing or the column is blank, `images/members/placeholder.svg` is shown automatically.
