export function getRelatedPosts(allPosts, currentSlug, currentCats) {
    const relatedPosts = allPosts.filter(
      post =>
        post.frontmatter.slug !== currentSlug &&
        post.frontmatter.category.includes(currentCats[0])
    )
 }
    return relatedPosts.slice(0, 4)