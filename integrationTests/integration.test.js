const { spawn } = require("child_process")
const { readdirSync } = require("fs")

// const tests = getDirectories();

const tests = [ "http-node10-linux" ]

for (const test of tests) {
  integrationTest(test);
}

function integrationTest(testName) {
  const deploy = spawn("sls", ["--version"], {
    env: process.env,
    cwd: testName
  });

  let stdout = "";
  let stderr = "";

  deploy.stderr.on("data", (data) => {
    stderr += data.toString();
  });

  deploy.stdout.on("data", (data) => {
    stdout += data.toString();
  });

  deploy.on("error", (err) => {
    stderr += `Failed to start subprocess:\n${err.message} ${err.stack}`;
  });

  deploy.on("close", (code) => {
    if (code === 0) {
      console.log(`${testName} Exited successfully with output:\n${stdout}`);
    } else {
      console.error(`${testName} failed with stderr:\n${stderr}`);
    }
  });
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


