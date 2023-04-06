enum AppRoute {
  Main = '/'
}

enum NameSpace {
  User = 'USER',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const DEFAULT_REQUEST_TIMEOUT = 5000;
const TOKEN = 'fit-friends-token';
const IMAGE_FOLDER = process.env.NX_IMAGE_URL;

export {
  AppRoute,
  NameSpace,
  AuthorizationStatus,
  DEFAULT_REQUEST_TIMEOUT,
  TOKEN,
  IMAGE_FOLDER
}
