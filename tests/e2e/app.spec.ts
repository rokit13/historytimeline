import { expect, test } from "@playwright/test";

test("app login route renders the JWT starter form", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByRole("heading", { name: /Sign in against the Laravel API foundation/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Sign In/i })).toBeVisible();
});
