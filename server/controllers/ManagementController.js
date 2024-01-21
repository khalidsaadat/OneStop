const fs = require("fs");
const csv = require("csv-parser");
const { addMinutesToTime, findCategory } = require("../functions");

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

const getOccupiedDictionary = async (req, res) => {
  try {
    const results = await parseCSV();
    const reservedTypes = new Set(); // To track types assigned to reserved slots
    const openSlotStart = 6; // The first open slot index

    let dictionary = {
      1: { time: null, type: null, available: true, category: null },
      2: { time: null, type: null, available: true, category: null },
      3: { time: null, type: null, available: true, category: null },
      4: { time: null, type: null, available: true, category: null },
      5: { time: null, type: null, available: true, category: null }, // Reserved slots
      6: { time: null, type: null, available: true, category: null },
      7: { time: null, type: null, available: true, category: null },
      8: { time: null, type: null, available: true, category: null },
      9: { time: null, type: null, available: true, category: null },
      10: { time: null, type: null, available: true, category: null }, // Open slots
    };

    results.forEach((item) => {
      let placed = false;

      // Check and place in reserved slots (1-5) if the type is unique
      for (let i = 1; i <= 5; i++) {
        if (!dictionary[i].type && !reservedTypes.has(item.type)) {
          dictionary[i].type = vehicleTypes[item.type];
          dictionary[i].time = addMinutesToTime(item.appointment.split(" ")[1], durationDictionary[vehicleTypes[item.type]]);
          dictionary[i].available = false;
          dictionary[i].category = findCategory(item.created.split(" ")[1], item.appointment.split(" ")[1]);
          reservedTypes.add(item.type);
          placed = true;
          break;
        }
      }

      // If not placed in reserved slots, try open slots (6-10)
      if (!placed) {
        for (let i = openSlotStart; i <= 10; i++) {
          if (!dictionary[i].type) {
            dictionary[i].time = addMinutesToTime(item.appointment.split(" ")[1], durationDictionary[vehicleTypes[item.type]]);
            dictionary[i].type = vehicleTypes[item.type];
            dictionary[i].available = false;
            dictionary[i].category = findCategory(item.created.split(" ")[1], item.appointment.split(" ")[1]);
            placed = true;
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
  getOccupiedDictionary,
  //   generateReport,
};
