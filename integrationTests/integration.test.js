const { spawn } = require("child_process")
const { readdirSync } = require("fs");

// const tests = getDirectories();

tests = [ "http-node10-windows" ];



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
    () => slsTest(
        testName,
        ["deploy"],
        () => slsTest(
          testName,
          ["invoke", "-f", "hello", "-d", '{"name": "Azure"}'],
          () => slsTest(
            testName,
            ["remove"],
            () => console.log(`Test ${testName} PASSED`)
          ))),
    () => console.log("link failed")
  );
}

function slsTest(testName, args, onSuccess) {
  console.log(`Running ${args.join(" ")} test for ${testName}`);
  const sls = getCommand("sls");
  const command = createSpawn(
    testName,
    sls,
    args,
    (stdout, stderr) => {
      // TODO evaluate output for command
      onSuccess();
    },
    (stdout, stderr) => {
      // TODO record error for deploy failure
    }
  )
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
    console.log(data.toString());
    stdout += data.toString();
  });

  childProcess.on("error", (err) => {
    stderr += `Failed to start subprocess:\n${err.message} ${err.stack}`;
  });

  childProcess.on("close", (code) => {
    if (code === 0) {
      // console.log(`${testName} passed.\nstderr:\n${stderr}stdout:\n${stdout}`);
      onPass(stdout, stderr);
    } else {
      // console.error(`${testName} failed.\nstderr:\n${stderr}stdout:\n${stdout}`);
      onFail(stdout, stderr);
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


