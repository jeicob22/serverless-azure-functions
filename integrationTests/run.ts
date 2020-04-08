import { join } from "path";
import { OfflineTest } from "./tests/offlineTest";
import { getDirectories } from "./src/utils";
import { DeployTest } from "./tests/deployTest";
import { Clover } from "clvr";

const runAll = false;

const allConfigurations = getDirectories("configurations").map((configDir) =>
  join(__dirname, "configurations", configDir)
);

const configurations = (runAll) ? allConfigurations : [ "configurations/python36" ];

Clover.runSuite([
  OfflineTest,
  // DeployTest,
], configurations);
