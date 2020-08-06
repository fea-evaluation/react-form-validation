const { createPaths } = require("./utils/pathCreator");
const { configFileLoader } = require("./loaders/configFileLoader");
const { apiInfoLoader } = require("./loaders/apiInfoLoader");
const { modelsLoader } = require("./loaders/modelsLoader");
const { typescriptModelsGenrator } = require("./generators/typescript-model.generator");

const args = process.argv.slice(2);

const params = args
  .reduce((paramList, arg, i) => {
    if (i % 2 === 0) {
      return [...paramList, [arg.slice(1)]];
    } else {
      const nextParamList = [...paramList];
      nextParamList[nextParamList.length - 1] = [...nextParamList[nextParamList.length - 1], arg];
      return nextParamList;
    }
  }, [])
  .reduce((params, [param, value]) => ({ ...params, [param]: value }), {});

if (!params.c) {
  console.log(
    "Too few arguments. Specify openapi config file with -c <path>, path of models location with -ts <path> (optional) and path of yup schema location with -yup <path> (optional)."
  );
  return;
}

async function generate(params) {
  console.log("InStage client api generator");
  const paths = createPaths(params);

  console.log("Loading config file...");
  const config = await configFileLoader(paths.configFile);
  console.log("Config file loaded.");

  console.log("Loading api info...");
  const apiInfo = apiInfoLoader(config);
  console.log("Done.");

  console.log("Loading models...");
  const models = modelsLoader(config);
  console.log(`Loaded ${models.length} models.`);

  if (paths.models) {
    console.log("Generating typescript model files...");
    typescriptModelsGenrator(paths.models, apiInfo, models);
    console.log(`Generated ${models.length} typescript model files.`);
  }
}

generate(params);
