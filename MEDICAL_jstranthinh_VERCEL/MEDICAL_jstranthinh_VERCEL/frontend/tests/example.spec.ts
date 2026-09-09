import { expect, test } from "@playwright/test";

test("renders the medical booking homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Medical Booking/);
  await expect(page.getByRole("heading", { name: /Tìm bác sĩ phù hợp/ })).toBeVisible();
  await expect(page.getByText("Medical Booking").first()).toBeVisible();
});

test("renders the patient login form", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Đăng nhập" })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Mật khẩu")).toBeVisible();
});
