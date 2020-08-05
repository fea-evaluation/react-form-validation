const { join, relative } = require("path");

function createPaths(configFilePath, relativeModelsPath) {
  const basePath = process.cwd();

  const absoluteConfigFilePath = join(basePath, configFilePath);
  const absoluteModelsPath = join(basePath, relativeModelsPath);

  return {
    configFile: absoluteConfigFilePath,
    models: absoluteModelsPath,
  };
}

module.exports = {
  createPaths,
};
