# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-qa.spec.js >> Admin Approval QA >> Tab Switching Simulation
- Location: tests\admin-qa.spec.js:30:3

# Error details

```
Error: expect(locator).toHaveClass(expected) failed

Locator: locator('button:has-text("NGOs")')
Expected pattern: /active-tab/
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveClass" with timeout 5000ms
  - waiting for locator('button:has-text("NGOs")')
    4 × locator resolved to <button class="pb-stack-sm font-label-lg text-label-lg whitespace-nowrap text-on-surface-variant hover:text-primary transition-colors">NGOs</button>
      - unexpected value "pb-stack-sm font-label-lg text-label-lg whitespace-nowrap text-on-surface-variant hover:text-primary transition-colors"

```

```yaml
- main:
  - text: "404"
  - paragraph: The requested path could not be found
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Admin Approval QA', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Add fake token to prevent redirect
  6  |     await page.addInitScript(() => {
  7  |       window.localStorage.setItem('foodRescueToken', 'fake-token-123');
  8  |     });
  9  |   });
  10 | 
  11 |   test('Approve Verification Request', async ({ page }) => {
  12 |     await page.goto('/15_verification_management.html');
  13 | 
  14 |     // Wait for cards to load
  15 |     const approveBtns = page.locator('button:has-text("Approve")');
  16 |     const initialCount = await approveBtns.count();
  17 |     
  18 |     if (initialCount > 0) {
  19 |       // Click first approve
  20 |       await approveBtns.first().click();
  21 |       
  22 |       // Wait for card to animate out
  23 |       await page.waitForTimeout(500);
  24 |       
  25 |       const newCount = await approveBtns.count();
  26 |       expect(newCount).toBeLessThan(initialCount);
  27 |     }
  28 |   });
  29 | 
  30 |   test('Tab Switching Simulation', async ({ page }) => {
  31 |     await page.goto('/15_verification_management.html');
  32 | 
  33 |     const ngoTab = page.locator('button:has-text("NGOs")');
  34 |     await ngoTab.click();
> 35 |     await expect(ngoTab).toHaveClass(/active-tab/);
     |                          ^ Error: expect(locator).toHaveClass(expected) failed
  36 |   });
  37 | });
  38 | 
```