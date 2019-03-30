// Enable Strict Mode
("use strict");
const { BigQuery } = require("@google-cloud/bigquery");

// Set Credentials
//const path = "C:/Users/teddy/Downloads/decoded-reducer-234800-f824d46ed564.json";
const path = "/Users/kevinz/Downloads/decoded-reducer-234800-b532ca7bb227.json";
process.env.GOOGLE_APPLICATION_CREDENTIALS = path;

const router = require("express").Router();

async function query(source, contentType, content1, content2, year) {
  const bigquery = new BigQuery();
  // SQL Query String
  var sqlQuery = `SELECT ${content1},${content2} FROM \`${source}${contentType}.${year}\`LIMIT 10`;
  console.log(
    `SELECT ${content1},${content2} FROM \`${source}${contentType}.${year}\`LIMIT 10`
  );
  // Query Options,
  const options = {
    query: sqlQuery,
    location: "US"
  };
  const [rows] = await bigquery.query(options);
  return [rows];
}

router.post("/api/give", function(req, res) {
  console.log(req.body.queryInfo);
  params = req.body.queryInfo;

  query(
    params.Source,
    "comments",
    params.Content1,
    params.Content2,
    "2005"
  ).then(function(resOfQuery) {
    res.json(resOfQuery);
    console.log("HELLO WORLD!");
  });
});

module.exports = router;

// router.get("/api/all", function(req, res) {
//   query().then(function(result) {
//     res.json(result);
//   });
// });
