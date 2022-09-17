import { provide } from 'inversify-binding-decorators';

export const postRepositoryKey = Symbol.for('PostRepositoryKey');

export interface IPostRepository {
  getPostBySlug(slug: string): Promise<void>;
}

@provide(postRepositoryKey)
export class PostRepository implements IPostRepository {
  async getPostBySlug(slug: string): Promise<void> {
    return;
  }
}
