const { expect } = require('@playwright/test');

/**
 * Represents the page object for the XE Currency Converter website, encapsulating
 * the interactions needed to perform currency conversion tests.
 * This class provides methods to navigate to the website, enter amounts, select currencies,
 * perform conversions, and validate conversion results.
 */

export class CurrencyConverterPage {

    /**
     * Initializes a new instance of the CurrencyConverterPage class.
     * @param {Page} page - The Playwright page object representing the browser page.
     */
    constructor(page) {

        this.page = page
        this.amount_textbox = page.getByLabel('Amount')
        this.from_curr_dropdown = page.locator('#midmarketFromCurrency').getByPlaceholder('Type to search...')
        this.to_curr_dropdown = page.locator('#midmarketToCurrency').getByPlaceholder('Type to search...')
        this.convert_button = page.getByRole('button', { name: 'Convert', exact: true })

    }

    /**
     * Navigates to the XE Currency Converter website using the provided URL.
     * @param {string} websiteUrl - The URL of the XE Currency Converter website.
     */
    async navigateToXeCurrencyConverterWebsite(websiteUrl) {
        await this.page.goto(websiteUrl);
    }

    /**
     * Enters a specified amount into the 'Amount' text box.
     * @param {string} amount - The amount to be converted.
     */
    async enterAmount(amount) {
        await this.amount_textbox.fill(amount);
    }

    /**
     * Selects the 'From' currency from its dropdown menu.
     * @param {string} fromCurrency - The currency to convert from.
     */
    async selectFromCurrency(fromCurrency) {
        await this.from_curr_dropdown.click();
        await this.page.getByRole('option', { name: fromCurrency }).locator('span').click();

    }

    /**
     * Selects the 'To' currency from its dropdown menu.
     * @param {string} toCurrency - The currency to convert to.
     */
    async selectToCurrency(toCurrency) {
        await this.to_curr_dropdown.click();
        await this.page.getByRole('option', { name: toCurrency }).locator('span').click();
    }

    /**
     * Clicks the 'Convert' button to initiate the currency conversion.
     */
    async clickOnConvertButton() {
        await this.convert_button.click();
    }

    /**
     * Extracts the rate values displayed on the conversion results page.
     * @returns {Promise<string[]>} An array of strings representing the rate values.
     */
    async extractRateValues() {
        // Extract the text content of each <p> tag within the specified <div> and return them as an array
        const rateValues = await this.page.$$eval('div[class*="unit-rates___StyledDiv"] p', elements =>
            elements.map(element => element.textContent));
        return rateValues;
    }

    /**
     * Retrieves the first large rate value displayed on the conversion results page.
     * @returns {Promise<string>} The first big rate value as a string.
     */
    async getFirstBigRateValue(page) {
        const firstBigRateValue = await this.page.$$eval('p[class*="result__BigRate"]', elements =>
            elements.map(element => element.textContent.trim())[0]);
        return firstBigRateValue;
    }

    /**
     * Accepts the first alert dialog by clicking the 'Accept' button, if present.
     */
    async acceptFirstAlert() {
        try {
            const acceptButton = this.page.locator('button', { hasText: 'Accept' });
            if (await acceptButton.isVisible({ timeout: 10000 })) { // Adjust timeout as needed
                await acceptButton.click();
                console.log('First alert accepted.');
            }
        } catch (error) {
            console.log('First alert not found or already closed.');
        }
    }


    /**
    * Verifies that the page title matches the expected title for the XE Currency Converter website.
    * @param {string} [expectedTitle='Xe Currency Converter - Live Exchange Rates Today'] - The expected title of the page.
    */
    async verifyPageTitle(expectedTitle = 'Xe Currency Converter - Live Exchange Rates Today') {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

}