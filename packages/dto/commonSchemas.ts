// common zod schemas
import { z } from 'zod';
import { Types } from 'mongoose';

export const UUIDString = z.string().uuid();

export const ObjectIdString = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), 'Invalid id');
