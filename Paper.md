
---
title: "CDK Drift Guard"
authors:
  - name: "Kalyana Krishna Kondapalli"
    orcid: "0009-0003-0832-259X"
    affiliation: "Independent Researcher"
---

# Summary

CDK Drift Guard is an AWS CDK plugin that detects **drift in CloudFormation stacks** before deployment.  
It warns developers when AWS resources have been modified outside the CDK, preventing accidental overwrites or inconsistencies.

# Statement of Need

Many teams manage AWS resources with CDK but lack visibility into manual changes in the cloud.  
This plugin provides early detection of drift, helping maintain reproducible infrastructure.

# Installation

Install via npm:

```bash
npm install -g cdk-drift-guard
```

# Example Usage

Add plugin in `cdk.json`:

```json
{
  "app": "npx ts-node bin/app.ts",
  "plugin": ["cdk-drift-guard"]
}
```

Run:

```bash
cdk synth
cdk deploy
```

Drift detection messages will appear in the console.

# Key Features

- Detects drift for multiple stacks  
- Supports local testing with CDK apps  
- Fully automated CI/CD with GitHub Actions  
- Demo app included for quick evaluation
