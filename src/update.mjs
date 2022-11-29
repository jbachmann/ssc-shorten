import fs from "fs";
import { load } from "js-yaml"

const LINKS_FILE_NAME = "src/shorten.yaml";

const template = (location) =>
  `<html><head><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta http-equiv="Pragma" content="no-cache" /><meta http-equiv="Expires" content="0" /><meta http-equiv="REFRESH" content="0;url=${location}"/></head><body></body></html>`;

// Read the new links yaml file
const linksText = fs.readFileSync(LINKS_FILE_NAME, "utf8");

// Convert from YAML to JSON
const linksJson = load(linksText);

if (fs.existsSync("_")){
  // Delete the _ directory
  fs.rmSync("_", { recursive: true, force: true });
  // Recreate the _ directory
}

fs.mkdirSync("_");

Object.entries(linksJson).forEach(([key, value]) => {
  const data = template(value)
  if (!fs.existsSync(`_/${key}`)){
    fs.mkdirSync(`_/${key}`);
  }
  fs.writeFileSync(`_/${key}/index.html`, data)
});

// console.log(linksYaml);


// TODO: Read the links file, iterate over the map, ensure or create a folder with each short name, ensure or create index.html file with long path redirect in each folder

// current !== latest ? fs.writeFileSync(FILE_NAME, latest) : Promise.resolve()

// fetch(FEED_URL)
//   .then((response) => response.text()) 
//   .then((html) => {
//     const found = new JSDOM(html).window.document.querySelectorAll(
//       "._option a"
//     )[0].href;
//     console.log(found);
//     return found;
//   })
//   .then((href) => template(href))
//   .then((latest) =>
//     current !== latest ? fs.writeFileSync(FILE_NAME, latest) : Promise.resolve()
//   )
//   .catch((err) => console.warn("Something went wrong.", err));



// ----

// const userResponse = await fetch(
//   `https://slack.com/api/users.info?user=${user_id}`,
//   {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${Deno.env.get("BOT_TOKEN")}`,
//       "Content-type": "application/json",
//     },
//   }
// );
// const userResult = await userResponse.json();


// var fs = require('fs');
// var dir = './tmp';

// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }