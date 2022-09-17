import { Container } from 'inversify';

import './controllers/posts-controller';

import { IPostService, PostService, postServiceKey } from './services/post-service';

export function registerServices(container: Container): void {
  container.bind<IPostService>(postServiceKey).to(PostService);
}
