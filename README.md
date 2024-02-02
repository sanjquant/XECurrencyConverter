/**
 * Test Suite: Currency Conversion Validation
 * Description:
 * This test suite iterates over a set of currency pairs and amounts defined in a CSV file (`currPair.csv`)
 * to validate the currency conversion functionality of the Xe Currency Converter application. For each record
 * in the CSV file, it performs a series of actions to test the conversion from a source currency to a target
 * currency and compares the converted amount against expected calculations.
 * 
 * CSV File Structure:
 * The CSV file should contain columns for `Amount`, `FromCurrency`, and `ToCurrency`.
 * 
 * Test Steps for Each Record:
 * 1. Launch a headless browser session.
 * 2. Navigate to the Xe Currency Converter website as specified by the environment variable `URL2`.
 * 3. Dismiss any dialog alerts that may appear during the session.
 * 4. Verify the page title to ensure navigation to the correct URL.
 * 5. Enter the amount for conversion as specified in the CSV record.
 * 6. Select the source (FromCurrency) and target (ToCurrency) currencies.
 * 7. Initiate the conversion by clicking the "Convert" button.
 * 8. Optionally handle and accept a known alert that may appear post-conversion.
 * 9. Wait for the conversion result to load and become visible on the page.
 * 10. Extract the conversion rate displayed on the page and calculate the expected result using utility functions.
 * 11. Capture the actual conversion result displayed on the website.
 * 12. Assert that the actual conversion result matches the expected result calculated by the test, within a reasonable margin.
 * 13. Close the browser session.
 * 
 * Utility Functions:
 * - `extractAndFormatNumber`: Parses and formats a string to extract numeric values with decimal points.
 * - `multiplyFirstRateWithValue`: Calculates the expected conversion result based on the rate extracted from the website and the amount specified in the CSV.
 * 
 * External Dependencies:
 * - Playwright for browser automation.
 * - `csv-parse/sync` for parsing the CSV file.
 * - Custom page object model (`CurrencyConverterPage`) to encapsulate interactions with the currency converter application.
 * 
 * Environment Variables:
 * - `URL2`: The URL of the Xe Currency Converter application to test against.
 * - Set the environment from termial as >> $env:ENV="local"
 * 
 * Execution:
 * This test suite dynamically generates tests for each currency pair and amount specified in the `currPair.csv` file,
 * tagging each test with `@smoketest` for easy inclusion or exclusion during test runs.
 * 
 * Note:
 * The test assumes the presence of environment variables and external utility functions for parsing numbers and calculating expected results.
 * It demonstrates advanced Playwright features such as dialog handling, dynamic test generation, and custom utility integration for test assertions.
 * 
 * ### Tools & Technologies
 * Node JS
 * VS Code
 * JavaScript
 *
 * ### To use this project
 * Step 1 - Download the folder or clone the repository
 * Step 2 - Check node.js is installed on your system  **`node -v`**
 * Step 3 - Open terminal/cmd > Goto project folder > Run command 
 **`npm ci`**	
 *  This will install all the required libaries in package.json
 * 
 * ## Running the test
 *  Navigate to the project root folder and run the command :  npx playwright test ./tests/xeCurrConversion.spec.js --grep "@smoketest"
 *  
 *  ## Test Report :
 *  ![image](https://github.com/sanjquant/XECurrencyConverter/assets/88951836/2e2109eb-c856-4e9d-86d8-0973990981f8)

 *  
 *  
 */
