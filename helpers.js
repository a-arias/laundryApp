
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
export async function fillCreditCardInformation(page, cardNumber, cardExpiration, cardCvv) {
  // Access the iframe using a general selector that matches part of the name
  const frameElement = await page.locator('iframe[name^="__privateStripeFrame"]').first();
  const frame = await frameElement.contentFrame();

  // Ensure the frame is found
  if (frame) {
    // Fill in the credit card information
    await frame.locator('#Field-numberInput').fill(cardNumber);
    await frame.locator('#Field-expiryInput').fill(cardExpiration);
    await frame.locator('#Field-cvcInput').fill(cardCvv);
  } else {
    throw new Error('Iframe not found');
  }
}

// Function to click on a random locator
export async function clickRandomElementFromList(page, list) {
  // Generate a random index
  let randomIndex = Math.floor(Math.random() * list.length);
  // Click on the locator at the random index
  await page.locator(list[randomIndex]).click();
}

// Function to click the bagsize
export async function selectBagSize(page, size) {
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
export async function selectCoverage(page, option) {
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

//select a delivery option
export async function selectDeliveryOption(page, option) {
  const selectors = {
    standard: 'poplin-radio-button:has-text("Standard Delivery") #radio-',
    express: 'poplin-radio-button:has-text("Express Delivery") #radio-'
  };

  const selector = selectors[option];
  if (selector) {
    await page.locator(selector).click();
     //click continue button
      await page.locator('#buttonLabel-delivery-continue-button').click();
  } else {
    throw new Error(`Invalid option: ${option}`);
  }
}

//click New Order Button
export async function clickNewOrderButton(page) {
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

//creates a new location if is not present
export async function createLocationIfNotPresent(page) {
  // Try to click the pickup location button
  const pickupLocationButton = page.locator('#pickup-location');
  const isButtonVisible = await pickupLocationButton.isVisible();
  
  if (isButtonVisible) {
    await pickupLocationButton.click();
    //fill address
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
  } else {
    // If not visible, click the pickup continue button selecting the default profile
    const pickupContinueButton = await page.getByText('Continue');
    await pickupContinueButton.click();
  }
}

//selects detergent and preferences
export async function selectDetergentAndPreferences(page, detergents) {
  // Select random detergent from the list
  await page.getByText('Select DetergentSelect an').click();
  await clickRandomElementFromList(page, detergents);
  await page.getByRole('button', { name: 'Done' }).click();

  // Select specifications
  await page.getByLabel('delicates').getByRole('img').click();
  await page.getByLabel('hang-dry').getByRole('img').click();
  await page.getByLabel('hangers').getByRole('img').click();

  // Select additional request
  await page.locator('poplin-checkbox').filter({ hasText: 'Additional Requests' }).getByRole('img').click();

  // Type additional requests
  await page.getByRole('textbox', { name: 'Keep your order simple to' }).fill('Please take care of my clothes');

  // Click continue button
  await page.locator('#buttonLabel-preferences-continue-button').click();

  //select Detergent type and preferences
  await selectDetergentAndPreferences(page, detergents);
}

//dismiss error button if shows up
export async function dismissButtonIfPresent(page) {
  try {
    // Try to click the dismiss button
    await page.getByRole('button', { name: 'Dismiss' }).click();
  } catch (error) {
    // Ignore the error if the button is not present
    if (error.message.includes('not found')) {
      console.log('Dismiss button not found');
    } else {
      throw error;
    }
  }
}