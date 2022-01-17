import express from "express";
import axios from "axios";

const PORT = process.env.PORT || 3001;
const app = express();

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

app.get("/api/", async (req, res) => {
  let listEmployees = [
    {
      "firstName": "Roy",
      "lastName": "Testerton",
      "dateOfBirth": "19/02/1990",
      "jobTitle": "Software developer",
      "company": "Test co",
      "country": "US"
    },
    {
      "firstName": "Lisa",
      "lastName": "Testora",
      "dateOfBirth": "11/07/1984",
      "jobTitle": "CTO",
      "company": "Test co",
      "country": "GBR"
    },
    {
      "firstName": "Simon",
      "lastName": "McTester",
      "dateOfBirth": "01/11/1987",
      "jobTitle": "Product manager",
      "company": "Mock industries",
      "country": "IND"
    },
    {
      "firstName": "Selina",
      "lastName": "Testo",
      "dateOfBirth": "23/11/1972",
      "jobTitle": "Software developer",
      "company": "Mock industries",
      "country": "IND"
    },
    {
      "firstName": "Tim",
      "lastName": "Mockman",
      "dateOfBirth": "12/11/1972",
      "jobTitle": "Software developer",
      "company": "Mock industries",
      "country": "IND"
    },
    {
      "firstName": "Melissa",
      "lastName": "Mocker",
      "dateOfBirth": "10/01/1982",
      "jobTitle": "Software developer",
      "company": "Mock industries",
      "country": "US"
    }
  ];
  let responseApi = []

  await asyncForEach(listEmployees, async (employee) => {
    await axios.get(`https://restcountries.com/v3.1/alpha/${employee.country}`)
      .then(response => {
        let modifiedEmplyee = { ...employee }
        modifiedEmplyee["fullNameCountry"] = response.data[0].name.common;
        modifiedEmplyee["currencyCountry"] = Object.keys(response.data[0].currencies)[0];
        modifiedEmplyee["languagesCountry"] = Object.values(response.data[0].languages);
        modifiedEmplyee["timezoneCountry"] = response.data[0].timezones;

        if (response.data[0].continents.includes("Asia")
        || response.data[0].continents.includes("Europe")) {
          modifiedEmplyee["additionalID"] = `${employee.firstName.toLowerCase()}${employee.lastName.toLowerCase()}${employee.dateOfBirth.replaceAll("/", "")}`;
        }

        responseApi.push(modifiedEmplyee);
      })
      .catch(error => {

      });
  })


  res.json(responseApi);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
