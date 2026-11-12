# sre-base

My SRE / observability blog, served publicly at **[sre.andrewcaskey.com](https://sre.andrewcaskey.com)**.

Built with [Astro](https://astro.build) (static site), deployed to **Cloudflare Pages**.

## ✍️ Jump in and write

- **Full workflow (both blogs + VS Code):** [`docs/BLOGGING.md`](docs/BLOGGING.md)
- **New SRE post:** add a file to [`src/content/blog/`](src/content/blog/) → `npm run dev` → `npm run deploy`
- **New portfolio post:** `../portfolio/public/blogs/` + an entry in `../portfolio/src/portfolio.js`
- **Live sites:** [sre.andrewcaskey.com](https://sre.andrewcaskey.com) · [andrewcaskey.com/blog](https://andrewcaskey.com/blog)

## Write a post

Add a markdown file to `src/content/blog/`:

```markdown
---
title: "Post Title"
description: "One-line summary shown in the list and meta tags."
date: 2026-11-06
category: "Observability"   # optional
draft: false                 # optional; true hides it from the build
---

Post body in markdown...
```

The filename (minus `.md`) becomes the URL slug: `src/content/blog/my-post.md`
→ `https://sre.andrewcaskey.com/blog/my-post/`.

## Develop

```bash
npm install        # first time
npm run dev        # local dev server at http://localhost:4321
npm run build      # static build into dist/
npm run preview    # serve the built dist/ locally
```

## Deploy

```bash
npm run deploy     # astro build && wrangler pages deploy dist --project-name=sre-blog
```

Needs Cloudflare credentials in the environment (`CLOUDFLARE_API_TOKEN`,
`CLOUDFLARE_ACCOUNT_ID`) or `wrangler login`. The custom domain
`sre.andrewcaskey.com` is attached to the Pages project in the Cloudflare
dashboard (proxied CNAME → `<project>.pages.dev`, auto-TLS).

## Hosting map (andrewcaskey personal sites)

| Repo          | URL                     | Visibility | Host                              | Deploy                      |
| ------------- | ----------------------- | ---------- | --------------------------------- | --------------------------- |
| `portfolio`   | `andrewcaskey.com`      | public     | GitHub Pages                      | `npm run deploy` (gh-pages) |
| `sre-base`    | `sre.andrewcaskey.com`  | public     | Cloudflare Pages                  | `npm run deploy` (wrangler) |
| `job-tracker` | `jobs.myacmedia.com`    | private    | cloudflared tunnel + CF Access    | `scripts/jt up --public`    |

> `sre.myacmedia.com` is a separate **private** endpoint (Cloudflare Access / tailnet-gated), kept distinct from this public blog.
