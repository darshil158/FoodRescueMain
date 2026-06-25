# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ngo-qa.spec.js >> NGO Registration QA - End to End >> 6. Terms checkbox not selected
- Location: tests\ngo-qa.spec.js:130:3

# Error details

```
Error: locator.check: Clicking the checkbox did not change its state
Call log:
  - waiting for locator('input[type="checkbox"]').nth(1)
    - locator resolved to <input type="checkbox" class="custom-checkbox w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action
    - click action done
    - waiting for scheduled navigations to finish
    - navigations have finished

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]: volunteer_activism
      - generic [ref=e5]: Food Rescue Hero
    - generic [ref=e6]:
      - generic [ref=e7]: Need assistance?
      - button "Contact Support" [ref=e8] [cursor=pointer]
  - main [ref=e9]:
    - generic [ref=e10]:
      - generic [ref=e11]:
        - heading "Final Review" [level=1] [ref=e12]
        - generic [ref=e13]: Step 5 of 5
      - paragraph [ref=e16]: Please carefully review all the information provided below. Once submitted, your registration will undergo an audit by the Food Rescue Hero compliance team.
    - generic [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]:
          - generic [ref=e20]:
            - generic [ref=e21]:
              - heading "account_circle Account" [level=2] [ref=e22]:
                - generic [ref=e23]: account_circle
                - text: Account
              - button "Edit" [ref=e24] [cursor=pointer]
            - generic [ref=e25]:
              - generic [ref=e26]:
                - paragraph [ref=e27]: Administrator Name
                - paragraph [ref=e28]: Sarah Jenkins
              - generic [ref=e29]:
                - paragraph [ref=e30]: Work Email
                - paragraph [ref=e31]: s.jenkins@communitypantry.org
          - generic [ref=e32]:
            - generic [ref=e33]:
              - heading "corporate_fare NGO Info" [level=2] [ref=e34]:
                - generic [ref=e35]: corporate_fare
                - text: NGO Info
              - button "Edit" [ref=e36] [cursor=pointer]
            - generic [ref=e37]:
              - generic [ref=e38]:
                - paragraph [ref=e39]: Legal Entity Name
                - paragraph [ref=e40]: The Community Pantry Foundation
              - generic [ref=e41]:
                - paragraph [ref=e42]: "Tax ID / Registration #"
                - paragraph [ref=e43]: NGO-8821-39402
        - generic [ref=e44]:
          - generic [ref=e45]:
            - heading "location_on Primary Location" [level=2] [ref=e46]:
              - generic [ref=e47]: location_on
              - text: Primary Location
            - button "Edit" [ref=e48] [cursor=pointer]
          - generic [ref=e49]:
            - generic [ref=e50]:
              - paragraph [ref=e51]: Street Address
              - paragraph [ref=e52]: 452 Harvest Way, Suite 10
            - generic [ref=e53]:
              - generic [ref=e54]: map
              - generic [ref=e55]: San Francisco, CA 94103
        - generic [ref=e56]:
          - generic [ref=e57]:
            - heading "pending_actions Operations" [level=2] [ref=e58]:
              - generic [ref=e59]: pending_actions
              - text: Operations
            - button "Edit" [ref=e60] [cursor=pointer]
          - generic [ref=e61]:
            - generic [ref=e62]:
              - paragraph [ref=e63]: Cold Storage Cap.
              - paragraph [ref=e64]: 2,500 cu ft
            - generic [ref=e65]:
              - paragraph [ref=e66]: Delivery Fleet
              - paragraph [ref=e67]: 3 Temperature-Controlled Vans
            - generic [ref=e68]:
              - paragraph [ref=e69]: Peak Hours
              - paragraph [ref=e70]: 08:00 AM - 04:00 PM
        - generic [ref=e71]:
          - heading "Legal Agreements & Consents" [level=2] [ref=e72]
          - generic [ref=e73]:
            - generic [ref=e74] [cursor=pointer]:
              - checkbox "I certify that all information provided in this registration is true, complete, and accurate to the best of my knowledge." [checked] [ref=e76]
              - generic [ref=e77]: I certify that all information provided in this registration is true, complete, and accurate to the best of my knowledge.
            - generic [ref=e78] [cursor=pointer]:
              - checkbox "I confirm that our organization complies with all local health and food safety regulations regarding the handling and storage of donated goods." [active] [ref=e80]
              - generic [ref=e81]: I confirm that our organization complies with all local health and food safety regulations regarding the handling and storage of donated goods.
            - generic [ref=e82] [cursor=pointer]:
              - checkbox "I have read and agree to the Terms & Conditions and Privacy Policy of the Food Rescue Hero platform." [ref=e84]
              - generic [ref=e85]:
                - text: I have read and agree to the
                - link "Terms & Conditions" [ref=e86]:
                  - /url: "#"
                - text: and
                - link "Privacy Policy" [ref=e87]:
                  - /url: "#"
                - text: of the Food Rescue Hero platform.
      - complementary [ref=e88]:
        - generic [ref=e89]:
          - generic [ref=e90]:
            - generic [ref=e91]: warning
            - heading "Important Notice" [level=3] [ref=e92]
          - paragraph [ref=e93]: Provision of false or misleading information is a violation of our code of ethics. Non-compliance or fraudulent registration may result in immediate account termination and potential legal penalties under local NGO regulatory frameworks.
        - generic [ref=e94]:
          - img [ref=e95]
          - generic [ref=e96]:
            - paragraph [ref=e97]: Your impact starts here.
            - paragraph [ref=e98]: Join 4,000+ NGOs rescuing food daily.
        - generic [ref=e99]:
          - button "Submit Registration send" [disabled] [ref=e100]:
            - text: Submit Registration
            - generic [ref=e101]: send
          - button "arrow_back Back to Operations" [ref=e102] [cursor=pointer]:
            - generic [ref=e103]: arrow_back
            - text: Back to Operations
  - button "arrow_back" [ref=e104] [cursor=pointer]:
    - generic [ref=e105]: arrow_back
  - button "home" [ref=e106] [cursor=pointer]:
    - generic [ref=e107]: home
```

# Test source

```ts
  39  |     await expect(page.locator('#successBadge')).toBeVisible();
  40  |     
  41  |     // Continue
  42  |     await page.click('button:has-text("Continue")', { force: true });
  43  |     await expect(page).toHaveURL(/.*2_NGO_Registration_Step_2.*/);
  44  |   });
  45  | 
  46  |   test('2. Missing required fields', async ({ page }) => {
  47  |     await page.goto('/1_NGO_Registration_Step_1.html');
  48  |     
  49  |     // Try submit without filling fields
  50  |     await page.evaluate(() => document.getElementById('continueBtn').disabled = false);
  51  |     await page.click('button:has-text("Continue")', { force: true });
  52  |     
  53  |     const err = page.locator('#globalError');
  54  |     await expect(err).toBeVisible();
  55  |     await expect(err).toContainText('Please fill in all required fields');
  56  |   });
  57  | 
  58  |   test('3. Invalid email format', async ({ page }) => {
  59  |     await page.goto('/1_NGO_Registration_Step_1.html');
  60  |     await page.fill('#emailInput', 'not-an-email');
  61  |     await page.click('#verifyEmailBtn', { force: true });
  62  |     
  63  |     const err = page.locator('#globalError');
  64  |     await expect(err).toBeVisible();
  65  |     await expect(err).toContainText('Please enter a valid email address');
  66  |   });
  67  | 
  68  |   test('4. Wrong OTP behavior', async ({ page }) => {
  69  |     page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  70  |     page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  71  | 
  72  |     await page.route('**/api/auth/verify/send', async route => {
  73  |       await route.fulfill({ status: 200, json: { message: 'OTP sent' } });
  74  |     });
  75  |     await page.route('**/api/auth/verify/confirm', async route => {
  76  |       if (route.request().method() === 'OPTIONS') {
  77  |         await route.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' } });
  78  |       } else {
  79  |         await route.fulfill({ status: 400, json: { message: 'Incorrect OTP. Please try again.' }, headers: { 'Access-Control-Allow-Origin': '*' } });
  80  |       }
  81  |     });
  82  | 
  83  |     await page.goto('/1_NGO_Registration_Step_1.html');
  84  |     await page.fill('#emailInput', 'test@ngo.com');
  85  |     await page.click('#verifyEmailBtn', { force: true });
  86  |     
  87  |     await expect(page.locator('#otpSection')).toBeVisible();
  88  | 
  89  |     const otpInputs = page.locator('.otp-input');
  90  |     for(let i=0; i<6; i++) {
  91  |         await otpInputs.nth(i).fill('0');
  92  |     }
  93  |     await page.click('#verifyOtpBtn', { force: true });
  94  |     
  95  |     const err = page.locator('#globalError');
  96  |     await expect(err).toBeVisible();
  97  |     await expect(err).toContainText('Incorrect OTP');
  98  |     await expect(page.locator('#successBadge')).toBeHidden();
  99  |   });
  100 | 
  101 |   test('5. Large document uploads / Invalid file types', async ({ page }) => {
  102 |     await page.goto('/4_NGO_Registration_Step_4.html');
  103 |     
  104 |     const fileInput = page.locator('#fileInput');
  105 |     
  106 |     // Create an invalid file type buffer
  107 |     const invalidBuffer = Buffer.alloc(1024);
  108 |     await fileInput.setInputFiles({
  109 |         name: 'test.exe',
  110 |         mimeType: 'application/x-msdownload',
  111 |         buffer: invalidBuffer
  112 |     });
  113 |     
  114 |     let err = page.locator('#globalError');
  115 |     await expect(err).toBeVisible();
  116 |     await expect(err).toContainText('has unsupported type');
  117 |     
  118 |     // Create a large file > 10MB
  119 |     const largeBuffer = Buffer.alloc(11 * 1024 * 1024);
  120 |     await fileInput.setInputFiles({
  121 |         name: 'large.pdf',
  122 |         mimeType: 'application/pdf',
  123 |         buffer: largeBuffer
  124 |     });
  125 |     
  126 |     await expect(err).toBeVisible();
  127 |     await expect(err).toContainText('exceeds 10MB limit');
  128 |   });
  129 | 
  130 |   test('6. Terms checkbox not selected', async ({ page }) => {
  131 |     await page.goto('/5_NGO_Registration_Step_5.html');
  132 |     
  133 |     const submitBtn = page.locator('button:has-text("Submit Registration")');
  134 |     await expect(submitBtn).toBeDisabled();
  135 |     
  136 |     const checkboxes = page.locator('input[type="checkbox"]');
  137 |     const count = await checkboxes.count();
  138 |     for(let i = 0; i < count; i++) {
> 139 |         await checkboxes.nth(i).check();
      |                                 ^ Error: locator.check: Clicking the checkbox did not change its state
  140 |     }
  141 |     await expect(submitBtn).toBeEnabled();
  142 |   });
  143 | });
  144 | 
```