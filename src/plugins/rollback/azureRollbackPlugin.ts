import Serverless from "serverless";
import { RollbackService } from "../../services/rollbackService";
import { AzureBasePlugin } from "../azureBasePlugin";

/**
 * Plugin for rolling back Function App Service to previous deployment
 */
export class AzureRollbackPlugin extends AzureBasePlugin {

  public constructor(serverless: Serverless, options: Serverless.Options) {
    super(serverless, options);

    this.commands = {
      rollback: {
        usage: "Rollback command",
        lifecycleEvents: [
          "rollback"
        ],
        options: {
          ...this.defaultAzureOptions,
          timestamp: {
            usage: "Timestamp of previous deployment",
            shortcut: "t",
          },
        }
      }
    }

    this.hooks = {
      "rollback:rollback": this.rollback.bind(this)
    };
  }

  private async rollback() {
    const service = new RollbackService(this.serverless, this.options);
    await service.rollback();
  }
}
