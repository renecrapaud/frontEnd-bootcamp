import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, setErrorMessage, setMsg }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleDetails = () => {
    setVisible(!visible)
  }

  const sendLike = () => {
    setLikes(likes + 1)
    blog.likes += 1
    blogs.updateLike(blog)
  }

  const reqDelete = async () => {
    if (confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        await blogs.sendDeletionReq(blog.id)
        setMsg('List Entry deleted successfully')
        setDeleted(true)
        setTimeout(() => {
          setMsg(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage(`Error Deleting entry: ${exception.message}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    else {
      console.log('Deletion canceled')
    }

  }
  if (!deleted) {
    if (visible) {
      return (
        <div style={blogStyle}>
          {blog.title} <button onClick={toggleDetails}>hide</button> <br />
          {blog.url} <br />
          Likes {likes} <button onClick={sendLike}>Like</button> <br />
          {blog.author}
          <br />
          <button onClick={reqDelete}>Remove</button>
        </div>
      )
    } else {
      return (
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={toggleDetails}>View</button>
        </div>
      )
    }
  }
}
export default Blog
