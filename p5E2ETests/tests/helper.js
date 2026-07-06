const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const fillEntry = async (page, title, author, url) => {
  await page.getByText("New Entry").click();
  await page.getByTestId("Title").fill(title);
  await page.getByTestId("Author").fill(author);
  await page.getByTestId("Url").fill(url);
  await page.getByText("Create").click();
};

const createUser = async (request, name, username, password) => {
  await request.post("http://localhost:3003/api/users", {
    data: {
      name: name,
      username: username,
      password: password,
    },
  });
};

export { loginWith, fillEntry, createUser };