import { test, expect } from '@playwright/test';
import { userEmail, userPassword } from '../fixtures/user';
import { BASE_URL } from '../config';
import * as helpers from '../helpers';


// Test parameters
const testParameters = [
  { deliveryType: 'standard', coverage: 'basic', bagSize: 'small', cardType: 'Visa', cardNumber: '4242 4242 4242 4242', cardExpiration: '12/34', cardCvv:'123' },
  { deliveryType: 'standard', coverage: 'basic', bagSize: 'regular', cardType: 'American Express', cardNumber: '3782 8224 6310 005', cardExpiration: '12/34', cardCvv:'1234'  },
  { deliveryType: 'standard', coverage: 'basic', bagSize: 'large', cardType: 'MasterCard', cardNumber: '5555 5555 5555 4444', cardExpiration: '12/34', cardCvv:'123'  },
  { deliveryType: 'standard', coverage: 'premium', bagSize: 'small', cardType: 'Discover', cardNumber: '6011 1111 1111 1117', cardExpiration: '12/34', cardCvv:'123'  },
  { deliveryType: 'standard', coverage: 'premium', bagSize: 'regular', cardType: 'Visa', cardNumber: '4242 4242 4242 4242' , cardExpiration: '12/34', cardCvv:'123' },
  { deliveryType: 'standard', coverage: 'premium', bagSize: 'large', cardType: 'American Express', cardNumber: '3782 8224 6310 005', cardExpiration: '12/34', cardCvv:'1234'  },
  { deliveryType: 'standard', coverage: 'premiumPlus', bagSize: 'small', cardType: 'MasterCard', cardNumber: '5555 5555 5555 4444', cardExpiration: '12/34', cardCvv:'123'  },
  { deliveryType: 'standard', coverage: 'premiumPlus', bagSize: 'regular', cardType: 'Discover', cardNumber: '6011 1111 1111 1117' , cardExpiration: '12/34', cardCvv:'123' },
  { deliveryType: 'standard', coverage: 'premiumPlus', bagSize: 'large', cardType: 'Visa', cardNumber: '4242 4242 4242 4242', cardExpiration: '12/34', cardCvv:'123'  },
  { deliveryType: 'express', coverage: 'basic', bagSize: 'small', cardType: 'American Express', cardNumber: '3782 8224 6310 005' , cardExpiration: '12/34', cardCvv:'1234' },
  { deliveryType: 'express', coverage: 'basic', bagSize: 'regular', cardType: 'MasterCard', cardNumber: '5555 5555 5555 4444', cardExpiration: '12/34', cardCvv:'123'  },
  { deliveryType: 'express', coverage: 'basic', bagSize: 'large', cardType: 'Discover', cardNumber: '6011 1111 1111 1117', cardExpiration: '12/34', cardCvv:'123'  },
  { deliveryType: 'express', coverage: 'premium', bagSize: 'small', cardType: 'Visa', cardNumber: '4242 4242 4242 4242', cardExpiration: '12/34', cardCvv:'123'  },
  { deliveryType: 'express', coverage: 'premium', bagSize: 'regular', cardType: 'American Express', cardNumber: '3782 8224 6310 005', cardExpiration: '12/34', cardCvv:'1234'  },
  { deliveryType: 'express', coverage: 'premium', bagSize: 'large', cardType: 'MasterCard', cardNumber: '5555 5555 5555 4444', cardExpiration: '12/34', cardCvv:'123'  },
  { deliveryType: 'express', coverage: 'premiumPlus', bagSize: 'small', cardType: 'Discover', cardNumber: '6011 1111 1111 1117', cardExpiration: '12/34', cardCvv:'123'  },
  { deliveryType: 'express', coverage: 'premiumPlus', bagSize: 'regular', cardType: 'Visa', cardNumber: '4242 4242 4242 4242', cardExpiration: '12/34', cardCvv:'123'  },
  { deliveryType: 'express', coverage: 'premiumPlus', bagSize: 'large', cardType: 'American Express', cardNumber: '3782 8224 6310 005', cardExpiration: '12/34', cardCvv:'1234'  }
];

//####### Run tests with each combination of test cases 
for (const params of testParameters) {
test(`Order with ${params.deliveryType} delivery, ${params.coverage} coverage, ${params.bagSize} bag, using ${params.cardType}`, async ({ page }) => {
  //#navigate to webpage
  await page.goto(BASE_URL + '/auth');
  
  //# click continue
  await page.getByText('Continue with Email').click();
  //#enter email
  await page.getByLabel('Email Address').fill(userEmail);
  
  //# click nexst
  await page.locator('#buttonLabel-email-login-button').click();
  
  //#enter password
  await page.getByLabel('Password', { exact: true }).fill(userPassword);
  
  //#click login button
  await page.locator('#buttonLabel-enter-password-login-button').click();
  
  //#click nex button
  await page.locator('#buttonLabel-auth-pn-next-button').click();

  //# clicks new order button
  await helpers.clickNewOrderButton(page);

  //# clicks start new order button
  await page.locator('ion-item').filter({ hasText: 'Start new order' }).getByRole('img').click();

  //#fill out address information
  await helpers.createLocationIfNotPresent(page);

  //select type of delivery
  await helpers.selectDeliveryOption(page, params.deliveryType);

  //selecting small bags
  await helpers.selectBagSize(page, params.bagSize);

  //click continue button
  await page.locator('#buttonLabel-bag-continue-button').click();

  //click continue button
  await page.locator('#buttonLabel-oversized-continue-button').click();

  //check laundry Pros
  //#1
  await page.locator('#checkbox-drawer-checkbox-1').getByRole('img').click();
  //#2
  await page.locator('#checkbox-drawer-checkbox-2').getByRole('img').click();
  //#3
  await page.locator('#checkbox-drawer-checkbox-3').getByRole('img').click();
  //#4
  await page.locator('#buttonLabel-drawer-modal-continue-button').click();

  //select preffered laundry pros
  await page.locator('#buttonLabel-preferred-continue-button').click();

  //Select Coverage
  await helpers.selectCoverage(page, params.coverage);

  //click review Order
  await page.getByText('Review Order').click();

  //Assert we are displaying all the order to the user
  await expect(page.locator('h2').filter({ hasText: 'Review Order' })).toBeVisible();

  //click review order button
  await page.getByText('Please review your order for').click();

  //click dismiss button if button shows up
  await helpers.dismissButtonIfPresent(page);

  //Click Pay button
  await page.locator('#buttonLabel-place-order-button').click();

  //Fill credit card information
  await helpers.fillCreditCardInformation(page, params.cardNumber,params.cardExpiration,params.cardCvv);

  //#Click button Pay
  await page.getByText('Pay $').click();

  //####Assert my Order is displayed on the page.
  await expect(page.getByRole('heading', { name: 'order placed' })).toBeVisible();
  await expect(page.getByText('New Order')).toBeVisible();
});
}