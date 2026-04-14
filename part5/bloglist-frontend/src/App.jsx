import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import ErrorNotification from './components/ErrorNotification'
import "./Index.css";
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUsr = window.localStorage.getItem('user')
    if (loggedUsr) {
      const user = JSON.parse(loggedUsr)
      setUser(user)
    }
  }, [])

  const doLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <ErrorNotification message={errorMsg} />
        <LoginForm setErrorMessage={setErrorMsg} setUsr={setUser} />
      </div >
    )
  }
  else {
    return (
      <div>
        <h2>Blogs</h2>
        <h4>
          {user.username} logged in
          <span> </span>
          <button onClick={doLogout}>Logout</button>
        </h4>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

}

export default App
