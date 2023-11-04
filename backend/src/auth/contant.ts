import { env } from 'src/utils/functions';

import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConstants = {
  secret: env('ACCESS_TOKEN_SECRET'),
  expiresIn: env('ACCESS_TOKEN_EXPIRES_IN'),
};
