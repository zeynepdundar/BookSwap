// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Gender = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "OTHER": "OTHER"
};

const { User } = initSchema(schema);

export {
  User,
  Gender
};