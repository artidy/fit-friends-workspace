enum SubscriberErrorMessages {
  EmailNotValid = 'Неверный формат email',
  Exist = 'Подписчик уже существует',
  NotExist = 'Подписчик не существует'
}

enum EmailSubscriber {
  RegisteredSubject = 'Вы успешно зарегистрировались.',
  RegisteredTemplate = './add-subscriber'
}

const ENV_FILE_PATH = 'environments/.notify.env';

export {
  SubscriberErrorMessages,
  EmailSubscriber,
  ENV_FILE_PATH
}
