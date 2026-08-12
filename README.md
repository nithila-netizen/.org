# Nithila Notes — the map of AI across healthcare

Every healthcare industry and sub-industry, how AI is transforming each one,
and the products — reviewed for the people who work there.

Built as plain HTML, CSS, and JavaScript — no build tools, no frameworks.

---

## How to view the site on your computer

**Double-click `index.html`** — it opens in your web browser. That's it.
(No server needed; everything works by opening the files directly.)

## How to add content (no coding required)

Everything you write lives in **`data.js`**. Open it in any text editor.

### Add a new industry
Find the `INDUSTRIES` list, copy one `{ ... }` block, paste it, and edit the
name, blurb, and its `subIndustries`. Keep the commas between blocks.

### Add a new product review
Find the `PRODUCTS` list, copy one `{ ... }` block, paste it, and edit:
- `name`, `tagline`
- `industry` / `subIndustry` — must match ids from the `INDUSTRIES` list
- `status` — `"has-ai"` (already an AI product) or `"adds-ai"` (your idea to add AI)
- `capabilities`, `strengths`, `watchOuts`, `quote`
- `glance` — the "At a glance" sidebar (company, founded, HQ, regulatory, pricing, website)

Save, refresh the page, and your changes appear.

---

## The files, in plain terms

| File            | What it is                                              |
|-----------------|---------------------------------------------------------|
| `data.js`       | **Your content.** The main file you edit.               |
| `index.html`    | The homepage (hero, stats, industries, products).       |
| `industry.html` | Template for a single industry's page.                  |
| `product.html`  | Template for a single product review.                   |
| `styles.css`    | The look and feel (colors, fonts, spacing).             |
| `app.js`        | Builds the homepage. (Don't edit.)                      |
| `industry.js` / `product.js` | Build those pages. (Don't edit.)           |
| `icons.js`      | The little line icons. (Don't edit.)                    |
| `partials.js`   | The shared header + footer. (Don't edit.)               |
| `assets/`       | For any image files you add.                            |

---

## Working from another laptop

Your code lives on GitHub, so you can pick up on any computer:

```bash
# First time on a new laptop — download the project:
git clone https://github.com/nithila-netizen/.org.git

# Each time you sit down to work — get the latest:
git pull

# After making changes — save and send them to the cloud:
git add .
git commit -m "describe what you changed"
git push
```

---

## Note on this version

This is a faithful rebuild of the Nithila Notes design, seeded with example
content (the Isomorphic Labs review). If you have an earlier version with your
own written reviews, push it from that project to this repo to bring your real
content in.
