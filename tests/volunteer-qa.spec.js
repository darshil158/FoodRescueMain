const { test, expect } = require('@playwright/test');

test.describe('Volunteer Registration QA', () => {
  test('Complete Registration Flow', async ({ page }) => {
    await page.goto('/6_volunteer_registration.html');

    // Fill form
    await page.fill('#vol-name', 'Test Volunteer');
    await page.fill('#vol-phone', '+1234567890');
    await page.fill('#vol-email', 'volunteer@example.com');

    // Select vehicle type
    await page.selectOption('select', 'car');

    // Check location
    await page.click('button:has-text("Submit For Verification")');

    // Intercept alert if registration fails
    page.on('dialog', dialog => dialog.accept());

    // Expect button to change to 'Processing...' or 'Registration Sent!'
    const submitBtn = page.locator('button:has-text("Processing..."), button:has-text("Registration Sent!")');
    await expect(submitBtn).toBeVisible({ timeout: 5000 });
  });

  test('Missing Required Fields', async ({ page }) => {
    await page.goto('/6_volunteer_registration.html');
    
    // HTML5 Validation kicks in because of 'required' attributes on #vol-name and #vol-email
    const submitBtn = page.locator('button:has-text("Submit For Verification")');
    await submitBtn.click();
    
    // Validate that it did NOT say "Processing..."
    await expect(submitBtn).toHaveText('Submit For Verification');
  });
});
