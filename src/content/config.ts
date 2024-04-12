import { defineCollection, z, reference } from 'astro:content';

const posts = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z
			.object({
				src: z.string().optional().default(""),
				alt: z.string().optional().default(""),
			})
			.optional(),
		tags: z.array(z.string()),
		category: z.string().optional(),
		canonicalURL: z.string().url().optional(),
		relatedPosts: z.array(reference('posts')).optional(),
		minutesRead: z.string().optional().default(""),
	}),
});

export const collections = {posts };
