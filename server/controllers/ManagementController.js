const fs = require("fs");
const csv = require("csv-parser");

// Yes
const vehicleTypes = {
  "compact": 1,
  "medium": 2,
  "full-size": 3,
  "class 1 truck": 4,
  "class 2 truck": 5,
};

// in Skribbl Dollars
const costDictionary = {
  "compact": 150,
  "medium": 150,
  "full-size": 150,
  "class 1 truck": 250,
  "class 2 truck": 700,
};

// in minutes
const durationDictionary = {
  1: 30,
  2: 30,
  3: 30,
  4: 60,
  5: 120,
};

const parseCSV = () => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream("./data/datafile_sorted.csv")
      .pipe(csv({ headers: false, skipLines: 0 }))
      .on("data", (row) => {
        const formattedRow = {
          created: row[0], // First value
          appointment: row[1], // Second value
          type: row[2], // Third value
        };
        results.push(formattedRow);
      })
      .on("end", () => {
        resolve(results); // Resolve the promise with the results
      })
      .on("error", (error) => {
        reject(error); // Reject the promise if there's an error
      });
  });
};

const getAcceptanceDictionary = async (req, res) => {
  try {
    const results = await parseCSV();
    // let mediumCount = 0;

    // // create a dictionary for base
    // let occupiedDictionary = {
    //     1: {},
    //     2: {},
    //     3: {},
    //     4: {},
    //     5: {},
    //     6: {},
    //     7: {},
    //     8: {},
    //     9: {},
    //     10: {},
    // };

    // results.map((row) => {
    //   const createdDate = new Date(row.created);
    //   const appointmentDate = new Date(row.appointment);
    //   const type = row.type;

    //   const vehicleType = vehicleTypes[type];

    //   occupiedDictionary[vehicleType] = {}
    // })
    // res.status(200).json(mediumCount);

    const typeToKeyMap = {
      "full-size": 1,
      "medium": 2,
      "compact": 3,
      "class 1 truck": 4,
      "class 2 truck": 5,
    };

    let dictionary = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null, // Reserved slots
      6: null,
      7: null,
      8: null,
      9: null,
      10: null, // Open slots
    };

    results.forEach((item) => {
      let typeKey = typeToKeyMap[item.type];

      if (typeKey && !dictionary[typeKey]) {
        // If the type is mapped and the reserved slot is not occupied
        dictionary[typeKey] = item;
      } else {
        // Try to find an open slot if the reserved slot is occupied
        for (let i = 6; i <= 10; i++) {
          if (!dictionary[i]) {
            dictionary[i] = item;
            break;
          }
        }
      }
    });

    res.status(200).json(dictionary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAcceptanceDictionary,
  //   generateReport,
};
