import 'reflect-metadata';
import { createHandler } from 'cloud-serverless-http';

import { app } from './server';

export const handler = createHandler({ app, logLevel: 'debug' });
