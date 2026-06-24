# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth-qa.spec.js >> Auth QA - Login, OTP, Password Reset >> Password Reset Flow
- Location: tests\auth-qa.spec.js:21:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('#forgot-s2')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#forgot-s2')
    14 × locator resolved to <div id="forgot-s2" class="hidden">…</div>
       - unexpected value "hidden"

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
- text: lock_reset
- heading "Forgot Password?" [level=2]
- paragraph: Enter your registered email — we'll send a reset code
- text: mail
- textbox "name@example.com": test@example.com
- button "send Send Reset Code"
- button "Cancel"
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Auth QA - Login, OTP, Password Reset', () => {
  4  | 
  5  |   test('Login Flow', async ({ page }) => {
  6  |     await page.goto('/4_login_and_verification.html');
  7  | 
  8  |     await page.fill('#email-input', 'test@example.com');
  9  |     await page.fill('#password-input', 'password123');
  10 |     
  11 |     await page.click('#continue-btn');
  12 |     
  13 |     // If invalid, error appears. If valid, redirect.
  14 |     // We check if error is shown OR if redirected
  15 |     const errVisible = await page.locator('#login-error').isVisible();
  16 |     if (errVisible) {
  17 |         expect(await page.locator('#login-error').innerText()).toContain('⚠');
  18 |     }
  19 |   });
  20 | 
  21 |   test('Password Reset Flow', async ({ page }) => {
  22 |     await page.goto('/4_login_and_verification.html');
  23 | 
  24 |     // Open Forgot Password Modal
  25 |     await page.click('text="Forgot Password?"');
  26 |     await expect(page.locator('#forgot-modal')).toBeVisible();
  27 | 
  28 |     // Send OTP
  29 |     await page.fill('#forgot-email', 'test@example.com');
  30 |     await page.click('#forgot-send-btn');
  31 |     
  32 |     // Check if step 2 is shown
> 33 |     await expect(page.locator('#forgot-s2')).toBeVisible();
     |                                              ^ Error: expect(locator).toBeVisible() failed
  34 | 
  35 |     // Enter OTP and new password
  36 |     const otpInputs = page.locator('#reset-otp-inputs input');
  37 |     for(let i=0; i<6; i++) {
  38 |         await otpInputs.nth(i).fill('1');
  39 |     }
  40 |     await page.fill('#new-pwd', 'newStrongPass123!');
  41 |     await page.click('#reset-btn');
  42 |   });
  43 | 
  44 |   test('Email OTP Verification UI', async ({ page }) => {
  45 |     await page.goto('/4_login_and_verification.html');
  46 |     
  47 |     // Manually trigger the OTP overlay via exposed function to test its UI
  48 |     await page.evaluate(() => showOtpOverlay('Testing OTP'));
  49 |     await expect(page.locator('#otp-overlay')).toBeVisible();
  50 |     
  51 |     // Fill OTP
  52 |     const otpInputs = page.locator('#otp-inputs input');
  53 |     for(let i=0; i<6; i++) {
  54 |         await otpInputs.nth(i).fill('1');
  55 |     }
  56 |     await page.click('#verify-btn');
  57 |   });
  58 | });
  59 | 
```