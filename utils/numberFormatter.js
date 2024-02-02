/**
 * Extracts a number from a string and formats it to a string with two decimal places.
 * This function is useful for processing strings that contain currency values or other numerical
 * information where comma separation and precise decimal formatting are required.
 * 
 * @param {string} intext - The input text containing a number possibly with commas and decimal places.
 * @returns {string|null} - Returns the formatted number as a string with two decimal places,
 *                           or null if no valid number could be extracted.
 */

function extractAndFormatNumber(intext) {
    let text = intext.replace(/,/g, '');
    const regex = /(\d+(\.\d+)?)/;
    const match = text.match(regex);
    if (match) {
        const number = parseFloat(match[0]);
        return number.toFixed(2); // Convert to string with 2 decimal places
    } else {
        return null; // Or return a default value or throw an error if no number is found
    }
}


/**
 * Multiplies a given number (`x`) by the first numerical value extracted from an array of rate strings.
 * This function is designed to calculate currency conversion amounts based on rate information provided
 * in string format. It assumes the rate string format begins with a numerical value following an equals
 * sign (e.g., "1 EUR = 0.853040 GBP").
 * 
 * @param {string[]} rates - An array of strings containing rate information.
 * @param {number} x - The amount to be converted based on the rate extracted from the first element of the rates array.
 * @returns {string} - The result of the multiplication, formatted as a string with two decimal places.
 * @throws {Error} - Throws an error if the rates array is empty, not provided, or the first element is not a valid string,
 *                   or if the `x` is not a number, or if the numerical value cannot be extracted or is invalid.
 */

function multiplyFirstRateWithValue(rates, x) {
    // Ensure rates is an array and has at least one element
    if (!Array.isArray(rates) || rates.length === 0) {
        throw new Error('rates array is empty or not provided');
    }

    // Ensure the first element of rates is a string
    const firstRateString = rates[0];
    if (typeof firstRateString !== 'string') {
        throw new Error('The first element of rates is not a string');
    }

    // Extract the numerical value from the first element of the array
    const rateValueMatch = firstRateString.match(/=\s*([0-9.]+)/);

    // Check if the extraction was successful
    if (rateValueMatch && rateValueMatch[1]) {
        const rateValue = parseFloat(rateValueMatch[1]);
        if (!isNaN(rateValue) && typeof x === 'number') {
            const result = rateValue * x;
            return result.toFixed(2);
        } else {
            throw new Error('x is not a number or rate value is not a valid number');
        }
    } else {
        throw new Error('Failed to extract a numerical value from the rates array');
    }
}




export { extractAndFormatNumber, multiplyFirstRateWithValue };
