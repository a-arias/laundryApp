import { test, expect } from '@playwright/test';

// Create an array of locators
let doors = [
  '#alert-input-10-0',
  '#alert-input-10-1',
  '#alert-input-10-2'
];

//kinds of detergents
let detergents = [
  '#alert-input-13-0',
  '#alert-input-13-1',
  '#alert-input-13-2'
];

//Fill credit card function
async function fillCreditCardInformation(page, params: { cardNumber: string, cardExpiration: string, cardCvv: string }) {
  // Access the iframe using a general selector that matches part of the name
  const frameElement = await page.locator('iframe[name^="__privateStripeFrame"]').first();
  const frame = await frameElement.contentFrame();

  // Ensure the frame is found
  if (frame) {
    // Fill in the credit card information
    await frame.locator('#Field-numberInput').fill(params.cardNumber);
    await frame.locator('#Field-expiryInput').fill(params.cardExpiration);
    await frame.locator('#Field-cvcInput').fill(params.cardCvv);
  } else {
    throw new Error('Iframe not found');
  }
}

// Function to click on a random locator
async function clickRandomElementFromList(page, list) {
  // Generate a random index
  let randomIndex = Math.floor(Math.random() * list.length);
  // Click on the locator at the random index
  await page.locator(list[randomIndex]).click();
}

// Function to click the bagsize
async function selectBagSize(page, size) {
  const selectors = {
    small: '#stepper-small',
    regular: '#stepper-regular',
    large: '#stepper-large'
  };

  const selector = selectors[size];
  if (selector) {
    await page.locator(selector).getByRole('img').nth(1).click();
  } else {
    throw new Error(`Invalid bag size: ${size}`);
  }
}

// Function to click on the correct radio button based on a parameter
async function selectCoverage(page, option) {
  const selectors = {
    basic: 'poplin-radio-button:has-text("Basic") #radio-',
    premium: 'div:has-text("Premium$") #radio-',
    premiumPlus: 'div:has-text("Premium+$") #radio-',
  };

  const selector = selectors[option];
  if (selector) {
    await page.locator(selector).click();
  } else {
    throw new Error(`Invalid option: ${option}`);
  }
}

async function selectDeliveryOption(page, option) {
  const selectors = {
    standard: 'poplin-radio-button:has-text("Standard Delivery") #radio-',
    express: 'poplin-radio-button:has-text("Express Delivery") #radio-'
  };

  const selector = selectors[option];
  if (selector) {
    await page.locator(selector).click();
  } else {
    throw new Error(`Invalid option: ${option}`);
  }
}

async function clickNewOrderButton(page) {
  await page.waitForTimeout(3000);

  const dmlContainerButton = page.locator('#dml-container').first();
  const newOrderButton = page.locator('#buttonLabel-new-order-button');

  if (await dmlContainerButton.isVisible()) {
    await dmlContainerButton.click();
  } else if (await newOrderButton.isVisible()) {
    await newOrderButton.click();
  } else {
    throw new Error('Neither button is present');
  }
}



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
  await page.goto('https://nonprod-app.poplin.co/auth');
  //# click continue
  await page.getByText('Continue with Email').click();
  //#enter email
  await page.getByLabel('Email Address').fill('andrew+ggg@poplin.co');
  //# click nexst
  await page.locator('#buttonLabel-email-login-button').click();
  //#enter password
  await page.getByLabel('Password', { exact: true }).fill('Password1!');
  //#click login button
  await page.locator('#buttonLabel-enter-password-login-button').click();
  //#click nex button
  await page.locator('#buttonLabel-auth-pn-next-button').click();
  
  //#click notification permissions button
  //# this shows up the first time only
  //await page.locator('#notification-permission-ok').click();

  //# clicks new order button
  await clickNewOrderButton(page);

  //# clicks start new order button
  await page.locator('ion-item').filter({ hasText: 'Start new order' }).getByRole('img').click();
  
  //#fill out address information
  await page.locator('#pickup-location').click();
  //await page.locator('#').click();
  await page.locator('#Line1').fill('1');

  //#selects address from dinamic list
  await page.getByText('Home Avenue, Berwyn, IL, USA').click();
  //#click save address
  await page.getByText('Save').click();

  //click select pickup location dropdown and click a random door
  await page.locator('#pickup-location-select-wrapper').click();
  await clickRandomElementFromList(page,doors);
  //click done button
  await page.getByRole('button', { name: 'Done' }).click();

  //click Continue button
  await page.locator('#pickup-continue-button path').click();
  
  //select type of delivery
  await selectDeliveryOption(page, params.deliveryType);

  //click continue button
  await page.locator('#buttonLabel-delivery-continue-button').click();

  //select random detergent from the list.
  await page.getByText('Select DetergentSelect an').click();
  await clickRandomElementFromList(page,detergents);
  await page.getByRole('button', { name: 'Done' }).click();

  //#selects specifications
  await page.getByLabel('delicates').getByRole('img').click();
  await page.getByLabel('hang-dry').getByRole('img').click();
  await page.getByLabel('hangers').getByRole('img').click();

  //selects additional request
  await page.locator('poplin-checkbox').filter({ hasText: 'Additional Requests' }).getByRole('img').click();

  //types additional requests
  await page.locator('#additional-instructions [id="-container"] div')
  //type the request
  await page.getByRole('textbox', { name: 'Keep your order simple to' }).fill('Please take care of my clothes');

  //click continue button
  await page.locator('#buttonLabel-preferences-continue-button').click();

  //selecting small bags
  await selectBagSize(page, params.bagSize);

  //click continue button
  await page.locator('#buttonLabel-bag-continue-button').click();

  //click continue button
  await page.locator('#buttonLabel-oversized-continue-button').click();
  
  //check laundry Pros
  await page.locator('#checkbox-drawer-checkbox-1').getByRole('img').click();
  await page.locator('#checkbox-drawer-checkbox-2').getByRole('img').click();
  await page.locator('#checkbox-drawer-checkbox-3').getByRole('img').click();
  await page.locator('#buttonLabel-drawer-modal-continue-button').click();

//select preffered laundry pros
await page.locator('#buttonLabel-preferred-continue-button').click();

//Select Coverage
await selectCoverage(page, params.coverage);

//click review Order
await page.getByText('Review Order').click();

//Assert we are displaying all the order to the user
await expect(page.locator('h2').filter({ hasText: 'Review Order' })).toBeVisible();
await page.getByText('Please review your order for').click();

//Click Pay button
await page.locator('#buttonLabel-place-order-button').click();


// Access the iframe and filll credit card information
// const frameElement = await page.locator('iframe[name^="__privateStripeFrame"]').first();
// const frame = await frameElement.contentFrame();

// if (frame) {
//   await frame.locator('#Field-numberInput').fill(params.cardNumber);
//   await frame.locator('#Field-expiryInput').fill(params.cardExpiration);
//   await frame.locator('#Field-cvcInput').fill(params.cardCvv);
// } else {
//   throw new Error('Iframe not found');
// }

//Fill credit card information
await fillCreditCardInformation(page, params);

//#Click button Pay
await page.getByText('Pay $').click();

//####Assert my Order is displayed on the page.
await expect(page.getByRole('heading', { name: 'order placed' })).toBeVisible();
await expect(page.getByText('New Order')).toBeVisible();
});
}