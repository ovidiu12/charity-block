const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

/**
 * Removes any previously compiled build
 */
function prepareCompile() {
  const buildPath = path.resolve(__dirname, "build");
  fs.removeSync(buildPath);
  return buildPath;
}

/**
 * Creates the configuration for compiling contracts
 */
function createConfig() {
  return {
    language: "Solidity",
    sources: {
      "CharityMain.sol": {
        content: fs.readFileSync(
          path.resolve(__dirname, "contracts", "CharityMain.sol"),
          "utf8"
        ),
      },
      "CharityCampaign.sol": {
        content: fs.readFileSync(
          path.resolve(__dirname, "contracts", "CharityCampaign.sol"),
          "utf8"
        ),
      },
      "CharityToken.sol": {
        content: fs.readFileSync(
          path.resolve(__dirname, "contracts", "CharityToken.sol"),
          "utf8"
        ),
      },
      "SafeMath.sol": {
        content: fs.readFileSync(
          path.resolve(__dirname, "contracts", "SafeMath.sol"),
          "utf8"
        ),
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
}

/**
 * Compiles the contracts
 */

function compile(config) {
  try {
    return JSON.parse(solc.compile(JSON.stringify(config)));
  } catch (e) {
    console.log(e);
  }
}

/**
 * Outputs to JSON files
 */

function writeOutput(compiled, buildPath) {
  fs.ensureDirSync(buildPath);
  for (let contractName in compiled.contracts) {
    for (let subContract in compiled.contracts[contractName]) {
      const name = subContract.replace(".sol", "");
      console.log("Building: ", name + ".json");
      fs.outputJsonSync(
        path.resolve(buildPath, name + ".json"),
        compiled.contracts[contractName][name]
      );
    }
  }
  console.log("Build created successfully!");
}

const buildPath = prepareCompile();
const config = createConfig();
const compiled = compile(config);

writeOutput(compiled, buildPath);
