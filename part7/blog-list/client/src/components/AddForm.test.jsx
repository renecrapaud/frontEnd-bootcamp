import blogService from '../services/blogs'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddForm from './AddForm'

vi.mock('../services/blogs', () => ({
  default: {
    createNew: vi.fn()
  }
}))
const setErrorMsg = vi.fn()
const setMsg = vi.fn()

test('Add new entry blog', async () => {
  const blog = {
    title: 'The very first entry',
    url: 'awesome-url.com',
    author: 'Ghost writer',
    likes: 1
  }
  const { container } = render(<AddForm setErrorMessage={setErrorMsg} setMsg={setMsg} />)
  const user = userEvent.setup()
  const buttonSubmit = screen.getByText('Create')
  await user.click(buttonSubmit)
  expect(blogService.createNew).toHaveBeenCalledTimes(1)
})
