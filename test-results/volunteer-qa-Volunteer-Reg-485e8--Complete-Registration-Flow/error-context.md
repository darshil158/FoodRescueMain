# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: volunteer-qa.spec.js >> Volunteer Registration QA >> Complete Registration Flow
- Location: tests\volunteer-qa.spec.js:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button:has-text("Processing..."), button:has-text("Registration Sent!")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button:has-text("Processing..."), button:has-text("Registration Sent!")')
    - waiting for navigation to finish...
    - navigated to "http://localhost:3001/4_login_and_verification"

```

```yaml
- main:
  - text: restaurant
  - heading "Welcome Back" [level=1]
  - paragraph: Login to your account
  - text: Email Address mail
  - textbox "name@example.com"
  - text: Password lock
  - textbox "••••••••"
  - button "visibility"
  - button "Forgot Password?"
  - button "Continue arrow_forward"
  - paragraph:
    - text: Don't have an account?
    - link "Join free":
      - /url: 2_role_selection.html
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Volunteer Registration QA', () => {
  4  |   test('Complete Registration Flow', async ({ page }) => {
  5  |     await page.goto('/6_volunteer_registration.html');
  6  | 
  7  |     // Fill form
  8  |     await page.fill('#vol-name', 'Test Volunteer');
  9  |     await page.fill('#vol-phone', '+1234567890');
  10 |     await page.fill('#vol-email', 'volunteer@example.com');
  11 | 
  12 |     // Select vehicle type
  13 |     await page.selectOption('select', 'car');
  14 | 
  15 |     // Check location
  16 |     await page.click('button:has-text("Submit For Verification")');
  17 | 
  18 |     // Intercept alert if registration fails
  19 |     page.on('dialog', dialog => dialog.accept());
  20 | 
  21 |     // Expect button to change to 'Processing...' or 'Registration Sent!'
  22 |     const submitBtn = page.locator('button:has-text("Processing..."), button:has-text("Registration Sent!")');
> 23 |     await expect(submitBtn).toBeVisible({ timeout: 5000 });
     |                             ^ Error: expect(locator).toBeVisible() failed
  24 |   });
  25 | 
  26 |   test('Missing Required Fields', async ({ page }) => {
  27 |     await page.goto('/6_volunteer_registration.html');
  28 |     
  29 |     // HTML5 Validation kicks in because of 'required' attributes on #vol-name and #vol-email
  30 |     const submitBtn = page.locator('button:has-text("Submit For Verification")');
  31 |     await submitBtn.click();
  32 |     
  33 |     // Validate that it did NOT say "Processing..."
  34 |     await expect(submitBtn).toHaveText('Submit For Verification');
  35 |   });
  36 | });
  37 | 
```