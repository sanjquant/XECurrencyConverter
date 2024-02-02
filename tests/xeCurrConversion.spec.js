/**
 * Test Suite: Currency Conversion Validation
 * Description:
 * This test suite iterates over a set of currency pairs and amounts defined in a CSV file (`currPair.csv`)
 * to validate the currency conversion functionality of the Xe Currency Converter application. For each record
 * in the CSV file, it performs a series of actions to test the conversion from a source currency to a target
 * currency and compares the converted amount against expected calculations.
 **/

import fs from 'fs';
import path from 'path';
const { test, expect } = require('@playwright/test');
import { parse } from 'csv-parse/sync';
const { chromium } = require('@playwright/test');
import { extractAndFormatNumber, multiplyFirstRateWithValue } from '../utils/numberFormatter.js';

import { CurrencyConverterPage } from '../pages/currencyConverter.js'

// Reading the test testdata from csv file
const records = parse(fs.readFileSync(path.join(__dirname, '../testData/currPair.csv')), {
    columns: true,
    skip_empty_lines: true
});


for (const record of records) {
    test(`Validate Currency Conversion  -- From >> ${record.FromCurrency} -- To >>${record.ToCurrency} @smoketest`, async () => {
        console.log(`test running at ${process.env.URL2}`)
        console.log(record.Amount, record.FromCurrency, record.ToCurrency);

        // Launch the Browser :
        const browser = await chromium.launch({ headless: true }); // Set headless: false to see the browser UI
        const page = await browser.newPage();


        // Listen for the dialog event and dismiss the dialog
        // This will effectively "block" the alert by not allowing it to be shown
        page.on('dialog', async (dialog) => {
            console.log(`Dialog of type ${dialog.type()} with message "${dialog.message()}" is being dismissed.`);
            await dialog.dismiss();
        });

        // Instantialte the curency converter class:
        const currConvPage = new CurrencyConverterPage(page);

        // Navigate to the application : 
        
        await currConvPage.navigateToXeCurrencyConverterWebsite(process.env.URL2);

        // Verify the title of the website
        await currConvPage.verifyPageTitle();

        // Enter Amount : 
        await currConvPage.enterAmount(record.Amount);

        // Select From Currency
        await currConvPage.selectFromCurrency(record.FromCurrency);

        // Select To Currency
        await currConvPage.selectToCurrency(record.ToCurrency);

        // Click on Button Convert :
        await currConvPage.clickOnConvertButton();

        // Handling the first alert with a button named 'Accept'
        await currConvPage.acceptFirstAlert();

        // Wait for 10 seconds (10000 milliseconds)
        await page.waitForTimeout(10000);

        // Extract the base and quote currency rates
        const rateValues = await currConvPage.extractRateValues();
        console.log(`Xe rates for the currency pair >>${record.FromCurrency} and ${record.ToCurrency} is >>  ${rateValues}`);

        const expResult = multiplyFirstRateWithValue(rateValues, Number(record.Amount));
        console.log(`${record.Amount} ${record.FromCurrency} is expected to be  ${expResult} ${record.ToCurrency}`)


        // Now Capture the converted rate just 2 decimal place
        const firstBigRateValue = await currConvPage.getFirstBigRateValue();
        const actualResult = extractAndFormatNumber(firstBigRateValue);
        // console.log(`this is the actual value >> ${actualResult}`);
        console.log(`In actual >> ${record.Amount} ${record.FromCurrency} is >> ${actualResult} ${record.ToCurrency}`)

        // Assert the actual and expected rates :
        expect(expResult).toEqual(actualResult);

        // Close the browser
        await browser.close();

    });
}