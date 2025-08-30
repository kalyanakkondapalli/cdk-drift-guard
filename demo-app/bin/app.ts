#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';

class DemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new cdk.aws_s3.Bucket(this, 'DemoBucket', { versioned: true });
  }
}

const app = new cdk.App();
new DemoStack(app, 'DemoStack');
