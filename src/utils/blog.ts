import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { cleanSlug, trimSlash, POST_PERMALINK_PATTERN } from './permalinks';

// Given some metadata about a blog post, this function generates a permalink for the post
const generatePermalink = async ({ id, slug, publishDate, category }) => {
  // Format the date components (year, month, day, hour, minute, second)
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  // Replace placeholders in the permalink pattern with the formatted values and other metadata
  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  // Clean up the permalink by removing duplicate slashes and trailing slashes
  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

// Given a CollectionEntry object representing a blog post, this function normalizes the data and returns a Post object with standardized properties
const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { id, slug: rawSlug = '', data } = post;
  const { Content, remarkPluginFrontmatter } = await post.render();

  const {
    tags: rawTags = [],
    category: rawCategory,
    author = 'Anonymous',
    publishDate: rawPublishDate = new Date(),
    ...rest
  } = data;

  // Clean up slug and category values by removing duplicate slashes and trailing slashes
  const slug = cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));

  // Return the normalized post object
  return {
    id: id,
    slug: slug,
    publishDate: publishDate,
    category: category,
    tags: tags,
    author: author,
    ...rest,
    Content: Content, // or 'body' in case you consume from API
    permalink: await generatePermalink({ id, slug, publishDate, category }),
    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

// Load all blog posts and normalize their data
const load = async function (lang: 'en' | 'ru'): Promise<Array<Post>> {
  let posts;
  if (lang === 'en') {
    posts = await getCollection('post_EN');
  } else {
    posts = await getCollection('post_RU');
  }
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  // Sort the posts by publish date (newest first) and filter out any draft posts
  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

// Fetch all blog posts (cached for subsequent calls)
export const fetchPosts = async (lang: 'en' | 'ru'): Promise<Array<Post>> => {
  _posts = await load(lang);

  return _posts;
};

// // Find blog posts by an array of slugs
// export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
//   if (!Array.isArray(slugs)) return [];

//   const posts = await fetchPosts();

//   return slugs.reduce(function (r: Array<Post>, slug: string) {
//     posts.some(function (post: Post) {
//       return slug === post.slug && r.push(post);
//     });
//     return r;
//   }, []);
// };

// Find blog posts by an array of IDs
export const findPostsByIds = async (ids: Array<string>, lang: 'en' | 'ru'): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts(lang);

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

// Find the latest blog posts (up to a specified count)
export const findLatestPosts = async ({ count }: { count?: number }, lang: 'en' | 'ru'): Promise<Array<Post>> => {
  const _count = count || 4; // Default to 4 if count is not specified
  const posts = await fetchPosts(lang);

  // Return the latest posts, up to the specified count
  return posts ? posts.slice(0, _count) : [];
};

// Find all unique tags across all blog posts
export const findTags = async (lang: 'en' | 'ru'): Promise<Array<string>> => {
  const posts = await fetchPosts(lang);

  // Extract all tags from the posts and return a unique array of tags
  const tags = posts.reduce((acc, post: Post) => {
    if (post.tags && Array.isArray(post.tags)) {
      return [...acc, ...post.tags];
    }
    return acc;
  }, []);
  return [...new Set(tags)];
};

// Find all unique categories across all blog posts
export const findCategories = async (lang: 'en' | 'ru'): Promise<Array<string>> => {
  const posts = await fetchPosts(lang);

  // Extract all categories from the posts and return a unique array of categories
  const categories = posts.reduce((acc, post: Post) => {
    if (post.category) {
      return [...acc, post.category];
    }
    return acc;
  }, []);
  return [...new Set(categories)];
};
