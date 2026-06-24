# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration.spec.js >> Restaurant Registration QA >> Complete Registration Flow Testing
- Location: tests\registration.spec.js:4:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*2_Restaurant_Registration_Step_2\.html/
Received string:  "http://localhost:3001/1_Restaurant_Registration_Step_1"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × unexpected value "http://localhost:3001/1_Restaurant_Registration_Step_1"

```

```yaml
- banner:
  - button "arrow_back"
  - heading "Food Rescue Hero" [level=1]
  - text: Need help? contact_support
- main:
  - paragraph: Step 1 of 5
  - paragraph: Account Creation
  - heading "Basic Information" [level=2]
  - text: Restaurant Owner Full Name
  - textbox "John Doe": Test Owner
  - text: Restaurant Email
  - textbox "owner@restaurant.com": testowner@restaurant.com
  - text: check_circle Email Verified Successfully
  - heading "Security" [level=2]
  - text: Password
  - textbox "••••••••": StrongPass123!
  - text: visibility
  - paragraph: Strong
  - text: Confirm Password
  - textbox "••••••••": StrongPass123!
  - text: visibility
  - button "Continue to Restaurant Details"
  - heading "Why Join Us?" [level=3]
  - list:
    - listitem: compost Reduce food waste footprint.
    - listitem: volunteer_activism Support local community food banks.
    - listitem: receipt_long Get automated tax deduction logs.
  - paragraph: Join 500+ restaurants making a difference today.
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Restaurant Registration QA', () => {
  4   |   test('Complete Registration Flow Testing', async ({ page }) => {
  5   |     // Navigate to Step 1
  6   |     await page.goto('/1_Restaurant_Registration_Step_1.html');
  7   | 
  8   |     // 1. All required fields (Submit with empty fields)
  9   |     let alertMessage = '';
  10  |     page.on('dialog', dialog => {
  11  |       alertMessage = dialog.message();
  12  |       dialog.accept();
  13  |     });
  14  |     
  15  |     await page.evaluate(() => {
  16  |         // Enable button for test purposes to see if it allows submit without verify
  17  |         document.getElementById('mainContinueBtn').disabled = false;
  18  |     });
  19  |     await page.click('#mainContinueBtn');
  20  |     expect(alertMessage, '1. Required fields should trigger alert').toContain('Please fill in all fields');
  21  | 
  22  |     // 2. Email validation (Enter invalid email and verify)
  23  |     await page.fill('#emailInput', 'invalid-email');
  24  |     // The current code doesn't have strict client-side email regex validation before sending OTP, 
  25  |     // but the API will reject it later.
  26  | 
  27  |     // 3. Email OTP verification
  28  |     await page.fill('#emailInput', 'testowner@restaurant.com');
  29  |     
  30  |     // We expect the Verify Email button to exist, but currently it's hidden by default in the HTML!
  31  |     // Let's unhide it if it is hidden, as per current UI state
  32  |     await page.evaluate(() => document.getElementById('verifyBtn').classList.remove('hidden'));
  33  |     
  34  |     await page.click('#verifyBtn');
  35  |     await expect(page.locator('#otpSection')).toBeVisible({ timeout: 2000 });
  36  | 
  37  |     // 4. OTP resend after 10 seconds
  38  |     const countdownLocator = page.locator('#countdown');
  39  |     await expect(countdownLocator).toContainText('Resend in');
  40  |     // Wait for 11 seconds to verify it changes to 'Resend OTP'
  41  |     await page.waitForTimeout(11000);
  42  |     await expect(countdownLocator).toHaveText('Resend OTP', { timeout: 2000 });
  43  | 
  44  |     // Enter OTP and verify
  45  |     const otpInputs = page.locator('.otp-input');
  46  |     for(let i=0; i<6; i++) {
  47  |         await otpInputs.nth(i).fill('1');
  48  |     }
  49  |     await page.click('text=Verify OTP');
  50  |     await expect(page.locator('#successBadge')).toBeVisible();
  51  | 
  52  |     // 5. Password validation
  53  |     await page.fill('#pwd', 'weak');
  54  |     await expect(page.locator('#strengthLabel')).toHaveText('Weak');
  55  |     await page.fill('#pwd', 'StrongPass123!');
  56  |     await expect(page.locator('#strengthLabel')).toHaveText('Strong');
  57  |     await page.fill('#pwd-confirm', 'StrongPass123!');
  58  | 
  59  |     // Submit Step 1
  60  |     await page.fill('#ownerNameInput', 'Test Owner');
  61  |     await page.click('#mainContinueBtn');
  62  |     
  63  |     // Wait for navigation to Step 2
> 64  |     await expect(page).toHaveURL(/.*2_Restaurant_Registration_Step_2\.html/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  65  | 
  66  |     // Fill Step 2
  67  |     await page.fill('#restName', 'Test Restaurant');
  68  |     await page.selectOption('#cuisineType', 'Italian');
  69  |     await page.fill('#fssaiNumber', '12345678901234');
  70  |     await page.fill('#gstin', '22AAAAA0000A1Z5');
  71  |     await page.click('text=Continue to Location');
  72  | 
  73  |     // Wait for Step 3
  74  |     await expect(page).toHaveURL(/.*3_Restaurant_Registration_Step_3\.html/);
  75  | 
  76  |     // 6. Location picker
  77  |     // Since we don't have real geolocation permissions in headless mode easily, we mock it or manually fill
  78  |     await page.fill('input[placeholder="Street number, building name"]', '123 Fake St');
  79  |     await page.fill('input[placeholder="Enter city"]', 'Test City');
  80  |     await page.fill('input[placeholder="Enter state"]', 'Test State');
  81  |     await page.fill('input[placeholder="6-digit code"]', '123456');
  82  |     await page.fill('input[placeholder="+1 234 567 890"]', '+1234567890');
  83  |     
  84  |     // 9. Submit button behavior
  85  |     await page.click('text=Continue to Document Verification');
  86  | 
  87  |     // Wait for Step 4
  88  |     await expect(page).toHaveURL(/.*4_Restaurant_Registration_Step_4\.html/);
  89  | 
  90  |     // 7. Document uploads
  91  |     // Uploads are mocked via 'submitStep4()'
  92  |     await page.click('text=Continue to Final Review');
  93  | 
  94  |     // Wait for Step 5
  95  |     await expect(page).toHaveURL(/.*5_Restaurant_Registration_Step_5\.html/);
  96  | 
  97  |     // 8. Terms & Conditions checkbox
  98  |     // Verify submit is disabled
  99  |     const finalSubmitBtn = page.locator('button.bg-primary:has-text("Submit Registration")');
  100 |     await expect(finalSubmitBtn).toBeDisabled();
  101 | 
  102 |     // Check all checkboxes
  103 |     const checkboxes = page.locator('input[type="checkbox"]');
  104 |     const count = await checkboxes.count();
  105 |     for (let i = 0; i < count; i++) {
  106 |       await checkboxes.nth(i).check();
  107 |     }
  108 |     await expect(finalSubmitBtn).toBeEnabled();
  109 | 
  110 |     // 10. Error messages / Success submission
  111 |     // Since backend might fail on invalid email format or duplication, we capture response
  112 |     await finalSubmitBtn.click();
  113 |     
  114 |     // Check if it redirects to Step 6
  115 |     await expect(page).toHaveURL(/.*6_Registration_Success_Status\.html/, { timeout: 10000 });
  116 |   });
  117 | });
  118 | 
```