const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((final, current) => {
    // if (!final) return current
    return (final && final.likes > current.likes) ? final : current
  }, null)
  return favBlog
}

module.exports = { dummy, totalLikes, favoriteBlog }
