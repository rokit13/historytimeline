import { expect, test } from "@playwright/test";

test("marketing home renders the platform foundation messaging", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /A clean monorepo starting point/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open App/i })).toBeVisible();
});
