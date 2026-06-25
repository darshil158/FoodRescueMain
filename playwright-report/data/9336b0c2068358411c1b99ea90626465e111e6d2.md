# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-qa.spec.js >> Admin Approval QA >> Tab Switching Simulation
- Location: tests\admin-qa.spec.js:31:3

# Error details

```
Error: expect(locator).toHaveClass(expected) failed

Locator: locator('button:has-text("NGOs")').first()
Expected pattern: /active-tab/
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveClass" with timeout 5000ms
  - waiting for locator('button:has-text("NGOs")').first()
    4 × locator resolved to <button class="pb-stack-sm font-label-lg text-label-lg whitespace-nowrap text-on-surface-variant hover:text-primary transition-colors">NGOs</button>
      - unexpected value "pb-stack-sm font-label-lg text-label-lg whitespace-nowrap text-on-surface-variant hover:text-primary transition-colors"

```

```yaml
- banner:
  - button "arrow_back"
  - heading "Food Rescue Hero" [level=1]
  - text: Registration Help Contact
- main:
  - text: Step 1 of 5 Account Creation
  - heading "Organization Details" [level=2]
  - paragraph: Let's start by creating your official NGO profile.
  - text: NGO Name
  - textbox "e.g. Harvest Relief Foundation"
  - text: NGO Registration Number
  - textbox "Official Reg No."
  - text: Organization Email
  - textbox "verify@ngo.org"
  - button "Verify Email"
  - heading "Contact Person" [level=3]
  - text: Full Name
  - textbox "John Doe"
  - text: Designation
  - textbox "e.g. Director"
  - text: Mobile Number +1
  - textbox "123 456 7890"
  - heading "Set Password" [level=3]
  - text: Password
  - textbox "••••••••"
  - text: visibility_off Confirm Password
  - textbox "••••••••"
  - button "Continue arrow_forward" [disabled]
  - button "Save Draft"
- navigation:
  - link "assignment_ind Registration":
    - /url: "#"
  - link "help_outline Help":
    - /url: "#"
  - link "support_agent Contact":
    - /url: "#"
- button "arrow_back"
- button "home"
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Admin Approval QA', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Add fake token to prevent redirect
  6  |     await page.goto('/');
  7  |     await page.evaluate(() => {
  8  |       window.localStorage.setItem('foodRescueToken', 'fake-token-123');
  9  |     });
  10 |   });
  11 | 
  12 |   test('Approve Verification Request', async ({ page }) => {
  13 |     await page.goto('/15_verification_management.html');
  14 | 
  15 |     // Wait for cards to load
  16 |     const approveBtns = page.locator('button:has-text("Approve")');
  17 |     const initialCount = await approveBtns.count();
  18 |     
  19 |     if (initialCount > 0) {
  20 |       // Click first approve
  21 |       await approveBtns.first().click();
  22 |       
  23 |       // Wait for card to animate out
  24 |       await page.waitForTimeout(500);
  25 |       
  26 |       const newCount = await approveBtns.count();
  27 |       expect(newCount).toBeLessThan(initialCount);
  28 |     }
  29 |   });
  30 | 
  31 |   test('Tab Switching Simulation', async ({ page }) => {
  32 |     await page.goto('/15_verification_management.html');
  33 | 
  34 |     const ngoTab = page.locator('button:has-text("NGOs")').first();
  35 |     await ngoTab.click();
> 36 |     await expect(ngoTab).toHaveClass(/active-tab/);
     |                          ^ Error: expect(locator).toHaveClass(expected) failed
  37 |   });
  38 | });
  39 | 
```