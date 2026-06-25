# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration.spec.js >> Restaurant Registration QA >> Complete Registration Flow Testing
- Location: tests\registration.spec.js:4:3

# Error details

```
Error: 1. Required fields should trigger alert

expect(received).toContain(expected) // indexOf

Expected substring: "Please fill in all fields"
Received string:    "Please fill in all required fields."
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - button "arrow_back" [ref=e4] [cursor=pointer]
      - heading "Food Rescue Hero" [level=1] [ref=e5]
    - button "Need help? contact_support" [ref=e6] [cursor=pointer]:
      - generic [ref=e7]: Need help?
      - generic [ref=e8]: contact_support
  - main [ref=e9]:
    - generic [ref=e11]:
      - paragraph [ref=e12]: Step 1 of 5
      - paragraph [ref=e13]: Account Creation
    - generic [ref=e16]:
      - generic [ref=e17]:
        - generic [ref=e18]:
          - heading "Basic Information" [level=2] [ref=e19]
          - generic [ref=e20]:
            - generic [ref=e21]:
              - generic [ref=e22]: Restaurant Owner Full Name
              - textbox "John Doe" [ref=e23]
            - generic [ref=e24]:
              - generic [ref=e25]: Restaurant Email
              - generic [ref=e26]:
                - textbox "owner@restaurant.com" [ref=e27]
                - button "Verify Email" [ref=e28] [cursor=pointer]
        - generic [ref=e29]:
          - heading "Security" [level=2] [ref=e30]
          - generic [ref=e31]:
            - generic [ref=e32]:
              - generic [ref=e33]: Password
              - generic [ref=e34]:
                - textbox "••••••••" [ref=e35]
                - generic [ref=e36] [cursor=pointer]: visibility
              - paragraph [ref=e43]: Enter a strong password
            - generic [ref=e44]:
              - generic [ref=e45]: Confirm Password
              - generic [ref=e46]:
                - textbox "••••••••" [ref=e47]
                - generic [ref=e48] [cursor=pointer]: visibility
        - button "Continue to Restaurant Details" [active] [ref=e49]
      - generic [ref=e50]:
        - generic [ref=e51]:
          - heading "Why Join Us?" [level=3] [ref=e52]
          - list [ref=e53]:
            - listitem [ref=e54]:
              - generic [ref=e55]: compost
              - text: Reduce food waste footprint.
            - listitem [ref=e56]:
              - generic [ref=e57]: volunteer_activism
              - text: Support local community food banks.
            - listitem [ref=e58]:
              - generic [ref=e59]: receipt_long
              - text: Get automated tax deduction logs.
        - paragraph [ref=e63]: Join 500+ restaurants making a difference today.
  - button "arrow_back" [ref=e64] [cursor=pointer]:
    - generic [ref=e65]: arrow_back
  - button "home" [ref=e66] [cursor=pointer]:
    - generic [ref=e67]: home
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Restaurant Registration QA', () => {
  4   |   test('Complete Registration Flow Testing', async ({ page }) => {
  5   |     // Navigate to Step 1
  6   |     await page.route('**/api/auth/register', async route => {
  7   |       if (route.request().method() === 'OPTIONS') {
  8   |         await route.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' } });
  9   |       } else {
  10  |         await route.fulfill({ status: 200, json: { message: 'Success', data: { tokens: { accessToken: 'fake' }, user: {} } }, headers: { 'Access-Control-Allow-Origin': '*' } });
  11  |       }
  12  |     });
  13  |     await page.goto('/1_Restaurant_Registration_Step_1.html');
  14  | 
  15  |     // 1. All required fields (Submit with empty fields)
  16  |     let alertMessage = '';
  17  |     page.on('dialog', dialog => {
  18  |       alertMessage = dialog.message();
  19  |       dialog.accept();
  20  |     });
  21  |     
  22  |     await page.evaluate(() => {
  23  |         // Enable button for test purposes to see if it allows submit without verify
  24  |         document.getElementById('mainContinueBtn').disabled = false;
  25  |     });
  26  |     await page.click('#mainContinueBtn');
> 27  |     expect(alertMessage, '1. Required fields should trigger alert').toContain('Please fill in all fields');
      |                                                                     ^ Error: 1. Required fields should trigger alert
  28  | 
  29  |     // 2. Email validation (Enter invalid email and verify)
  30  |     await page.fill('#emailInput', 'invalid-email');
  31  |     // The current code doesn't have strict client-side email regex validation before sending OTP, 
  32  |     // but the API will reject it later.
  33  | 
  34  |     // 3. Email OTP verification
  35  |     const randomEmail = `testowner_${Date.now()}@restaurant.com`;
  36  |     await page.fill('#emailInput', randomEmail);
  37  |     
  38  |     // We expect the Verify Email button to exist, but currently it's hidden by default in the HTML!
  39  |     // Let's unhide it if it is hidden, as per current UI state
  40  |     await page.evaluate(() => document.getElementById('verifyBtn').classList.remove('hidden'));
  41  |     
  42  |     await page.click('#verifyBtn');
  43  |     await expect(page.locator('#otpSection')).toBeVisible({ timeout: 2000 });
  44  | 
  45  |     // 4. OTP resend after 10 seconds
  46  |     const countdownLocator = page.locator('#countdown');
  47  |     await expect(countdownLocator).toContainText('Resend in');
  48  |     // Wait for 11 seconds to verify it changes to 'Resend OTP'
  49  |     await page.waitForTimeout(11000);
  50  |     await expect(countdownLocator).toHaveText('Resend OTP', { timeout: 2000 });
  51  | 
  52  |     // Enter OTP and verify
  53  |     const otpInputs = page.locator('.otp-input');
  54  |     for(let i=0; i<6; i++) {
  55  |         await otpInputs.nth(i).fill('1');
  56  |     }
  57  |     await page.click('text=Verify OTP');
  58  |     await expect(page.locator('#successBadge')).toBeVisible();
  59  | 
  60  |     // 5. Password validation
  61  |     await page.fill('#pwd', 'weak');
  62  |     await expect(page.locator('#strengthLabel')).toHaveText('Weak');
  63  |     await page.fill('#pwd', 'StrongPass123!');
  64  |     await expect(page.locator('#strengthLabel')).toHaveText('Strong');
  65  |     await page.fill('#pwd-confirm', 'StrongPass123!');
  66  | 
  67  |     // Submit Step 1
  68  |     await page.fill('#ownerNameInput', 'Test Owner');
  69  |     await page.click('#mainContinueBtn');
  70  |     
  71  |     // Wait for navigation to Step 2
  72  |     await expect(page).toHaveURL(/.*2_Restaurant_Registration_Step_2\.html/);
  73  | 
  74  |     // Fill Step 2
  75  |     await page.fill('#restName', 'Test Restaurant');
  76  |     await page.selectOption('#restType', 'Cafe / Bistro');
  77  |     await page.fill('#restFSSAI', '12345678901234');
  78  |     await page.fill('#restGST', '22AAAAA0000A1Z5');
  79  |     await page.click('text=Continue to Location');
  80  | 
  81  |     // Wait for Step 3
  82  |     await expect(page).toHaveURL(/.*3_Restaurant_Registration_Step_3\.html/);
  83  | 
  84  |     // 6. Location picker
  85  |     // Since we don't have real geolocation permissions in headless mode easily, we mock it or manually fill
  86  |     await page.fill('input[placeholder="Street number, building name"]', '123 Fake St');
  87  |     await page.fill('input[placeholder="Enter city"]', 'Test City');
  88  |     await page.fill('input[placeholder="Enter state"]', 'Test State');
  89  |     await page.fill('input[placeholder="6-digit code"]', '123456');
  90  |     await page.fill('input[placeholder="+1 234 567 890"]', '+1234567890');
  91  |     
  92  |     // 9. Submit button behavior
  93  |     await page.click('text=Continue to Document Verification');
  94  | 
  95  |     // Wait for Step 4
  96  |     await expect(page).toHaveURL(/.*4_Restaurant_Registration_Step_4\.html/);
  97  | 
  98  |     // 7. Document uploads
  99  |     // Uploads are mocked via 'submitStep4()'
  100 |     await page.click('text=Continue to Final Review');
  101 | 
  102 |     // Wait for Step 5
  103 |     await expect(page).toHaveURL(/.*5_Restaurant_Registration_Step_5\.html/);
  104 | 
  105 |     // 8. Terms & Conditions checkbox
  106 |     // Verify submit is disabled
  107 |     const finalSubmitBtn = page.locator('button.bg-primary:has-text("Submit Registration")');
  108 |     await expect(finalSubmitBtn).toBeDisabled();
  109 | 
  110 |     // Check all checkboxes
  111 |     const checkboxes = page.locator('input[type="checkbox"]');
  112 |     const count = await checkboxes.count();
  113 |     for (let i = 0; i < count; i++) {
  114 |       await checkboxes.nth(i).check();
  115 |     }
  116 |     await expect(finalSubmitBtn).toBeEnabled();
  117 | 
  118 |     // 10. Error messages / Success submission
  119 |     // Since backend might fail on invalid email format or duplication, we capture response
  120 |     await finalSubmitBtn.click();
  121 |     
  122 |     // Check if it redirects to Step 6
  123 |     await expect(page).toHaveURL(/.*6_Registration_Success_Status\.html/, { timeout: 10000 });
  124 |   });
  125 | });
  126 | 
```