enum EnvValidationMessage {
  DBHostNotRequired = 'MongoDB host is not required',
  DBNameNotRequired = 'Database name is not required',
  DBPortNotRequired = 'MongoDB port is not required',
  DBUserNotRequired = 'MongoDB user is not required',
  DBPasswordNotRequired = 'MongoDB password is not required',
  DBBaseAuthNotRequired = 'MongoDB authentication base is not required',
  JWTSecretNotRequired = 'JWT secret is not required',
  JWTSecretExpTimeNotRequired = 'JWT secret exp time is not required',
  JWTRefreshSecretNotRequired = 'JWT refresh secret is not required',
  JWTRefreshSecretExpTimeNotRequired = 'JWT refresh secret exp time is not required',
  PgAdminEmailNotRequired = 'PG admin email is not required',
  PgAdminServerModeNotRequired = 'PG admin server mode is not required',
  URLServiceNotRequired = 'URL service is not required',
  ServerInvalid = 'Host smtp server is invalid',
  ServerPortInvalid = 'Server port is invalid',
  EmailIncorrect = 'Email incorrect',
  UserIncorrect = 'User incorrect',
  PasswordIncorrect = 'Password incorrect',
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
  RabbitUserRequired = 'Rabbit user incorrect',
  RabbitPasswordRequired = 'Rabbit password incorrect',
  RabbitHostRequired = 'Rabbit host incorrect',
  RabbitQueueRequired = 'Rabbit queue incorrect',
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

enum PasswordLength {
  Min = 6,
  Max = 12,
}

enum CountLength {
  Min = 1,
  Max = 50,
}

enum DtoValidationMessage {
  IncorrectLength = 'Некорректная длина текста',
  ArrayIsNotContains = 'Недопустимое значение',
  TooLowNumber = 'Значение должно быть больше',
  TooHighNumber = 'Значение должно быть меньше',
  IsNotInteger = 'Значение должно быть целым числом',
  IsEmpty = 'Поле должно быть заполнено',
  IncorrectEmail = 'Неверный формат электронной почты',
  IsNotDate = 'Неверный формат даты',
  IsNotMongoId = 'Неверный формат идентификатора'
}

enum EntityType {
  MealDiary = 'Дневник питания',
  TrainingDiary = 'Дневник тренировок',
  Gym = 'Зал',
  Friend = 'Друг',
  UserProfile = 'Профиль пользователя',
  CoachProfile = 'Профиль тренера',
  Subscriber = 'Подписчик',
  Avatar = 'аватар'
}

enum UrlPaths {
  Auth = 'auth',
  Users = 'users',
  Verify = 'jwt/verify',
  Login = 'login',
  Register = 'register',
  Refresh = 'refresh',
  Logout = 'logout',
  QuestionnaireCoach = 'coach-profile',
  QuestionnaireUser = 'user-profile',
  Trainings = 'trainings',
  Avatars = 'avatars'
}

enum AvatarSettings {
  Directory = '/img/avatars',
  FieldName = 'avatar',
  MaxSize = 500000,
}

const AVATAR_TYPES = /(jpg|jpeg|png)$/;
const ASSETS_DIRECTORY = 'assets';
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
  PasswordLength,
  CountLength,
  EntityType,
  UrlPaths,
  AvatarSettings,
  AVATAR_TYPES,
  ASSETS_DIRECTORY,
  MONGO_CONFIG_TOKEN,
  DEFAULT_PORT,
  DEFAULT_MONGO_PORT,
  GLOBAL_PREFIX,
}
