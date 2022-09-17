import { provide } from 'inversify-binding-decorators';

export const postServiceKey = Symbol.for('PostServiceKey');

export interface IPostService {
  getPostBySlug(postId: string): Promise<void>;
}

@provide(postServiceKey)
export class PostService implements IPostService {
  getPostBySlug(postId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
