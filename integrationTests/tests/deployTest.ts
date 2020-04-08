import { Clover, CommandValidation, ResultSet } from "clvr";
import { getDefaultConfigurationParameters } from "../src/parameters";

export async function DeployTest(configurations: string[]): Promise<ResultSet> {
  const validations: CommandValidation[] = [
    {
      command: "npm i serverless-azure-functions@beta"
    },
    {
      command: "sls deploy",
      stdout: {
        shouldContain: [
          "Logging into Azure",
          "Deployed serverless functions:",
          "Creating resource group: sls-weur-dev-${serviceName}-rg",
          "Resource Group: sls-weur-dev-${serviceName}-rg",
          "Deploying zip file to function app: sls-weur-dev-${serviceName}",
          "-> hello: [GET] sls-weur-dev-${serviceName}.azurewebsites.net/api/hello"
        ],
      }
    },
    {
      command: "sls invoke -f hello -d '{\"name\":\"Azure\"}'",
    },
    {
      command: "sls remove --force"
    }
  ]
  return await Clover.run(validations, configurations, getDefaultConfigurationParameters());
}
