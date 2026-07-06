// @ts-check
import { test, expect } from "@playwright/test";
import { loginWith, fillEntry, createUser } from "./helper.js";

test.describe("Blog app Login", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await createUser(request, "Matti Luukkainen", "mluukkai", "salainen");
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
      await fillEntry(page,"New amazing entry blog","Ghost writer","myawesomeurl.net");
      await expect(page.getByText("New amazing entry blog")).toBeVisible();
    });
  });

  test.describe("When entry is present", () => {
    test.beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3003/api/testing/reset-blog");
      await page.goto("http://localhost:5173");
      await createUser(request, "test user", "testingNew", "weakPass1")
      await loginWith(page, "mluukkai", "salainen");
      await expect(page.getByText("Blogs")).toBeVisible();

      await fillEntry(page, "New amazing entry blog", "Ghost writer", "myawesomeurl.net");
      await expect(page.getByText("New amazing entry blog")).toBeVisible();
    });

    test("An existing blog can be edited", async ({ page }) => {
      await page.getByRole("button", { name: "View" }).click();
      await page.getByRole("button", { name: "Like" }).click();
      const likesText = page.getByText("Likes 1");
      await expect(likesText).toBeVisible();
    });

    test("An existing blog can be deleted", async ({ page }) => {
      await page.getByRole("button", { name: "View" }).click();
      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("confirm");
        expect(dialog.message()).toBe(
          "Remove New amazing entry blog by Ghost writer?",
        );
        await dialog.accept();
      });
      await page.getByRole("button", { name: "Remove" }).click();
      await expect(page.getByText("List Entry deleted successfully")).toBeVisible();
    });

    test("An existing entry blog can't be deleted by other user than the creator", async ({ page }) => {
      await page.getByRole("button", { name: "Logout" }).click();
      await loginWith(page, "testingNew", "weakPass1");
      await page.getByRole("button", { name: "View" }).click();
      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("confirm");
        expect(dialog.message()).toBe("Remove New amazing entry blog by Ghost writer?");
        await dialog.accept();
      });
      await page.getByRole("button", { name: "Remove" }).click();
      await expect(
        page.getByText("Error Deleting entry: Request failed with status code 401"),
      ).toBeVisible();
    });

    test("Entry blogs are listed in descending order by likes", async ({ page }) => {
      await fillEntry(page, "New entry, more likes", "author", "url.url");
      await expect(page.getByText("New entry, more likes")).toBeVisible();
      let viewArrayBefore = await page.getByRole("button", { name: "View" }).all();
      await viewArrayBefore[1].click();
      let likeButton = page.getByRole("button", { name: "Like" });
      await likeButton.click();
      await likeButton.click();
      let likeArray = await page.getByRole("button", { name: "Like" }).all();
      expect(likeArray[0].locator('..')).toContainText("Likes 2");
    });
  });
});
