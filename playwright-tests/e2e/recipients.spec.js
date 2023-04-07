// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("New Recipient", () => {
  test("should allow me to add recipients", async ({ page }) => {
    await page.getByRole("button", { name: "Recipients" }).click();
    await page.getByRole("button", { name: "Add Recipient" }).click();

    await page.getByPlaceholder("Full name").click();
    await page.getByPlaceholder("Full name").fill("Example user");
    await page.getByPlaceholder("Full name").press("Tab");
    await page.getByPlaceholder("Email address").fill("exampleuser@test.suite");
    await page.getByPlaceholder("Email address").press("Tab");
    await page.getByPlaceholder("Phone number").fill("0781232918");
    await page.getByPlaceholder("Phone number").press("Tab");
    await page.getByPlaceholder("Address", { exact: true }).fill("Any address");
    await page.getByPlaceholder("Address", { exact: true }).press("Tab");
    await page.getByPlaceholder("1").fill("5");
    await page.getByPlaceholder("1").press("Tab");
    await page.getByPlaceholder("0").fill("8");
    await page.getByRole("button", { name: "Submit" }).click();

    // below only needed cos of no test cleanup
    await page.getByRole("cell", { name: "Example user" }).first().click();

    // Assert
    await page.getByRole("heading", { name: "Example user" }).click();
    await page.getByRole("heading", { name: "Example user" }).click();
    await page.getByRole("heading", { name: "Household Details" }).click();
    await page.getByText("13 (5 adults, 8 children)").click();
    await page.getByText("None").click();
    await page.getByText("No orders").click();
  });
});
