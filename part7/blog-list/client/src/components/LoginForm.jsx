import { create } from "zustand";
import loginService from "../services/login";
import blogs from "../services/blogs";

const usePasswordStore = create(set => ({
  password: "",
  setPassword: (value) => set(state => ({ password: value }))
}))

const useUsernameStore = create(set => ({
  username: "",
  setUsername: (value) => set( state => ({ username: value}))
}))
const LoginForm = ({ setErrorMessage, setUsr }) => {

  const { password, setPassword } = usePasswordStore();
  const { username, setUsername } = useUsernameStore();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUsr(user);
      blogs.setToken(user.token);
      window.localStorage.setItem("user", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        username
        <input
          type="text"
          value={username}
          name="Username"
          data-testid="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        password
        <input
          type="password"
          value={password}
          name="Password"
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
