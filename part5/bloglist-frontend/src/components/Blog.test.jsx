import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'The very first entry',
    url: 'awesome-url.com',
    author: 'Ghost writer',
    likes: 1
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

test('Click show details', async () => {
  const blog = {
    title: 'The very first entry',
    url: 'awesome-url.com',
    author: 'Ghost writer',
    likes: 1
  }

  const mockHandler = vi.fn()
  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('View')
  button.onclick = mockHandler
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  const titleElement = container.querySelector('#blog-title')
  const authorElement = container.querySelector('#blog-author')
  const urlElement = container.querySelector('#blog-url')
  const likesElement = container.querySelector('#blog-likes')
  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})
