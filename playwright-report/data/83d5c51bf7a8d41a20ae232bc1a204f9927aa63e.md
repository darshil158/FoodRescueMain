# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: volunteer-qa.spec.js >> Volunteer Registration QA >> Missing Required Fields
- Location: tests\volunteer-qa.spec.js:41:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Submit For Verification")')
    - locator resolved to <button disabled id="mainContinueBtn" class="w-full md:w-auto bg-primary text-on-primary font-label-lg text-label-lg px-gutter py-stack-md rounded-full hover:bg-primary-container hover:text-on-primary-container active:scale-95 transition-all duration-200 shadow-lg opacity-50 cursor-not-allowed">↵                Submit For Verification↵        …</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    51 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5] [cursor=pointer]: arrow_back
        - heading "FoodRescue" [level=1] [ref=e6]
      - generic [ref=e7]:
        - generic [ref=e8]: notifications
        - img "User Profile" [ref=e10]
  - main [ref=e11]:
    - generic [ref=e12]:
      - heading "Join the Mission" [level=2] [ref=e13]
      - paragraph [ref=e14]: "Loom & Harvest: Connect surplus food to those in need. Become a vital link in our community rescue chain."
    - generic [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e17]:
          - generic [ref=e18]: person
          - heading "Personal Details" [level=3] [ref=e19]
        - generic [ref=e20]:
          - generic [ref=e21]:
            - generic [ref=e22]: Full Name
            - textbox "Enter your full name" [ref=e23]
          - generic [ref=e24]:
            - generic [ref=e25]: Mobile Number
            - textbox "+1 (555) 000-0000" [ref=e26]
          - generic [ref=e27]:
            - generic [ref=e28]: Email Address
            - generic [ref=e29]:
              - textbox "email@example.com" [ref=e30]
              - button "Verify Email" [ref=e31] [cursor=pointer]
      - generic [ref=e32]:
        - generic [ref=e33]:
          - generic [ref=e34]: local_shipping
          - heading "Logistics & Vehicle" [level=3] [ref=e35]
        - generic [ref=e36]:
          - generic [ref=e37]: Vehicle Type
          - generic [ref=e38]:
            - combobox [ref=e39]:
              - option "Select your primary transport" [disabled] [selected]
              - option "Bike"
              - option "Bicycle"
              - option "Car"
              - option "Walking"
            - generic: expand_more
      - generic [ref=e40]:
        - generic [ref=e41]:
          - generic [ref=e42]: location_on
          - heading "Primary Address" [level=3] [ref=e43]
        - generic [ref=e44]:
          - generic [ref=e45]:
            - button "map Pick on Map" [ref=e46] [cursor=pointer]:
              - generic [ref=e47]: map
              - text: Pick on Map
            - button "edit Type Manually" [ref=e48] [cursor=pointer]:
              - generic [ref=e49]: edit
              - text: Type Manually
          - generic [ref=e51] [cursor=pointer]:
            - generic [ref=e52]: add_location_alt
            - paragraph [ref=e53]: Tap to Open Map
            - paragraph [ref=e54]: Click to drop a pin on the map
        - generic [ref=e55]:
          - generic [ref=e56]:
            - generic [ref=e58]: Live Location Tracking
            - generic [ref=e59]: ⚠️ Location access denied
          - generic [ref=e60]:
            - generic:
              - generic [ref=e61]:
                - button "Zoom in" [ref=e62] [cursor=pointer]: +
                - button "Zoom out" [ref=e63] [cursor=pointer]: −
              - generic [ref=e64]:
                - link "Leaflet" [ref=e65] [cursor=pointer]:
                  - /url: https://leafletjs.com
                  - img [ref=e66]
                  - text: Leaflet
                - text: "| © OpenStreetMap contributors"
          - generic [ref=e70]:
            - generic [ref=e71]:
              - text: "?? Lat:"
              - strong [ref=e72]: �
            - generic [ref=e73]:
              - text: "?? Lng:"
              - strong [ref=e74]: �
            - generic [ref=e75]:
              - text: "?? Accuracy:"
              - strong [ref=e76]: �
            - button "Stop" [ref=e77] [cursor=pointer]
      - generic [ref=e78]:
        - generic [ref=e79]:
          - generic [ref=e80]: cloud_upload
          - heading "Document Verification" [level=3] [ref=e81]
        - generic [ref=e82]:
          - generic [ref=e83] [cursor=pointer]:
            - generic [ref=e84]: account_circle
            - paragraph [ref=e85]: Profile Photo
            - paragraph [ref=e86]: JPG, PNG up to 5MB
          - generic [ref=e87] [cursor=pointer]:
            - generic [ref=e88]: badge
            - paragraph [ref=e89]: Government ID
            - paragraph [ref=e90]: Passport, License, or SSN
          - generic [ref=e91] [cursor=pointer]:
            - generic [ref=e92]: OPTIONAL
            - generic [ref=e93]: volunteer_activism
            - paragraph [ref=e94]: NGO ID
            - paragraph [ref=e95]: Existing Volunteer Cards
      - generic [ref=e96]:
        - generic [ref=e97]:
          - generic [ref=e98]: lock
          - heading "Security Details" [level=3] [ref=e99]
        - generic [ref=e100]:
          - generic [ref=e101]:
            - generic [ref=e102]: Password
            - textbox "••••••••" [ref=e103]
          - generic [ref=e104]:
            - generic [ref=e105]: Confirm Password
            - textbox "••••••••" [ref=e106]
      - generic [ref=e107]:
        - img [ref=e108]
        - generic [ref=e109]:
          - paragraph [ref=e110]: Your contribution matters.
          - paragraph [ref=e111]: Every delivery saves a meal and reduces environmental waste.
  - generic [ref=e113]:
    - generic [ref=e114]:
      - generic [ref=e115]: verified_user
      - generic [ref=e116]: Secure submission encrypted for your privacy.
    - button "Submit For Verification" [disabled] [ref=e117]
  - button "arrow_back" [ref=e118] [cursor=pointer]:
    - generic [ref=e119]: arrow_back
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Volunteer Registration QA', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/');
  6  |     await page.evaluate(() => {
  7  |       window.localStorage.setItem('foodRescueToken', 'fake-token-123');
  8  |       window.localStorage.setItem('foodRescueUser', JSON.stringify({ role: 'volunteer' }));
  9  |     });
  10 |   });
  11 | 
  12 |   test('Complete Registration Flow', async ({ page }) => {
  13 |     await page.route('**/api/auth/register', async route => {
  14 |       if (route.request().method() === 'OPTIONS') {
  15 |         await route.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' } });
  16 |       } else {
  17 |         await route.fulfill({ status: 200, json: { message: 'Success', data: { tokens: { accessToken: 'fake' }, user: {} } }, headers: { 'Access-Control-Allow-Origin': '*' } });
  18 |       }
  19 |     });
  20 |     await page.goto('/6_volunteer_registration.html');
  21 | 
  22 |     // Fill form
  23 |     await page.fill('#vol-name', 'Test Volunteer');
  24 |     await page.fill('#vol-phone', '+1234567890');
  25 |     await page.fill('#vol-email', 'volunteer@example.com');
  26 | 
  27 |     // Select vehicle type
  28 |     await page.selectOption('select', 'car');
  29 | 
  30 |     // Check location
  31 |     await page.click('button:has-text("Submit For Verification")');
  32 | 
  33 |     // Intercept alert if registration fails
  34 |     page.on('dialog', dialog => dialog.accept());
  35 | 
  36 |     // Expect button to change to 'Processing...' or 'Registration Sent!'
  37 |     const submitBtn = page.locator('button:has-text("Processing..."), button:has-text("Registration Sent!")');
  38 |     await expect(submitBtn).toBeVisible({ timeout: 5000 });
  39 |   });
  40 | 
  41 |   test('Missing Required Fields', async ({ page }) => {
  42 |     await page.goto('/6_volunteer_registration.html');
  43 |     
  44 |     // HTML5 Validation kicks in because of 'required' attributes on #vol-name and #vol-email
  45 |     const submitBtn = page.locator('button:has-text("Submit For Verification")');
> 46 |     await submitBtn.click();
     |                     ^ Error: locator.click: Test timeout of 30000ms exceeded.
  47 |     
  48 |     // Validate that it did NOT say "Processing..."
  49 |     await expect(submitBtn).toHaveText('Submit For Verification');
  50 |   });
  51 | });
  52 | 
```