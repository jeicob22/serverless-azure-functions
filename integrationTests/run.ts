import { Clover } from "clvr";
import { getDirectories } from "./tests/utils";
import { offlineTest } from "./tests/offlineTest";
import { defaultParameters } from "./parameters/default";

const runAll = false;

const allConfigurations = getDirectories("configurations");

const configurations = (runAll) ? allConfigurations : [ "configurations/python36" ];

Clover.run([
  {
    name: "Offline Test",
    validations: offlineTest,
    parameters: defaultParameters,
    directories: configurations,
  }
])
