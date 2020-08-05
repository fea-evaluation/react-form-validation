const { join } = require("path");
const fs = require("fs");
const fx = require("mkdir-recursive");
const mustache = require("mustache");

function typescriptModelsGenrator(path, apiInfo, models) {
  fx.mkdirSync(path);
  const template = loadTemplate();
  models.forEach((model) => typescriptModelGenrator(path, apiInfo, model, template));
}

function typescriptModelGenrator(path, apiInfo, model, template) {
  const view = model;
  view.apiInfo = apiInfo;

  saveFile(path, template, view);
}

function loadTemplate() {
  const path = join(__dirname, "./templates/typescript-model.template.mst");
  return fs.readFileSync(path, "utf8");
}

function saveFile(path, template, view) {
  const fileContent = mustache.render(template, view);
  const fileName = join(path, `${view.fileName}.ts`);

  fs.writeFileSync(fileName, fileContent);
}

module.exports = {
  typescriptModelsGenrator,
};
