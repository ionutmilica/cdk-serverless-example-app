import type { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  request,
  response,
} from 'inversify-express-utils';
import { IPostService, postServiceKey } from '../services/post-service';

@controller('/v1/posts')
export class PostsController extends BaseHttpController {
  constructor(@inject(postServiceKey) private postService: IPostService) {
    super();
  }

  @httpGet('/')
  async getPaginatedPosts(@request() req: Request, @response() res: Response): Promise<void> {
    res.status(200).json({ data: [] });
  }

  @httpGet('/:postSlug')
  async getPostBySlug(@request() req: Request, @response() res: Response): Promise<void> {
    await this.postService.getPostBySlug(req.params.postSlug);
    res.status(200).json({ data: {} });
  }
}
