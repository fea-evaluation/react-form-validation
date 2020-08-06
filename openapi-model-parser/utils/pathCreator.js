const { join, relative } = require("path");

function createPaths({ c: configFilePath, ts: relativeModelsPath }) {
  const basePath = process.cwd();

  const absoluteConfigFilePath = join(basePath, configFilePath);
  const absoluteModelsPath = relativeModelsPath ? join(basePath, relativeModelsPath) : undefined;

  return {
    configFile: absoluteConfigFilePath,
    models: absoluteModelsPath,
  };
}

module.exports = {
  createPaths,
};
