// @ts-check
import { test, expect } from "@playwright/test";

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

test.describe("Blog app Login", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = page.getByText("Log in to application");
    await expect(locator).toBeVisible();
  });

  test.describe("Login", () => {
    test("Succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
      const blogTitle = page.getByText("Blogs");
      await expect(blogTitle).toBeVisible();
    });
    test("Fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "wrongOne");
      await expect(page.getByText("Wrong credentials")).toBeVisible();
    });
  });

  test.describe("When there arent any blog records ", () => {
    test.beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3003/api/testing/reset-blog");
      await page.goto("http://localhost:5173");
      await loginWith(page, "mluukkai", "salainen");
      await expect(page.getByText("Blogs")).toBeVisible();
    });

    test("A new blog can be created", async ({ page }) => {
      await fillEntry(
        page,
        "New amazing entry blog",
        "Ghost writer",
        "myawesomeurl.net",
      );
      await expect(page.getByText("New amazing entry blog")).toBeVisible();
    });
  });

  test.describe("When entry is present", () => {
    test.beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3003/api/testing/reset-blog");
      await page.goto("http://localhost:5173");
      await loginWith(page, "mluukkai", "salainen");
      await expect(page.getByText("Blogs")).toBeVisible();

      await fillEntry(
        page,
        "New amazing entry blog",
        "Ghost writer",
        "myawesomeurl.net",
      );
      await expect(page.getByText("New amazing entry blog")).toBeVisible();
    });

    test("An existing blog can be edited", async ({ page }) => {
      await page.getByRole("button", { name: "View" }).click();
      await page.getByRole("button", { name: "Like" }).click();
      const likesText = page.getByText("Likes 1");
      await expect(likesText).toBeVisible();
    });
  });
});
