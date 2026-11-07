/**
 * Prefix an internal path with the site's base path.
 * On GitHub Pages project sites the blog lives under /<repo>/, so every
 * internal link must go through this helper: url('/blog/') -> '/ai-blog/blog/'.
 */
export function url(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
