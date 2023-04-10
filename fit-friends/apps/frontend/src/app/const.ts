enum AppRoute {
  Main = '/',
  SignUp = '/signup',
  SignIn = '/signin',
  Questionnaire = '/questionnaire',
}

enum NameSpace {
  User = 'USER',
  Questionnaire = 'QUESTIONNAIRE',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum UserGender {
  Female = 'женский',
  Male = 'мужской',
  Unknown = 'неважно',
}

enum UserRole {
  User = 'пользователь',
  Coach = 'тренер'
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
  QuestionnaireUser = 'user-profile'
}

enum Message {
  UnknownMessage = 'Неизвестная ошибка, обратитесь к администратору',
  SuccessRegistration = 'Регистрация прошла успешно',
  SuccessAuthorization = 'Вы успешно авторизовались',
  RefreshTokenExpired = 'Время текущего сеанса истекло',
}

const USER_ROLES = [
  {
    role: UserRole.Coach,
    title: 'Я хочу тренировать'
  },
  {
    role: UserRole.User,
    title: 'Я хочу тренироваться'
  }
]

const TRAINING_TYPES = [
  'йога',
  'бег',
  'бокс',
  'стрейчинг',
  'кроссфит',
  'аэробика',
  'пилатес',
]

const LOCATIONS = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
]

const TRAINING_LEVELS = [
  'новичок',
  'любитель',
  'профессионал',
]

const DURATIONS = [
  '10-30 мин',
  '30-50 мин',
  '50-80 мин',
  'больше 80 мин'
]

const DEFAULT_REQUEST_TIMEOUT = 5000;
const TOKEN = 'fit-friends-token';
const REFRESH_TOKEN = 'fit-friends-refresh-token';
const IMAGE_FOLDER = process.env.NX_IMAGE_URL;

export {
  AppRoute,
  NameSpace,
  AuthorizationStatus,
  UserGender,
  UserRole,
  UrlPaths,
  Message,
  USER_ROLES,
  TRAINING_TYPES,
  LOCATIONS,
  TRAINING_LEVELS,
  DURATIONS,
  DEFAULT_REQUEST_TIMEOUT,
  TOKEN,
  REFRESH_TOKEN,
  IMAGE_FOLDER
}
