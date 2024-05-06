import rss from '@astrojs/rss';
import { d as getCollection, S as SITE_TITLE, c as SITE_DESCRIPTION } from './about_DZ5vy59n.mjs';

async function GET(context) {
	const posts = await getCollection('posts');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/posts/${post.slug}/`,
		})),
	});
}

export { GET };
