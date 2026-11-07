# AI Blog

A small blog about AI where everything is open source and every post lives in git:

- **[Astro](https://astro.build)** turns the posts into static HTML, with no client-side JavaScript.
- **[Keystatic](https://keystatic.com)** is a local, git-backed editor for writing posts.
- **Markdoc** (`.mdoc`) files in `src/content/posts/` hold the posts.
- **GitHub Pages** hosts the site at https://jeremyorion.github.io/ai-blog/
- **GitHub Actions** builds and deploys it on every push to `main`.

## Writing

```sh
npm install
npm run dev
```

- Site: http://127.0.0.1:4321/ai-blog/
- Editor: http://127.0.0.1:4321/keystatic

The editor saves posts as `.mdoc` files in `src/content/posts/`. You can also write them by hand
in any text editor. Commit and push to publish. Posts marked **Draft** show up in dev only.

The editor runs only in `npm run dev`. The production build is plain static files, so there is
no admin panel on the live site.

## Project layout

```
keystatic.config.ts      editor schema (keep in sync with src/content.config.ts)
src/content.config.ts    content collection schema, used for validation
src/content/posts/       your posts
src/pages/               routes: home, /blog, /blog/[slug], /tags, /about, /rss.xml
src/layouts/Base.astro   HTML shell, header, footer, meta tags
src/styles/global.css    all styles (light and dark)
src/lib/url.ts           url() helper that adds the base path to internal links
```

## Deploying

Pushing to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`). In the repo, **Settings → Pages → Source** must be set to
**GitHub Actions**.

**Internal links:** the site is served under `/ai-blog/`, so write internal links in templates
as `url('/blog/')` (from `src/lib/url.ts`), not as a bare `"/blog/"`.

### Using your own domain

1. In **Settings → Pages → Custom domain**, enter your domain and follow GitHub's DNS
   instructions (a `CNAME` record for a subdomain, or `A`/`AAAA` records for an apex domain).
2. In `astro.config.mjs`, set `site` to `https://yourdomain.com` and delete the `base` line.
   All links update automatically.
3. Turn on **Enforce HTTPS** once the certificate is issued.

## Customising

- Change the site name and tagline in `src/consts.ts`.
- Change colours in the `:root` variables in `src/styles/global.css`.
- To add a post field, add it to both `keystatic.config.ts` and `src/content.config.ts`.

## License

The code is MIT. Posts in `src/content/` belong to their author unless stated otherwise.
