const fs = require("fs");
const csv = require("csv-parser");

// Yes
const vehicleTypes = {
  compact: 1,
  medium: 2,
  "full-size": 3,
  "class 1 truck": 4,
  "class 2 truck": 5,
};

// in Skribbl Dollars
const costDictionary = {
  compact: 150,
  medium: 150,
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
      medium: 2,
      compact: 3,
      "class 1 truck": 4,
      "class 2 truck": 5,
    };

    const reservedTypes = new Set(); // To track types assigned to reserved slots
    let openSlotStart = 6; // The first open slot index

    let dictionary = {
      1: { time: null, type: null, available: true },
      2: { time: null, type: null, available: true },
      3: { time: null, type: null, available: true },
      4: { time: null, type: null, available: true },
      5: { time: null, type: null, available: true }, // Reserved slots
      6: { time: null, type: null, available: true },
      7: { time: null, type: null, available: true },
      8: { time: null, type: null, available: true },
      9: { time: null, type: null, available: true },
      10: { time: null, type: null, available: true }, // Open slots
    };

    results.forEach((item) => {
      let placed = false;

      // Check and place in reserved slots (1-5) if the type is unique
      for (let i = 1; i <= 5; i++) {
        if (dictionary[i].type === item.type) {
          break;
        } else if (!dictionary[i].type && !reservedTypes.has(item.type)) {
          dictionary[i].time = item.appointment;
          dictionary[i].type = item.type;
          dictionary[i].available = false;
          reservedTypes.add(item.type);
          placed = true;
          break;
        }
      }

      // If not placed in reserved slots, try open slots (6-10)
      if (!placed) {
        for (let i = openSlotStart; i <= 10; i++) {
          if (!dictionary[i].type) {
            dictionary[i].time = item.appointment;
            dictionary[i].type = item.type;
            dictionary[i].available = false;
            placed = true;
            break;
          } else if (dictionary[i].type === item.type) {
            // dictionary[i].qty++;
            // placed = true;
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
