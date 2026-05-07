import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import ErrorNotification from './components/ErrorNotification'
import "./Index.css";
import LoginForm from './components/LoginForm'
import AddForm from './components/AddForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [msg, setMsg] = useState(null)
  const blogFormReg = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(function (a, b) {
        if (a.likes > b.likes) {
          return 1
        }
        if (a.likes < b.likes) {
          return -1
        }
        return 0
      })
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUsr = window.localStorage.getItem('user')
    if (loggedUsr) {
      const user = JSON.parse(loggedUsr)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const doLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    blogService.setToken(null)
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
        <ErrorNotification message={errorMsg} />
        <Notification message={msg} />
        <h4>
          {user.username} logged in
          <span> </span>
          <button onClick={doLogout}>Logout</button>
          <br />
          <Togglable buttonLabel="New Entry" ref={blogFormReg}>
            <AddForm setErrorMessage={setErrorMsg} setBlogs={setBlogs} blogsBef={blogs} setMsg={setMsg} blogFormRef={blogFormReg} />
          </Togglable>
        </h4>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setErrorMessage={setErrorMsg} setMsg={setMsg} />
        )}
      </div>
    )
  }

}

export default App
