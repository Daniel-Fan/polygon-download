// Step 1: generate the lists. 
// Each fetched list contains 100 models
// These will be saved in assetsLists/assets_0.json, assetsLists/assets_0.json, assetsLists/assets_0.json etc.
// The lists only contain CC-BY models and no tilt brush models
// This will return >800 lists with 100 models in each. Refer here for ways to filter the list:
// https://developers.google.com/poly/reference/api/rest/v1/assets/list

const got = require("got");
const fs = require("fs").promises;
const path = require("path");

// Get an API key here
// https://developers.google.com/poly/develop/api
const API_KEY = "AIzaSyApKim9TN1edBLm4H58hoPL8fZ53hTo8ms";
const API_URL = "https://poly.googleapis.com/v1/assets";

async function fileOrfolderExists(pathName) {
  try {
    await fs.access(pathName);
    return true;
  } catch {
    return false;
  }
}

let page = 0

const getModelLists = async (pageToken = "") => {
  const fileName = `assetsLists/assets_${page}.json`;
  const rawdata = await got(`${API_URL}?key=${API_KEY}&pageToken=${pageToken}&pageSize=100`);
  const jsonExists = await fileOrfolderExists(path.resolve(fileName));
  if (!jsonExists) {
    console.log('Writing', page);
    await fs.writeFile(fileName, rawdata.body);
  }
  const nextPageToken = JSON.parse(rawdata.body).nextPageToken;
  if (nextPageToken) {
    page++;
    getModelLists(nextPageToken);
  }
};

getModelLists();