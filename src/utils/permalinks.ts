import slugify from 'limax';

import { SITE, BLOG } from '~/config.mjs';
import { trim } from '~/utils/utils';

// Remove trailing slashes from a string
export const trimSlash = (s: string) => trim(trim(s, '/'));

// Create a path by joining multiple parameters
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el)) // Remove trailing slashes from each parameter
    .filter((el) => !!el) // Remove empty parameters
    .join('/'); // Join parameters with slashes
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : ''); // Add leading slash and trailing slash if required by SITE configuration
};

const BASE_PATHNAME = SITE.basePathname;

// Clean up a slug by removing trailing slashes and slugifying each part
export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

// Define the permalink pattern for blog posts
export const POST_PERMALINK_PATTERN = trimSlash(BLOG?.post?.permalink || '/%slug%');

// Generate the base path for the blog
export const BLOG_BASE = cleanSlug(BLOG?.list?.pathname);

// Generate the base path for categories
export const CATEGORY_BASE = cleanSlug(BLOG?.category?.pathname || 'category');

// Generate the base path for tags
export const TAG_BASE = cleanSlug(BLOG?.tag?.pathname) || 'tag';

// Get the canonical URL for a given path
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.origin));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0,-1); // Remove trailing slash if trailingSlash is disabled
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/') ) {
    return url + '/'; // Add trailing slash if trailingSlash is enabled and the URL doesn't have one
  }
  return url;
}

// Get the permalink for a given slug and type
export const getPermalink = (lang: 'ru' | 'en', slug = '', type = 'page'): string => {
  let permalink: string;

  switch (type) {
    case 'category':
      permalink =  '/' + lang + createPath(CATEGORY_BASE, trimSlash(slug)); // Create category permalink
      break;

    case 'tag':
      permalink =  '/' + lang + createPath(TAG_BASE, trimSlash(slug)); // Create tag permalink
      break;

    case 'post':
      permalink = '/' + lang + createPath(trimSlash(slug)); // Create post permalink
      break;

    case 'page':
    default:
      permalink = createPath(slug); // Create page permalink
      break;
  }

  return definitivePermalink(permalink); // Add BASE_PATHNAME to the permalink
};

// Get the permalink for the home page
export const getHomePermalink = (): string => getPermalink('ru', '/');

// Get the permalink for the blog page
export const getBlogPermalink = (lang: 'ru' | 'en'): string => '/' + lang + getPermalink(lang, BLOG_BASE);

// Get the asset path by joining BASE_PATHNAME and the provided path
export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');

// Add BASE_PATHNAME to the permalink
const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);
