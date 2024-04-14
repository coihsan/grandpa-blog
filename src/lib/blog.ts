export function getRelatedPosts(allPosts: Post[], currentSlug: string, currentTags: string[]) {
    if (!isBlogEnabled || !isRelatedPostsEnabled) return [];
  
    const relatedPosts = getRandomizedPosts(
      allPosts.filter((post) => post.slug !== currentSlug && post.tags?.some((tag) => currentTags.includes(tag))),
      APP_BLOG.relatedPostsCount
    );
  
    if (relatedPosts.length < APP_BLOG.relatedPostsCount) {
      const morePosts = getRandomizedPosts(
        allPosts.filter((post) => post.slug !== currentSlug && !post.tags?.some((tag) => currentTags.includes(tag))),
        APP_BLOG.relatedPostsCount - relatedPosts.length
      );
      relatedPosts.push(...morePosts);
    }
  
    return relatedPosts;
  }