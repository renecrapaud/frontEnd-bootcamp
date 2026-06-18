// @ts-check
import { test, expect } from '@playwright/test';


test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  test.describe('Login', () => {
    test('Succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Blogs')).toBeVisible()
    })
    test('Fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrongOne')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/reset-blog')
      await page.goto('http://localhost:5173')
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Blogs')).toBeVisible()
    })

    test('A new blog can be created', async ({ page }) => {
      await page.getByText('New Entry').click()
      await page.getByTestId('Title').fill('New amazing entry blog')
      await page.getByTestId('Author').fill('Ghost writer')
      await page.getByTestId('Url').fill('myawesomeurl.net')
      await page.getByText('Create').click()
      await expect(page.getByText('New amazing entry blog')).toBeVisible()
    })
  })
})
