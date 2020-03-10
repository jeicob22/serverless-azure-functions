const { spawn } = require("child_process")
const { readdirSync } = require("fs");

const tests = getDirectories();

// const tests = [ "http-node10-linux" ]

for (const test of tests) {
  integrationTest(test);
}

function integrationTest(testName) {
  console.log(`Running test: ${testName}`);

  const npm = getCommand("npm");
  const link = createSpawn(
    testName,
    npm,
    ["link", "serverless-azure-functions"],
    // () => deployTest(testName),
    () => console.log("link succeeded"),
    () => console.log("link failed"));
}

function deployTest(testName) {
  const sls = getCommand("sls");
}

function createSpawn(cwd, command, args, onPass, onFail) {
  const childProcess = spawn(command, args, {
    env: process.env,
    cwd,
  });

  let stdout = "";
  let stderr = "";

  childProcess.stderr.on("data", (data) => {
    stderr += data.toString();
  });

  childProcess.stdout.on("data", (data) => {
    stdout += data.toString();
  });

  childProcess.on("error", (err) => {
    stderr += `Failed to start subprocess:\n${err.message} ${err.stack}`;
  });

  childProcess.on("close", (code) => {
    if (code === 0) {
      // console.log(`${testName} passed.\nstderr:\n${stderr}stdout:\n${stdout}`);
      onPass();
    } else {
      // console.error(`${testName} failed.\nstderr:\n${stderr}stdout:\n${stdout}`);
      onFail();
    }
  });
  return childProcess
}

function getCommand(command) {
  if (process.platform === "win32") {
    return command + ".cmd";
  }
  return command;
}

function getDirectories(source = ".") {
  return readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}
  
/*
# Create Azure resource group
sls deploy > deploy-output.txt

# TODO - make assertions on output

# Invoke created function app
sls invoke -f hello -d '{"name": "Azure"}' > invoke-output.txt

# TODO - make assertions on output

# Clean up generated resource group
sls remove > remove-output.txt

# TODO - make assertions on output
*/


