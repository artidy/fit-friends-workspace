import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvValidationMessage, Port } from '@fit-friends/core';

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.ServerInvalid
  })
  public SMTP_SERVER: string;

  @IsNumber({}, {
    message: EnvValidationMessage.ServerPortInvalid
  })
  @Min(Port.Min)
  @Max(Port.Max)
  public SMTP_SERVER_PORT: number;

  @IsString({
    message: EnvValidationMessage.EmailIncorrect
  })
  public ADMIN_EMAIL: string;

  @IsString({
    message: EnvValidationMessage.UserIncorrect
  })
  public EMAIL_USER: string;

  @IsString({
    message: EnvValidationMessage.PasswordIncorrect
  })

  public EMAIL_PASSWORD: string;
  @IsString({
    message: EnvValidationMessage.DBNameRequired
  })
  public MONGO_DB: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired
  })
  public MONGO_HOST: string;

  @IsNumber({}, {
    message: EnvValidationMessage.DBPortRequired
  })
  @Min(Port.Min)
  @Max(Port.Max)
  public MONGO_PORT: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired
  })
  public MONGO_USER: string;

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired
  })
  public MONGO_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired
  })
  public MONGO_AUTH_BASE: string;

  @IsString({
    message: EnvValidationMessage.RabbitUserRequired
  })
  public RABBIT_USER: string;

  @IsString({
    message: EnvValidationMessage.RabbitPasswordRequired
  })
  public RABBIT_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.RabbitHostRequired
  })
  public RABBIT_HOST: string;

  @IsString({
    message: EnvValidationMessage.RabbitQueueRequired
  })
  public RABBIT_NOTIFY_SERVICE_QUEUE: string;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(
    EnvironmentsConfig,
    config,
    { enableImplicitConversion: true  },
  );

  const errors = validateSync(
    environmentsConfig, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
