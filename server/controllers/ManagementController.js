const fs = require("fs");
const csv = require("csv-parser");

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
    let mediumCount = 0;

    results.map((row) => {
      const date = new Date(row.created);
      const type = row.type;
      if(type === "medium") {
        mediumCount++;
      } 
    })




    res.status(200).json(mediumCount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAcceptanceDictionary,
  //   generateReport,
};
