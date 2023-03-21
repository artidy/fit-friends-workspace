enum EmailSubscriber {
  AddNewTraining = 'Добавлена новая тренировка.',
  AddNewTrainingTemplate = './add-new-training',
  SuccessSend = 'Рассылка успешно отправлена.'
}

const ENV_FILE_PATH = 'environments/.notify.env';

export {
  EmailSubscriber,
  ENV_FILE_PATH
}
