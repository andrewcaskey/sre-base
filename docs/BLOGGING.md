# Blog Publishing Workflow

How to write and publish posts on my two blogs. Both repos live under
`~/lanes/andrewcaskey/andrewcaskey/`.

> Also available as a shareable doc: https://claude.ai/artifact/MZV1X6DnEoWyn31gdMA8KB

## The two blogs

I run two blogs. They share one category taxonomy but are built on completely
different stacks and hosts.

|                  | Portfolio blog                                   | SRE blog                       |
| ---------------- | ------------------------------------------------ | ------------------------------ |
| **URL**          | `andrewcaskey.com/blog`                          | `sre.andrewcaskey.com`         |
| **Repo**         | `andrewcaskey/portfolio`                         | `andrewcaskey/sre-base`        |
| **Stack**        | React (CRA / developerFolio)                     | Astro 5                        |
| **Host**         | GitHub Pages                                     | Cloudflare Pages               |
| **Posts live in**| `public/blogs/*.md` **plus** `src/portfolio.js`  | `src/content/blog/*.md`        |
| **Publish**      | `npm run deploy`                                 | `npm run deploy`               |

The portfolio blog is part of the main résumé site; the SRE blog is a standalone
long-form space. Pick where a post lives by audience.

## Add a post to the portfolio blog

Two files per post, in the `andrewcaskey/portfolio` repo.

**1. Write the body** — create `public/blogs/<slug>.md`. No YAML frontmatter;
start with an H1 and a meta line:

```markdown
# Your Post Title

**Date:** November 12, 2026 · **Category:** Observability

Your content in Markdown…
```

**2. Register it** — add an object to the `posts` array in `src/portfolio.js`
(inside the `blogSection` const). Newest first:

```js
{
  slug: "your-slug",          // must match the .md filename
  title: "Your Post Title",
  date: "2026-11-12",
  category: "Observability",   // see taxonomy below
  series: null,                // or "Docker Deep Dive"
  seriesOrder: null,           // or 1, 2, …
  description: "One-sentence summary shown on the blog card.",
},
```

The category filter chips on `/blog` are generated automatically from these entries.

**3. Publish** — `npm run deploy` (builds and pushes to the `gh-pages` branch;
GitHub Pages serves it at `andrewcaskey.com`).

> **Don't remove** `public/.nojekyll` or the `--dotfiles` flag in the deploy
> script. GitHub Pages runs Jekyll by default, which hides raw `.md` files —
> that caused every post to show "Post not found" until `.nojekyll` was added.

## Add a post to the SRE blog

One file per post, in this repo (`sre-base`). Create
`src/content/blog/<slug>.md` with **YAML frontmatter** — it's validated at build
time, so a typo fails the build loudly:

```markdown
---
title: "Your Post Title"
description: "One-sentence summary."
date: 2026-11-12
category: "Observability"
draft: false
---

Your content in Markdown…
```

- The URL slug comes from the filename: `my-post.md` → `/blog/my-post/`.
- Set `draft: true` to keep a post out of the build until it's ready.
- `category` is optional, but use the shared taxonomy so it groups with the rest.

**Preview:** `npm run dev` → http://localhost:4321 (hot-reloads as you type).

**Publish:** `npm run deploy` — runs `astro build` then
`wrangler pages deploy dist --project-name=sre-blog`.

## Editing in VS Code

Same rhythm for both repos. Key thing: **`git push` saves your source;
`npm run deploy` publishes the live site.** They're separate steps.

1. **Open the repo:**
   ```bash
   code ~/lanes/andrewcaskey/andrewcaskey/portfolio   # or .../sre-base
   ```
2. **Preview while you write** — open the integrated terminal (`` Ctrl+` ``):
   - Portfolio: `npm start` → http://localhost:3000
   - SRE blog: `npm run dev` → http://localhost:4321

   Saving a file hot-reloads the browser. `Ctrl+Shift+V` previews a Markdown
   file inside VS Code.
3. **Commit** (Source Control panel, or terminal):
   ```bash
   git add -A
   git commit -m "Add post: your-slug"
   git push        # pushes to GitHub over the github-personal SSH remote
   ```
4. **Publish the live site:**
   ```bash
   npm run deploy
   ```
   Do this every time you want the change to go live — committing alone doesn't
   update the site.

## Categories & cheat-sheet

**Shared taxonomy** — use the exact same category strings on both blogs:

`Observability` · `Docker` · `AWS` · `Cloudflare` · `AI`

On the portfolio blog, a filter chip appears automatically for any category that
has at least one post, in that order.

| Action        | Portfolio (`portfolio`)                            | SRE blog (`sre-base`)          |
| ------------- | -------------------------------------------------- | ------------------------------ |
| Local preview | `npm start` (:3000)                                | `npm run dev` (:4321)          |
| Build only    | `npm run build`                                    | `npm run build`                |
| Publish live  | `npm run deploy`                                   | `npm run deploy`               |
| New post      | `public/blogs/<slug>.md` + entry in `portfolio.js` | `src/content/blog/<slug>.md`   |
| Host          | GitHub Pages                                       | Cloudflare Pages               |
