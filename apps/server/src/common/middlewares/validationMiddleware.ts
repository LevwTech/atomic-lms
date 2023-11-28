import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export type validationSchemas<T, U, V> = {
  body?: ZodType<T, any, any>;
  query?: ZodType<U, any, any>;
  params?: ZodType<V, any, any>;
};

export type ValidatedRequest<T extends validationSchemas<any, any, any>> =
  Request<
    T['params'] extends ZodType<infer Params, any, any> ? Params : {},
    any,
    T['body'] extends ZodType<infer Body, any, any> ? Body : {},
    T['query'] extends ZodType<infer Query, any, any> ? Query : {}
  >;

export default function validationMiddleware<
  T extends validationSchemas<any, any, any>,
>(schemas: T) {
  return (req: ValidatedRequest<T>, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      if (schemas.params) req.params = schemas.params.parse(req.params);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ message: 'Validation error', errors: error.errors });
      } else {
        next(error);
      }
    }
  };
}
