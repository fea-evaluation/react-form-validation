const fs = require("fs");
const converter = require("swagger2openapi");

async function configFileLoader(configFilePath) {
  const rawdata = fs.readFileSync(configFilePath);
  const config = JSON.parse(rawdata);
  console.log(`Config file with version ${config.openapi ? config.openapi : config.swagger} found.`);

  if (config.openapi && config.openapi.startsWith("3")) {
    return config;
  }

  const converted = await convertToV3(config);

  return converted;
}

async function convertToV3(config) {
  console.log("Running converter...");
  const converted = await converter.convertObj(config, { direct: true });
  console.log("Converted.");

  return converted;
}

module.exports = {
  configFileLoader,
};
