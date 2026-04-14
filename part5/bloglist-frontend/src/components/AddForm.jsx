import { useState } from "react"
import blogs from "../services/blogs"

const AddForm = ({ setErrorMessage, setBlogs, blogsBef, setMsg }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const resp = await blogs.createNew({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      const newBlog = { title: resp.title, author: resp.author, url: resp.url, id: resp.id }
      setBlogs(blogsBef.concat(newBlog))
      setMsg('List Entry added successfully')
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(`Error saving data: ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Title: &emsp;
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Author: &emsp;
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        Url: &emsp;
        <input
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button type="submit"> Create </button>
      </form>
    </div>
  )
}

export default AddForm
