import express, { json, urlencoded } from "express";
import cors from "cors";
import csvtojson from "csvtojson";

const server = express();

server.use(json());
server.use(urlencoded({ extended: true }));
server.use(cors({ origin: true, credentials: true }));

const csvFilePath = "./crime_record.csv";

//Get All Records
server.get("/api/getRecords", async (req, res) => {
  const jsonArray = await csvtojson().fromFile(csvFilePath);
  res.json({
    message: "Crime Record Data",
    data: jsonArray,
  });
});

//Get count for Offence level 1 Description
server.post("/api/countLevel1", async (req, res) => {
  const level1 = req.body.level1;
  const jsonArray = await csvtojson().fromFile(csvFilePath);
  let count = 0;
  jsonArray.forEach((record) => {
    if (
      record["Offence Level 1 Description"].toLowerCase() ===
      level1.toLowerCase()
    ) {
      count++;
    }
  });
  res.json({
    message: "Level 1 Description Count",
    level1: level1.toUpperCase(),
    count,
  });
});

server.listen(8080, () => {
  console.log(`server listening on: 8080`);
});
