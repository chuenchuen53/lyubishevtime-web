const path = require("path");
const fs = require("fs");
const runCommand = require("./runCommand");

require("dotenv").config();

const apiSpecUrl = process.env.API_SPEC_URL;

const OUTPUT_DIR = "src/openapi";

const generateApiCommand = [
  "pnpm",
  [
    "openapi-generator-cli",
    "generate",
    "-i",
    apiSpecUrl,
    "-g",
    "typescript-axios",
    "-o",
    OUTPUT_DIR,
    "--additional-properties=enumPropertyNaming=UPPERCASE,withSeparateModelsAndApi=true,apiPackage=api-service,modelPackage=api-typing,withoutPrefixEnums=true",
  ],
];

const filesToRemove = [".gitignore", ".npmignore", ".openapi-generator-ignore", "git_push.sh"];

const foldersToRemove = [".openapi-generator"];

const formatCommand = ["pnpm", ["prettier", OUTPUT_DIR, "--write", "--ignore-path", "./.prettierignore"]];

function removeDirectorySync(path) {
  try {
    fs.rmSync(path, { recursive: true, force: true });
  } catch (error) {
    console.error(`Error removing the directory: ${error.message}`);
  }
}

function removeFileSync(path) {
  try {
    fs.rmSync(path, { force: true });
  } catch (error) {
    console.error(`Error removing the file: ${error.message}`);
  }
}

function main() {
  removeDirectorySync(OUTPUT_DIR);
  runCommand(generateApiCommand[0], generateApiCommand[1]);

  const rootDir = path.resolve(__dirname, "..");
  filesToRemove.forEach(file => removeFileSync(path.join(rootDir, `${OUTPUT_DIR}/${file}`)));
  foldersToRemove.forEach(folder => removeDirectorySync(path.join(rootDir, `${OUTPUT_DIR}/${folder}`)));

  runCommand(formatCommand[0], formatCommand[1]);
}

main();
