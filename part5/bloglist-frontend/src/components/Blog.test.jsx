import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'The very first entry',
    url: 'awesome-url.com'
  }

  const { container } = render(<Blog blog={blog} />)

  const titleElement = container.querySelector('#blog-title')
  const authorElement = container.querySelector('#blog-author')
  const urlElement = container.querySelector('#blog-url')
  const likesElement = container.querySelector('#blog-likes')
  expect(titleElement).toBeDefined()
  expect(authorElement).toBeNull()
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeNull()
})
