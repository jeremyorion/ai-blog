# AI Blog

A small, fully self-hosted blog about AI. Everything in it is open source:

- **[Astro](https://astro.build)** turns the posts into static HTML, with no client-side JavaScript.
- **[Keystatic](https://keystatic.com)** is a local, git-backed editor for writing posts.
- **Markdoc** (`.mdoc`) files in `src/content/posts/` hold the posts.
- **[Caddy](https://caddyserver.com)** on any VPS serves the site, with automatic HTTPS.
- **GitHub Actions** builds and deploys with `rsync` on every push to `main`.

## Writing

```sh
npm install
npm run dev
```

- Site: http://127.0.0.1:4321
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
deploy/                  Caddyfile and one-time server setup script
```

## Deploying to your own server

1. Create a Debian/Ubuntu VPS and point your domain's DNS A/AAAA records at it.
2. Run the setup script: `ssh root@SERVER 'bash -s' < deploy/setup-server.sh`
3. Create a deploy key: `ssh-keygen -t ed25519 -f deploy_key -N ""` and add `deploy_key.pub`
   to `/home/deploy/.ssh/authorized_keys` on the server.
4. Copy `deploy/Caddyfile` to `/etc/caddy/Caddyfile`, replace `example.com` with your domain,
   then run `systemctl reload caddy`.
5. Add these GitHub repo secrets:
   - `DEPLOY_HOST`: the server's IP or hostname
   - `DEPLOY_SSH_KEY`: the contents of `deploy_key` (the private key)
   - `DEPLOY_KNOWN_HOSTS`: the output of `ssh-keyscan SERVER`
6. Set `site` in `astro.config.mjs` and the sitemap URL in `public/robots.txt` to your domain.
7. Push to `main`.

## Customising

- Change the site name and tagline in `src/consts.ts`.
- Change colours in the `:root` variables in `src/styles/global.css`.
- To add a post field, add it to both `keystatic.config.ts` and `src/content.config.ts`.

## License

The code is MIT. Posts in `src/content/` belong to their author unless stated otherwise.
