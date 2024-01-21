const fs = require("fs");
const csv = require("csv-parser");
const {
  addMinutesToTime,
  findCategory,
  convertTimeToMinutes,
} = require("../functions");

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

let deniedDictionary = {
  1: { qty: 0, month: null },
  2: { qty: 0, month: null },
  3: { qty: 0, month: null },
  4: { qty: 0, month: null },
  5: { qty: 0, month: null }, // Reserved slots
};

const addToDeniedDictionary = (item) => {
  if (deniedDictionary.hasOwnProperty(item.type)) {
    deniedDictionary[item.type].qty += 1;
    deniedDictionary[item.type].month = item.appointment
      .split(" ")[0]
      .split("-")[1];
  } else {
    // If the key does not exist in the dictionary, initialize it
    deniedDictionary[item.type] = {
      qty: 1,
      month: item.appointment.split(" ")[0].split("-")[1],
    };
  }
};

const getOccupiedDictionary = async (req, res) => {
  try {
    const results = await parseCSV();
    const reservedTypes = new Set(); // To track types assigned to reserved slots
    const openSlotStart = 6; // The first open slot index

    let occupiedDictionary = {
      1: { time: null, date: null, type: null, available: true, category: null },
      2: { time: null, date: null, type: null, available: true, category: null },
      3: { time: null, date: null, type: null, available: true, category: null },
      4: { time: null, date: null, type: null, available: true, category: null },
      5: { time: null, date: null, type: null, available: true, category: null }, // Reserved slots
      6: { time: null, date: null, type: null, available: true, category: null },
      7: { time: null, date: null, type: null, available: true, category: null },
      8: { time: null, date: null, type: null, available: true, category: null },
      9: { time: null, date: null, type: null, available: true, category: null },
      10: { time: null, date: null, type: null, available: true, category: null }, // Open slots
    };

    let successfullyPlaced = 0;
    let rejectionCount = 0;

    for (let i = 0; i < results.length; i++) {
      console.log(i)
      let item = results[i];
      let placed = false;

      // Rejection criteria
      if (
        addMinutesToTime(
          item.appointment.split(" ")[1],
          durationDictionary[vehicleTypes[item.type]]
        ) > "19:00"
      ) {
        // add to denied dictionary
        addToDeniedDictionary(item);
        rejectionCount += 1;
        continue;
      }

      for (let i = 1; i <= 10; i++) {
        const occupiedTime = convertTimeToMinutes(
          occupiedDictionary[i].time || "00:00"
        );
        const appointmentTime = convertTimeToMinutes(
          item.appointment.split(" ")[1]
        );

        if (occupiedTime <= appointmentTime) {
          // clear reserved set if the type is equal to occupied dictionary
          if (occupiedDictionary[i].type === vehicleTypes[item.type]) {
            reservedTypes.delete(item.type);
          }
         
          occupiedDictionary[i].time = null;
          occupiedDictionary[i].type = null;
          occupiedDictionary[i].date = null;
          occupiedDictionary[i].available = true;
          occupiedDictionary[i].category = null;
        }
      }

      // Check and place in reserved slots (1-5) if the type is unique
      for (let i = 1; i <= 5; i++) {
        if (!occupiedDictionary[i].type && !reservedTypes.has(item.type)) {
          occupiedDictionary[i].type = vehicleTypes[item.type];
          occupiedDictionary[i].time = addMinutesToTime(
            item.appointment.split(" ")[1],
            durationDictionary[vehicleTypes[item.type]]
          );
          occupiedDictionary[i].date = item.appointment;
          occupiedDictionary[i].available = false;
          occupiedDictionary[i].category = findCategory(
            item.created.split(" ")[1],
            item.appointment.split(" ")[1]
          );
          reservedTypes.add(item.type);
          placed = true;
          successfullyPlaced += 1;
          break;
        }
      }
      

      // If not placed in reserved slots, try open slots (6-10)
      if (!placed) {
        for (let i = openSlotStart; i <= 10; i++) {
          if (!occupiedDictionary[i].type) {
            occupiedDictionary[i].time = addMinutesToTime(
              item.appointment.split(" ")[1],
              durationDictionary[vehicleTypes[item.type]]
            );
            occupiedDictionary[i].type = vehicleTypes[item.type];
            occupiedDictionary[i].date = item.appointment;
            occupiedDictionary[i].available = false;
            occupiedDictionary[i].category = findCategory(
              item.created.split(" ")[1],
              item.appointment.split(" ")[1]
            );
            placed = true;
            successfullyPlaced += 1;
            break;
          }
        }
      }
    }

    console.log(rejectionCount)
    res.status(200).json(occupiedDictionary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDeniedDictionary = async (req, res) => {
  try {
    const results = await parseCSV();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getOccupiedDictionary,
  getDeniedDictionary,
};
