import 'reflect-metadata';
import { agent as request } from 'supertest';
import { Container } from 'inversify';
import { mock, MockProxy } from 'jest-mock-extended';
import { app, container } from '../server';
import { IPostService, postServiceKey } from '../services/post-service';
import { ErrorCodes, ErrorDescriptions } from '../errors/error-codes';
import { AppError } from '../errors/app-error';

export function mockIntoContainer<T>(ctx: Container, sym: symbol | string): MockProxy<T> {
  const mockedInstance: MockProxy<T> = mock<T>();
  ctx.rebind<T>(sym).toConstantValue(mockedInstance);
  return mockedInstance;
}

describe('LtiSessionController', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  describe('Get lti session', () => {
    it('responds with 200 when found', async () => {
      const postServiceMock = mockIntoContainer<IPostService>(container, postServiceKey);

      const response = await request(app).get(`/v1/posts`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({ data: [] });
    });

    it('responds with 404 when not found', async () => {
      const postServiceMock = mockIntoContainer<IPostService>(container, postServiceKey);
      postServiceMock.getPostBySlug.mockRejectedValue(
        new AppError(ErrorCodes.PostNotFoundError, ErrorDescriptions.PostNotFoundError),
      );

      const response = await request(app).get(`/v1/posts/not-found-post`);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual({
        error: {
          errorCode: ErrorCodes.PostNotFoundError,
          description: ErrorDescriptions.PostNotFoundError,
        },
      });
    });
  });
});
