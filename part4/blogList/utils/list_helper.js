var _ = require('lodash');

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
    return (final && final.likes > current.likes) ? final : current
  }, null)
  return favBlog
}

const mostBlogs = (blogs) => {
  const blogCount = _.countBy(blogs, 'author')
  const maxAuthor = _.maxBy(_.toPairs(blogCount), ([author, count]) => count)
  return { author: maxAuthor[0], blogs: maxAuthor[1] }
}

const mostLikes = (blogs) => {
 const authorLikes = _.mapValues(_.groupBy(blogs, 'author'), author => _.sumBy(author, 'likes'))
 const maxAuthor = _.maxBy(_.toPairs(authorLikes), ([author, likes]) => likes)
 return { author: maxAuthor[0], likes: maxAuthor[1] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
