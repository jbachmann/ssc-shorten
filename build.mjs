import fs from "fs";
import { load } from "js-yaml"

const DIST_FOLDER = "dist";
const LINKS_FILE_NAME = "public/shorten.yaml";

const template = (location) =>
  `<html><head><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta http-equiv="Pragma" content="no-cache" /><meta http-equiv="Expires" content="0" /><meta http-equiv="REFRESH" content="0;url=${location}"/></head><body></body></html>`;

// Read the new links yaml file
const linksText = fs.readFileSync(LINKS_FILE_NAME, "utf8");

// Convert from YAML to JSON
const linksJson = load(linksText);

if (fs.existsSync(DIST_FOLDER)){
  // Delete the _ directory
  fs.rmSync(DIST_FOLDER, { recursive: true, force: true });
}

// Recreate the _ directory
fs.mkdirSync(DIST_FOLDER);
fs.writeFileSync(`${DIST_FOLDER}/shorten.yaml`, linksText)
fs.writeFileSync(`${DIST_FOLDER}/index.html`, template("shorten.yaml"))

Object.entries(linksJson).forEach(([key, value]) => {
  const data = template(value)
  if (!fs.existsSync(`${DIST_FOLDER}/${key}`)) {
    fs.mkdirSync(`${DIST_FOLDER}/${key}`);
  }
  fs.writeFileSync(`${DIST_FOLDER}/${key}/index.html`, data)
});