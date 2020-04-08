import { ResultSet, Clover, CommandValidation } from "clvr";

export async function OfflineTest(configurations: string[]): Promise<ResultSet> {
  const validations: CommandValidation[] = [
    {
      command: "npm.cmd link serverless-azure-functions",
      files: {
        "hello/function.json": {
          shouldExist: true
        }
      }
    },
    {
      command: "sls.cmd offline build",
      stdout: {
        shouldContain: [
          "Building offline service",
          "Finished building offline service"
        ]
      },
      files: {
        "hello/function.json": {
          shouldExist: false
        }
      }
    },
    {
      command: "sls.cmd offline cleanup",
      stdout: {
        shouldContain: [
          "Cleaning up offline files",
          "Finished cleaning up offline files"
        ]
      },
      files: {
        "hello/function.json": {
          shouldExist: false
        }
      }
    }
  ]
  return await Clover.run(validations, configurations); 
}