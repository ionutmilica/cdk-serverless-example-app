#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { SampleExpressAppStack } from '../sample-blog-app/cdk/sample-blog-app';

const app = new App();

const project = app.node.tryGetContext('Project') ?? 'demo';
const currentRegion = app.node.tryGetContext('CurrentRegion') ?? 'eu-west-1';
const currentEnv = app.node.tryGetContext('CurrentEnv') ?? 'dev';

const stackPrefix = `${project}-${currentRegion}-${currentEnv}`;

const baseStackProps = {
  project,
  currentRegion,
  currentEnv,
};

const appStack = new SampleExpressAppStack(app, `${stackPrefix}-sample-app-stack`, {
  ...baseStackProps,
});

app.synth();
