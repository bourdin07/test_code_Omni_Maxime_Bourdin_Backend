# test_code_Omnipresent_Backend

## Install Node Packages Depencies

Run the command `npm install`

## Info

The project uses Javascript ES6

- I created an async function `asyncForEach` in order to iterate over the array list of employees
- When the we navigate to the route "/api/", I call the function `await asyncForEach`
- For each iteration I make an API request with Axios with the method GET
- Modify the current employee with additional data `fullNameCountry` `currencyCountry` `languagesCountry` `timezoneCountry`, and push to the final array
- 
- Once all API requests are done, express return the final array

## Modules used

- express `^4.17.2`
- axios `^0.24.0`
