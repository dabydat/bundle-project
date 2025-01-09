import * as dotenv from 'dotenv';
import * as Joi from 'joi';

dotenv.config();

export const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  JWT_SECRET: Joi.string().required(),

  DB_HOST_DEFAULT: Joi.string().required(),
  DB_PORT_DEFAULT: Joi.number().default(5432),
  DB_USERNAME_DEFAULT: Joi.string().required(),
  DB_PASSWORD_DEFAULT: Joi.string().required(),
  DB_NAME_DATABASE_DEFAULT: Joi.string().required(),
}).unknown();

const { error, value: envVars } = envValidationSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

// Exportar la configuración validada
export const envVarsConfig = {
  app: {
    port: envVars.PORT as number,
  },
  default_database: {
    host: envVars.DB_HOST_DEFAULT,
    port: envVars.DB_PORT_DEFAULT as number,
    username: envVars.DB_USERNAME_DEFAULT,
    password: envVars.DB_PASSWORD_DEFAULT,
    database: envVars.DB_NAME_DATABASE_DEFAULT,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
  },
};
