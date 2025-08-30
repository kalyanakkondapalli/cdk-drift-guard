import * as cdk from "aws-cdk-lib";
import { ICdkPlugin, PluginHost } from "aws-cdk/lib/plugin";
import {
  CloudFormationClient,
  DetectStackDriftCommand,
  DescribeStackDriftDetectionStatusCommand,
} from "@aws-sdk/client-cloudformation";

export class DriftGuardPlugin implements ICdkPlugin {
  public readonly version = "1";

  init(host: PluginHost): void {
    host.addPostSynth({
      bind: async (app: cdk.App) => {
        const stacks = app.node.children.filter(
          (c) => c instanceof cdk.Stack
        ) as cdk.Stack[];

        const cf = new CloudFormationClient({});

        for (const stack of stacks) {
          console.log(`🔍 Checking drift for stack: ${stack.stackName}`);

          try {
            const driftResponse = await cf.send(
              new DetectStackDriftCommand({
                StackName: stack.stackName,
              })
            );

            if (!driftResponse.StackDriftDetectionId) continue;

            let driftStatus = "DETECTION_IN_PROGRESS";
            while (driftStatus === "DETECTION_IN_PROGRESS") {
              const statusResp = await cf.send(
                new DescribeStackDriftDetectionStatusCommand({
                  StackDriftDetectionId: driftResponse.StackDriftDetectionId,
                })
              );

              driftStatus = statusResp.DetectionStatus || "UNKNOWN";
              if (driftStatus === "DETECTION_IN_PROGRESS") {
                await new Promise((res) => setTimeout(res, 3000));
              } else {
                console.log(
                  `✅ Drift check complete for ${stack.stackName}: ${statusResp.StackDriftStatus}`
                );
                if (statusResp.StackDriftStatus !== "IN_SYNC") {
                  console.log(
                    `🚨 Drift detected in stack "${stack.stackName}"! Review before deploying.`
                  );
                }
              }
            }
          } catch (err) {
            console.error(`❌ Drift check failed for ${stack.stackName}:`, err);
          }
        }
      },
    });
  }
}

module.exports = new DriftGuardPlugin();
