import { useState } from "react"
import blogs from "../services/blogs"

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
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
    blogs.updateLike(blog)
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={toggleDetails}>hide</button> <br />
        {blog.url} <br />
        Likes {likes} <button onClick={sendLike}>Like</button> <br />
        {blog.author}

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
export default Blog
