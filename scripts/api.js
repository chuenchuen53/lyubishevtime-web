const fs = require("fs");
const runCommand = require("./runCommand");

require("dotenv").config();

const apiSpecUrl = process.env.API_SPEC_URL;

const OUTPUT_DIR = "src/api";

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

const formatCommand = ["pnpm", ["prettier", OUTPUT_DIR, "--write", "--ignore-path", "./.prettierignore"]];

function removeDirectorySync(path) {
  try {
    fs.rmSync(path, { recursive: true, force: true });
    console.log(`Deleted ${path}`);
  } catch (error) {
    console.error(`Error removing the directory: ${error.message}`);
  }
}

function main() {
  removeDirectorySync(OUTPUT_DIR);
  runCommand(generateApiCommand[0], generateApiCommand[1]);
  runCommand(formatCommand[0], formatCommand[1]);
}

main();
