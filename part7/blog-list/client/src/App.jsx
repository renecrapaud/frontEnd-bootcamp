import { useState, useEffect, useRef } from "react";
import { create } from "zustand";
import ErrorBoundary from "./components/ErrorBoundary";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import ErrorNotification from "./components/ErrorNotification";
import "./index.css";
import LoginForm from "./components/LoginForm";
import AddForm from "./components/AddForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const useNotificationStore = create(set => ({
  message: null,
  setMessage: (msg) => set( state => ({ message: msg }))
}))

const useErrorNotifStore = create(set => ({
  errorMsg: null,
  setErrorMsg: (msg) => set( state => ({ errorMsg: msg}))
}))

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogFormReg = useRef();
  const errorMsg = useErrorNotifStore(state => state.errorMsg)
  const setErrorMsg = useErrorNotifStore(state => state.setErrorMsg);
  const msgState = useNotificationStore(state => state.message);
  const setMsg = useNotificationStore(state => state.setMessage)


  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort(function (a, b) {
        if (a.likes < b.likes) {
          return 1;
        }
        if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      });
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUsr = window.localStorage.getItem("user");
    if (loggedUsr) {
      const user = JSON.parse(loggedUsr);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const doLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    blogService.setToken(null);
  };

  if (user === null) {
    return (
      <div>
        <ErrorNotification message={errorMsg} />
        <LoginForm setErrorMessage={setErrorMsg} setUsr={setUser} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <ErrorNotification message={errorMsg} />
        <Notification message={msgState} />
        <ErrorBoundary>
          <h4>
            {user.username} logged in
            <span> </span>
            <button onClick={doLogout}>Logout</button>
          </h4>
          <div style={{ margin: 10 + "px" }}>
            <Togglable buttonLabel="New Entry" ref={blogFormReg}>
              <AddForm
                setErrorMessage={setErrorMsg}
                setBlogs={setBlogs}
                blogsBef={blogs}
                setMsg={setMsg}
                blogFormRef={blogFormReg}
              />
            </Togglable>
          </div>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              setBlogs={setBlogs}
              setErrorMessage={setErrorMsg}
              setMsg={setMsg}
            />
          ))}
        </ErrorBoundary>
      </div>
    );
  }
};

export default App;
