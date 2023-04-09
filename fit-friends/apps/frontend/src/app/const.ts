enum AppRoute {
  Main = '/',
  SignUp = '/signup',
  SignIn = '/signin',
  QuestionnaireCoach = '/questionnaire-coach',
  QuestionnaireUser = '/questionnaire-user'
}

enum NameSpace {
  User = 'USER',
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
  Logout = 'logout'
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

const LOCATIONS = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
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
  LOCATIONS,
  DEFAULT_REQUEST_TIMEOUT,
  TOKEN,
  REFRESH_TOKEN,
  IMAGE_FOLDER
}
