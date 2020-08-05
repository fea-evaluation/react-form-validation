const { createPaths } = require("./utils/pathCreator");
const { configFileLoader } = require("./loaders/configFileLoader");
const { apiInfoLoader } = require("./loaders/apiInfoLoader");
const { modelsLoader } = require("./loaders/modelsLoader");
const { typescriptModelsGenrator } = require("./generators/typescript-model.generator");

const args = process.argv.slice(2);
const errorMessage =
  "Too few arguments. Specify openapi config file with -c <path> and path of models location with -ts <path>.";
if (!args || !args[1] || !args[3]) {
  console.log(errorMessage);
  return;
}

async function generate() {
  console.log("InStage client api generator");
  const paths = createPaths(args[1], args[3]);

  console.log("Loading config file...");
  const config = await configFileLoader(paths.configFile);
  console.log("Config file loaded.");

  console.log("Loading api info...");
  const apiInfo = apiInfoLoader(config);
  console.log("Done.");

  console.log("Loading models...");
  const models = modelsLoader(config);
  console.log(`Loaded ${models.length} models.`);

  console.log("Generating typescript model files...");
  typescriptModelsGenrator(paths.models, apiInfo, models);
  console.log(`Generated ${models.length} typescript model files.`);
}

generate();
