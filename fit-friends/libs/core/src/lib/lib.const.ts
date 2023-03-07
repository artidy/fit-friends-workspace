enum EnvValidationMessage {
  DBHostNotRequired = 'MongoDB host is not required',
  DBNameNotRequired = 'Database name is not required',
  DBPortNotRequired = 'MongoDB port is not required',
  DBUserNotRequired = 'MongoDB user is not required',
  DBPasswordNotRequired = 'MongoDB password is not required',
  DBBaseAuthNotRequired = 'MongoDB authentication base is not required',
  JWTSecretNotRequired = 'JWT secret is not required',
  PgAdminEmailNotRequired = 'PG admin email is not required',
  PgAdminServerModeNotRequired = 'PG admin server mode is not required',
  URLServiceNotRequired = 'URL service is not required',
}

enum MongoOptionFields {
  Name = 'name',
  Host = 'host',
  Port = 'port',
  User = 'user',
  Password = 'password',
  AuthBase = 'authBase'
}

enum Port {
  Min = 0,
  Max = 65535
}

enum TitleLength {
  Min = 1,
  Max = 15,
}

enum DescriptionLength {
  Min = 10,
  Max = 140,
}

enum PriceLength {
  Min = 100,
  Max = 5000,
}

enum CaloriesLength {
  Min = 1000,
  Max = 5000,
}

enum DtoValidationMessage {
  IncorrectLength = 'Некорректная длина текста',
  ArrayIsNotContains = 'Недопустимое значение',
  TooLowNumber = 'Значение должно быть больше',
  TooHighNumber = 'Значение должно быть меньше',
  IsNotInteger = 'Значение должно быть целым числом',
  IsEmpty = 'Поле должно быть заполнено',
}

const MONGO_CONFIG_TOKEN = 'mongodb';
const DEFAULT_PORT = 3333;
const DEFAULT_MONGO_PORT = '27017';
const GLOBAL_PREFIX = 'api';

export {
  EnvValidationMessage,
  MongoOptionFields,
  Port,
  TitleLength,
  DtoValidationMessage,
  DescriptionLength,
  PriceLength,
  CaloriesLength,
  MONGO_CONFIG_TOKEN,
  DEFAULT_PORT,
  DEFAULT_MONGO_PORT,
  GLOBAL_PREFIX,
}
