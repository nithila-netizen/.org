# AI × Healthcare — a collection of ideas

A personal portfolio of ideas for applying AI across the healthcare industry.
Healthcare is broken into **sections → subsections → idea articles**. Each
article credits a real company and lays out how I'd use AI to make it better.

Built as plain HTML, CSS, and JavaScript — no build tools, no frameworks.

---

## How to view the site on your computer

Just **double-click `index.html`** — it opens in your web browser. That's it.
(Everything works by opening files directly; no server needed.)

## How to add a new idea (no coding required)

1. Open **`data.js`** in any text editor.
2. Find the `IDEAS` list.
3. Copy one whole idea block — everything from `{` to `},` — and paste it as a
   new block.
4. Change the text: the title, the company, the problem, your AI approach, etc.
5. Save the file and refresh the page in your browser. Your new idea appears.

To add a whole new **section or subsection**, edit the `SECTIONS` list at the
top of `data.js` the same way.

### Adding mockup screenshots

1. Put your image file in the **`assets/`** folder (e.g. `assets/my-mockup.png`).
2. In that idea's `mockups` list, set `src: "assets/my-mockup.png"`.
3. Refresh. Until you add a real image, a placeholder frame shows instead.

---

## The files, in plain terms

| File           | What it is                                             |
|----------------|--------------------------------------------------------|
| `data.js`      | **Your content.** The only file you normally edit.     |
| `index.html`   | The homepage.                                          |
| `article.html` | The template every idea article uses.                  |
| `styles.css`   | The look and feel (colors, fonts, spacing).            |
| `app.js`       | Builds the homepage from your content. (Don't edit.)   |
| `article.js`   | Builds each article from your content. (Don't edit.)   |
| `assets/`      | Your mockup images.                                    |

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
