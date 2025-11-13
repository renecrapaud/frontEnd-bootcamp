const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one ', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that ', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of empty list is zero ', () => {
    const listWithZeroBlog = []
    const result = listHelper.totalLikes(listWithZeroBlog)
    assert.strictEqual(result, 0)
  })

  test('list size bigger than one ', () => {
    const listWith1PlusBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '843uhnhbc7e287gj8ybb78',
        title: 'this is the new one',
        author: 'my favorite author',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 3,
        __v: 0
      },
      {
        _id: '645jnjncs7yh3k87hjh67g6gjs',
        title: 'New blog record',
        author: 'the old one',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 9,
        __v: 0
      }
    ]
    const result = listHelper.totalLikes(listWith1PlusBlog)
    assert.strictEqual(result, 17)
  })
})

describe('most popular blog', () => {

  test('More than one blog, returns the most voted', () => {
    blog = {
      _id: '645jnjncs7yh3k87hjh67g6gjs',
      title: 'New blog record',
      author: 'the old one',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 9,
      __v: 0
    }
    const listWith1PlusBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '843uhnhbc7e287gj8ybb78',
        title: 'this is the new one',
        author: 'my favorite author',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 3,
        __v: 0
      },
      blog
    ]

    const result = listHelper.favoriteBlog(listWith1PlusBlog)
    assert.deepStrictEqual(result, blog)
  })
  test('Zero blogs, returns null', () => {
    const listWith1PlusBlog = []

    const result = listHelper.favoriteBlog(listWith1PlusBlog)
    assert.deepStrictEqual(result, null)
  })
  test('when list has only one blog, returns it ', () => {
    blog = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
    const listWithOneBlog = [
      blog
    ]

    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, blog)
  })
})
