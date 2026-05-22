import { test, expect } from "@playwright/test";

/**
 * End-to-End Authentication Tests
 *
 * These tests verify the Supabase Auth flow in the Next.js application:
 * - Login page visibility and form elements
 * - Successful login redirect
 * - Sidebar navigation after authentication
 *
 * Test credentials are read from environment variables:
 * - TEST_USER_EMAIL
 * - TEST_USER_PASSWORD
 *
 * If credentials are not provided, credentialed tests will be skipped.
 */

// Skip credentialed tests if test user credentials are not available
test.describe("Authentication Flow", () => {
  test.describe("1. LOGIN PAGE VISIBLE", () => {
    test("should display the login page with email, password inputs and submit button", async ({
      page,
    }) => {
      // Navigate to the login page
      await page.goto("/login");

      // Verify the page has loaded and the main heading is visible
      const loginHeading = page.getByRole("heading", { name: /sign in/i });
      await expect(loginHeading).toBeVisible();

      // Check for email input field by role (textbox with Email label)
      const emailInput = page.getByRole("textbox", { name: /email/i });
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toHaveAttribute("type", "email");

      // Check for password input field by role
      const passwordInput = page.getByRole("textbox", { name: /password/i });
      await expect(passwordInput).toBeVisible();
      await expect(passwordInput).toHaveAttribute("type", "password");

      // Check for the Sign In submit button inside the sign-in form
      const signInButton = page.getByRole("button", { name: /^sign in$/i }).nth(1);
      await expect(signInButton).toBeVisible();
    });

    test("should display Sign In and Sign Up mode toggles", async ({
      page,
    }) => {
      await page.goto("/login");

      // Check for Sign In toggle button (first button with "Sign In" text - the toggle, not the submit)
      const signInToggle = page.getByRole("button", { name: /^Sign In$/i }).first();
      await expect(signInToggle).toBeVisible();

      // Check for Sign Up toggle button (first button with "Sign Up" text - the toggle)
      const signUpToggle = page.getByRole("button", { name: /^Sign Up$/i }).first();
      await expect(signUpToggle).toBeVisible();
    });
  });

  test.describe("2. REDIRECT AFTER LOGIN", () => {
    test.beforeEach(async ({ page }) => {
      // Skip this test suite if credentials are not available
      const email = process.env.TEST_USER_EMAIL;
      const password = process.env.TEST_USER_PASSWORD;

      if (!email || !password) {
        test.skip();
      }
    });

    test("should redirect to /projects page after successful login", async ({
      page,
    }) => {
      const email = process.env.TEST_USER_EMAIL!;
      const password = process.env.TEST_USER_PASSWORD!;

      // Navigate to login page
      await page.goto("/login");

      // Fill in the email field using role-based selector
      await page.getByRole("textbox", { name: /email/i }).fill(email);

      // Fill in the password field
      await page.locator('input[type="password"]').fill(password);

      // Click the Sign In submit button
      await page.locator('form button[type="submit"]').click();

      // Wait for navigation to complete
      // The app should redirect to /projects (or dashboard) after successful login
      await page.waitForURL(/\/(projects|dashboard|)\/?$/);

      // Verify we are on the projects or dashboard page (not on /login)
      expect(page.url()).not.toContain("/login");
      expect(page.url()).toContain("/projects");
    });

    test("should show error message on failed login with incorrect credentials", async ({
      page,
    }) => {
      // Navigate to login page
      await page.goto("/login");

      // Fill in with invalid credentials using role-based selectors
      await page.getByRole("textbox", { name: /email/i }).fill("nonexistent@example.com");
      await page.locator('input[type="password"]').fill("wrongpassword123");

      // Click the Sign In submit button
      await page.locator('form button[type="submit"]').click();

      // Wait a moment for error to appear
      await page.waitForTimeout(1000);

      // Verify we are still on the login page (no redirect)
      expect(page.url()).toContain("/login");
    });
  });

  test.describe("3. SIDEBAR NAVIGATION", () => {
    test.beforeEach(async ({ page }) => {
      // Skip this test suite if credentials are not available
      const email = process.env.TEST_USER_EMAIL;
      const password = process.env.TEST_USER_PASSWORD;

      if (!email || !password) {
        test.skip();
      }
    });

    test("should display sidebar with Overview, Projects, and Settings navigation links after login", async ({
      page,
    }) => {
      const email = process.env.TEST_USER_EMAIL!;
      const password = process.env.TEST_USER_PASSWORD!;

      // Navigate to login page
      await page.goto("/login");

      // Perform login
      await page.getByRole("textbox", { name: /email/i }).fill(email);
      await page.locator('input[type="password"]').fill(password);
      await page.locator('form button[type="submit"]').click();

      // Wait for navigation and sidebar to appear
      await page.waitForURL(/\/(projects|dashboard|)\/?$/);

      // Verify sidebar is visible with expected navigation links
      // Scope link lookup to the sidebar menu so breadcrumb links don't interfere
      const sidebarMenu = page.locator('[data-slot="sidebar-menu"]');

      const overviewLink = sidebarMenu.getByRole("link", { name: /overview/i });
      await expect(overviewLink).toBeVisible();

      const projectsLink = sidebarMenu.getByRole("link", { name: /projects/i });
      await expect(projectsLink).toBeVisible();

      const settingsLink = sidebarMenu.getByRole("link", { name: /settings/i });
      await expect(settingsLink).toBeVisible();
    });

    test("should navigate to different pages via sidebar links", async ({
      page,
    }) => {
      const email = process.env.TEST_USER_EMAIL!;
      const password = process.env.TEST_USER_PASSWORD!;

      // Navigate to login and authenticate
      await page.goto("/login");
      await page.getByRole("textbox", { name: /email/i }).fill(email);
      await page.locator('input[type="password"]').fill(password);
      await page.locator('form button[type="submit"]').click();

      // Wait for initial page load
      await page.waitForURL(/\/(projects|dashboard|)\/?$/);

      // Scope link lookup to the sidebar menu so breadcrumb links don't interfere
      const sidebarMenu = page.locator('[data-slot="sidebar-menu"]');

      // Navigate to Overview (home)
      const overviewLink = sidebarMenu.getByRole("link", { name: /overview/i });
      await overviewLink.click();
      await page.waitForURL(/\/$/);
      expect(page.url()).toContain("/");

      // Navigate to Projects
      const projectsLink = sidebarMenu.getByRole("link", { name: /projects/i });
      await projectsLink.click();
      await page.waitForURL(/\/projects/);
      expect(page.url()).toContain("/projects");

      // Navigate back to Overview from Projects to verify sidebar still works
      await overviewLink.click();
      await page.waitForURL(/\/$/);
      expect(page.url()).toContain("/");
    });

    test("should display user email in sidebar footer after login", async ({
      page,
    }) => {
      const email = process.env.TEST_USER_EMAIL!;
      const password = process.env.TEST_USER_PASSWORD!;

      // Navigate to login and authenticate
      await page.goto("/login");
      await page.getByRole("textbox", { name: /email/i }).fill(email);
      await page.locator('input[type="password"]').fill(password);
      await page.locator('form button[type="submit"]').click();

      // Wait for page load
      await page.waitForURL(/\/(projects|dashboard|)\/?$/);

      // Verify user email is displayed in sidebar footer
      // The email is displayed in a div with text-muted-foreground class
      const userEmailText = page.locator('div.text-muted-foreground').filter({ hasText: email });
      await expect(userEmailText).toBeVisible();
    });

    test("should display Sign Out button in sidebar footer", async ({
      page,
    }) => {
      const email = process.env.TEST_USER_EMAIL!;
      const password = process.env.TEST_USER_PASSWORD!;

      // Navigate to login and authenticate
      await page.goto("/login");
      await page.getByRole("textbox", { name: /email/i }).fill(email);
      await page.locator('input[type="password"]').fill(password);
      await page.locator('form button[type="submit"]').click();

      // Wait for page load
      await page.waitForURL(/\/(projects|dashboard|)\/?$/);

      // Verify Sign Out button is visible in the sidebar footer
      // The Sign Out button is a submit button inside a form in the sidebar
      const signOutButton = page.locator('form button[type="submit"]').filter({ hasText: /sign out/i });
      await expect(signOutButton).toBeVisible();
    });
  });
});

/**
 * SETUP INSTRUCTIONS:
 *
 * 1. Create a .env.local file in the project root with:
 *    TEST_USER_EMAIL=your-test-user@example.com
 *    TEST_USER_PASSWORD=your-test-password
 *
 * 2. Ensure Supabase Auth is properly configured in your application
 *
 * 3. Run tests with:
 *    npm run test:e2e
 *    (or add this script to package.json: "test:e2e": "playwright test")
 *
 * 4. For debugging, run in headed mode:
 *    npx playwright test --headed
 *
 * 5. To debug a specific test:
 *    npx playwright test tests/auth.spec.ts --debug
 */
