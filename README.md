# CDK Drift Guard

AWS CDK plugin to detect drift in CloudFormation stacks before deployment.

---

## Overview

CDK Drift Guard is an **open-source AWS CDK plugin** that automatically detects drift in your CloudFormation stacks. Drift occurs when the actual resources in your AWS environment differ from the resources defined in your CDK code. This plugin helps you:

- **Identify drift** before deployment  
- Maintain **infrastructure consistency**  
- Avoid **accidental overwrites** or broken deployments  
- Integrate easily with **CI/CD workflows**  

It works by using the AWS SDK to detect stack drift and logs warnings for any mismatches. A demo CDK app is included to test the plugin locally.  

---

## Features

- Detects drift for **all CDK stacks** in your app  
- Fully compatible with **TypeScript CDK projects**  
- Includes **unit tests** for plugin validation  
- Easy **npm installation** and **plugin registration**  
- Can be integrated with **GitHub Actions** for automated CI/CD  
- Demo app included for **quick testing**

---

## Installation

Install globally using npm:

```bash
npm install -g cdk-drift-guard
