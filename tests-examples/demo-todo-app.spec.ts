import { test, expect } from '@playwright/test';

// Test parameters
const testParameters = [
  { deliveryType: 'Standard', coverage: 'Basic', bagSize: 'Small', cardType: 'Visa', cardNumber: '4242 4242 4242 4242' },
  { deliveryType: 'Standard', coverage: 'Basic', bagSize: 'Normal', cardType: 'American Express', cardNumber: '3782 8224 6310 005' },
  { deliveryType: 'Standard', coverage: 'Basic', bagSize: 'Large', cardType: 'MasterCard', cardNumber: '5555 5555 5555 4444' },
  { deliveryType: 'Standard', coverage: 'Premium', bagSize: 'Small', cardType: 'Discover', cardNumber: '6011 1111 1111 1117' },
  { deliveryType: 'Standard', coverage: 'Premium', bagSize: 'Normal', cardType: 'Visa', cardNumber: '4242 4242 4242 4242' },
  { deliveryType: 'Standard', coverage: 'Premium', bagSize: 'Large', cardType: 'American Express', cardNumber: '3782 8224 6310 005' },
  { deliveryType: 'Standard', coverage: 'Premium Plus', bagSize: 'Small', cardType: 'MasterCard', cardNumber: '5555 5555 5555 4444' },
  { deliveryType: 'Standard', coverage: 'Premium Plus', bagSize: 'Normal', cardType: 'Discover', cardNumber: '6011 1111 1111 1117' },
  { deliveryType: 'Standard', coverage: 'Premium Plus', bagSize: 'Large', cardType: 'Visa', cardNumber: '4242 4242 4242 4242' },
  { deliveryType: 'Express', coverage: 'Basic', bagSize: 'Small', cardType: 'American Express', cardNumber: '3782 8224 6310 005' },
  { deliveryType: 'Express', coverage: 'Basic', bagSize: 'Normal', cardType: 'MasterCard', cardNumber: '5555 5555 5555 4444' },
  { deliveryType: 'Express', coverage: 'Basic', bagSize: 'Large', cardType: 'Discover', cardNumber: '6011 1111 1111 1117' },
  { deliveryType: 'Express', coverage: 'Premium', bagSize: 'Small', cardType: 'Visa', cardNumber: '4242 4242 4242 4242' },
  { deliveryType: 'Express', coverage: 'Premium', bagSize: 'Normal', cardType: 'American Express', cardNumber: '3782 8224 6310 005' },
  { deliveryType: 'Express', coverage: 'Premium', bagSize: 'Large', cardType: 'MasterCard', cardNumber: '5555 5555 5555 4444' },
  { deliveryType: 'Express', coverage: 'Premium Plus', bagSize: 'Small', cardType: 'Discover', cardNumber: '6011 1111 1111 1117' },
  { deliveryType: 'Express', coverage: 'Premium Plus', bagSize: 'Normal', cardType: 'Visa', cardNumber: '4242 4242 4242 4242' },
  { deliveryType: 'Express', coverage: 'Premium Plus', bagSize: 'Large', cardType: 'American Express', cardNumber: '3782 8224 6310 005' }
];

// Run tests with each combination of parameters
for (const params of testParameters) {
  test(`Order with ${params.deliveryType} delivery, ${params.coverage} coverage, ${params.bagSize} bag, using ${params.cardType}`, async ({ page }) => {
    await test.step('Create order with parameters', async () => {
      await page.goto('https://nonprod-app.poplin.co/');

      // Log in (fill in the locators and credentials as needed)
      await page.fill('input[name="email"]', 'testuser@example.com');
      await page.fill('input[name="password"]', 'Password1!');
      await page.click('button[type="submit"]');

      // Wait for successful login
      await page.waitForSelector('#welcomeMessage');

      // Click on "New Order" button
      await page.click('#newOrderButton'); // Replace with actual locator

      // Click on start new order button
      await page.click('#startNewOrderButton'); // Replace with actual locator

     // Select a profile from the list
     await page.click('#profileList .profileItem'); // Replace with actual locator

     // Click on Continue
     await page.click('#continueButton'); // Replace with actual locator

     // Select delivery speed
     await page.selectOption('#deliverySpeedSelect', params.deliveryType); // Replace with actual locator

     // Click on Continue
     await page.click('#continueButton'); // Replace with actual locator

     // Select bag size
     await page.selectOption('#bagSizeSelect', params.bagSize); // Replace with actual locator

     // Click on Continue
     await page.click('#continueButton'); // Replace with actual locator

     // Select oversized items
     await page.click('#oversizedItemsCheckbox'); // Replace with actual locator

     // Click on the 3 checkboxes for protecting laundry pros
     await page.click('#protectingLaundryPro1'); // Replace with actual locator
     await page.click('#protectingLaundryPro2'); // Replace with actual locator
     await page.click('#protectingLaundryPro3'); // Replace with actual locator

     // Click on Continue
     await page.click('#continueButton'); // Replace with actual locator

     // Select preferred laundry person
     await page.selectOption('#preferredLaundryPersonSelect', 'Person1'); // Replace with actual locator

     // Click on Continue
     await page.click('#continueButton'); // Replace with actual locator

     // Select coverage
     await page.selectOption('#coverageSelect', params.coverage); // Replace with actual locator

     // Click on Review Order
     await page.click('#reviewOrderButton'); // Replace with actual locator

     // Click on Continue on the review order page
     await page.click('#continueButton'); // Replace with actual locator

     // Enter test card details
     await page.fill('#cardNumberInput', params.cardNumber); // Replace with actual locator
     await page.fill('#expirationDateInput', '12/34'); // Replace with actual locator
     await page.fill('#cvvInput', '567'); // Replace with actual locator

     // Click on Pay
     await page.click('#payButton'); // Replace with actual locator

     // Verify that the new order appears on the page
     await page.waitForSelector('#orderList .orderItem'); // Replace with actual locator
   });
 });
}