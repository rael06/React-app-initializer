#!/usr/bin/env node

const fs = require("fs");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const projectDir = process.argv[2];
const projectName = process.argv[3];

async function main() {
  await mkdir(projectDir);
  await createNpmrc(projectDir);
  await createReactApp();
  await createNpmrc(`${projectDir}/${projectName}`);
  await installExtraDependencies();
  await renameCssToScssFiles();
  fixScssImports();

  process.exit(0);
}

function mkdir(path) {
  const command = `mkdir ${path}`;
  logCommand(command);
  return exec(command).catch((err) => {
    if (!err.message.includes("File exists")) {
      console.log(err.message);
      process.exit(1);
    }
  });
}

async function createReactApp() {
  const command = `cd ${projectDir} && npx create-react-app ${projectName} --template typescript`;
  logCommand(command);
  return exec(command).catch(processError);
}

async function installExtraDependencies() {
  const command = `cd ${projectDir}/${projectName} && npm install --save @types/react && npm install -g sass && npm install --save-dev sass && npm install @mui/material @mui/styles && npm install @emotion/react @emotion/styled`;
  logCommand(command);
  return exec(command).catch(processError);
}

async function renameCssToScssFiles() {
  console.log("Renaming css files to scss");

  fs.rename(
    `${projectDir}/${projectName}/src/index.css`,
    `${projectDir}/${projectName}/src/index.scss`,
    () =>
      console.log(
        `${projectDir}/${projectName}/src/index.css -> ${projectDir}/${projectName}/src/index.scss`
      )
  );
  fs.rename(
    `${projectDir}/${projectName}/src/App.css`,
    `${projectDir}/${projectName}/src/App.module.scss`,
    () =>
      console.log(
        `${projectDir}/${projectName}/src/App.css -> ${projectDir}/${projectName}/src/App.module.scss`
      )
  );
}

function fixScssImports() {
  fixIndexTsx();
  fixAppTsx();
}

function createNpmrc(path) {
  console.log("Creating .npmrc file");
  try {
    fs.writeFileSync(`${path}/.npmrc`, "registry=https://registry.npmjs.org");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

function fixIndexTsx() {
  console.log("Fixing index.tsx imports");
  try {
    let indexTsx = fs
      .readFileSync(`${projectDir}/${projectName}/src/index.tsx`, "utf8")
      .trim();

    indexTsx = indexTsx.replace(
      `import './index.css';`,
      `import './index.scss';`
    );

    fs.unlinkSync(`${projectDir}/${projectName}/src/index.tsx`);
    fs.writeFileSync(`${projectDir}/${projectName}/src/index.tsx`, indexTsx);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

function fixAppTsx() {
  console.log("Fixing App.tsx imports");
  try {
    let appTsx = fs
      .readFileSync(`${projectDir}/${projectName}/src/App.tsx`, "utf8")
      .trim();

    appTsx = appTsx.replace(
      `import './App.css';`,
      `import classes from './App.module.scss';\nimport { Button } from '@material-ui/core';`
    );
    appTsx = appTsx.replace(`className="App"`, `className={classes.App}`);
    appTsx = appTsx.replace(
      `className="App-header">`,
      `className={classes['App-header']}>\n        <Button\n          variant="outlined"\n          color="secondary"\n          onClick={() => alert("Clicked")}\n        >Material UI Button</Button>`
    );
    appTsx = appTsx.replace(
      `className="App-logo"`,
      `className={classes['App-logo']}`
    );
    appTsx = appTsx.replace(
      `className="App-link"`,
      `className={classes['App-link']}`
    );

    fs.unlinkSync(`${projectDir}/${projectName}/src/App.tsx`);
    fs.writeFileSync(`${projectDir}/${projectName}/src/App.tsx`, appTsx);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

function logCommand(command) {
  console.log(`Executing: ${command}`);
}

function processError(stderr) {
  console.log(stderr.message);
  process.exit(1);
}

main();
