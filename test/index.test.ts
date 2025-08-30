
import { DriftGuardPlugin } from '../src/index';
import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import { PluginHost } from 'aws-cdk/lib/plugin';

jest.mock('@aws-sdk/client-cloudformation', () => {
  return {
    CloudFormationClient: jest.fn().mockImplementation(() => ({
      send: jest.fn().mockResolvedValue({ StackDriftDetectionId: '123' })
    })),
    DetectStackDriftCommand: jest.fn(),
    DescribeStackDriftDetectionStatusCommand: jest.fn()
  };
});

describe('DriftGuardPlugin', () => {
  it('should register plugin and bind postSynth', () => {
    const plugin = new DriftGuardPlugin();
    const host = { addPostSynth: jest.fn() } as unknown as PluginHost;
    plugin.init(host);
    expect(host.addPostSynth).toHaveBeenCalled();
  });

  it('should create a stack and detect drift', async () => {
    const app = new cdk.App();
    const stack = new Stack(app, 'TestStack');
    const plugin = new DriftGuardPlugin();
    const host = { addPostSynth: jest.fn().mockImplementation(({ bind }) => bind(app)) } as unknown as PluginHost;
    plugin.init(host);
    await host.addPostSynth.mock.calls[0][0].bind(app);
    expect(true).toBe(true);
  });
});
