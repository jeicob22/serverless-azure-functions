import { Configurations } from "./configurations";
import { InterpolateParameters } from "clvr";

export interface DefaultParameters extends InterpolateParameters {
  serviceName: string;
}

export interface ConfigurationParameters extends Configurations {
  [config: string]: DefaultParameters
}

export function getDefaultConfigurationParameters(): ConfigurationParameters {
  return {
    "node10-linux": {
      serviceName: "nd10-lin",
    },
    "node10-linux-external": {
      serviceName: "nd10-lin-ext",
    },
    "node10-windows": {
      serviceName: "nd10-win",
    },
    "node10-windows-webpack": {
      serviceName: "nd10-win-web",
    },
    "node12-linux": {
      serviceName: "nd12-lin",
    },
    "node12-linux-external": {
      serviceName: "nd12-lin-ext",
    },
    "node12-windows": {
      serviceName: "nd12-win",
    },
    "node12-windows-apim": {
      serviceName: "nd12-win-apim",
    },
    "node12-windows-webpack": {
      serviceName: "nd12-win-web",
    },
    "python36": {
      serviceName: "py36",
    },
    "python36-apim": {
      serviceName: "py36-apim"
    },
    "python37": {
      serviceName: "py37",
    },
    "python38": {
      serviceName: "py38",
    }
  }
}