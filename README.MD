# Playwright Test Automation

This project contains automated tests for verifying the ordering process on the Poplin website using Playwright.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Test Parameters](#test-parameters)
- [Functions](#functions)
- [Running Tests](#running-tests)

## Installation

First, make sure you have [Node.js](https://nodejs.org/) installed. Then, install the project dependencies:

```bash
npm install
```

## Running tests
npx playwright test

## Test Parameters
The tests run with different combinations of parameters defined in the testParameters array. Here are the parameters used:
```const testParameters = [ { "deliveryType": "standard", "coverage": "basic", "bagSize": "small", "cardType": "Visa", "cardNumber": "4242 4242 4242 4242", "cardExpiration": "12/34", "cardCvv": "123" }, { "deliveryType": "standard", "coverage": "basic", "bagSize": "regular", "cardType": "American Express", "cardNumber": "3782 8224 6310 005", "cardExpiration": "12/34", "cardCvv": "1234" }, // Add more parameters here... ];```