import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';

import { withErrorHandler } from './errors/middleware';
import { registerServices } from './ioc';

const container = new Container();

registerServices(container);

const server = new InversifyExpressServer(container);

server
  .setConfig((app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '1mb' }));
    app.use(cors.default());
    app.use(helmet.default());
  })
  .setErrorConfig((app) => {
    app.use(withErrorHandler(container));
  });

const app = server.build();

export { app, container };
