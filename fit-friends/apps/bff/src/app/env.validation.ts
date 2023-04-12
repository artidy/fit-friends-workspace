import { IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvValidationMessage } from '@fit-friends/core';

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.URLServiceNotRequired
  })
  public USERS_URL: string;

  @IsString({
    message: EnvValidationMessage.URLServiceNotRequired
  })
  public GYM_URL: string;
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
