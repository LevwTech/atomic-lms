import { ZodType, z } from 'zod';
import { validationSchemas } from '../middlewares/validationMiddleware';

export type DTOBodyType<T extends validationSchemas<any, any, any>> =
  T['body'] extends ZodType<any, any, any> ? z.infer<T['body']> : never;

export type DTOQueryType<T extends validationSchemas<any, any, any>> =
  T['query'] extends ZodType<any, any, any> ? z.infer<T['query']> : never;

export type DTOParamsType<T extends validationSchemas<any, any, any>> =
  T['params'] extends ZodType<any, any, any> ? z.infer<T['params']> : never;

export type DTOType<T extends validationSchemas<any, any, any>> = {
  body: DTOBodyType<T>;
  query: DTOQueryType<T>;
  params: DTOParamsType<T>;
};
