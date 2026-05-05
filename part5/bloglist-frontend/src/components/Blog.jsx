import { useState } from "react"

const Blog = ({ blog }) => {
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
  if (visible) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={toggleDetails}>hide</button> <br />
        {blog.url} <br />
        Likes {blog.likes} <button>Like</button> <br />
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
