import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { getQuestionnaire } from '../../store/questionnaire-data/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createQuestionnaireCoach, } from '../../store/questionnaire-data/api-actions';
import { TRAINING_LEVELS, TRAINING_TYPES } from '../../const';
import CustomToggleRadioComponent from '../custom-toggle-radio/custom-toggle-radio.component';
import BtnCheckboxComponent from '../btn-checkbox/btn-checkbox.component';

function QuestionnaireCoachComponent(): JSX.Element {
  const questionnaire = useAppSelector(getQuestionnaire);
  const dispatch = useAppDispatch();
  const [level, setLevel] = useState<string>(questionnaire.level);
  const [merits, setMerits] = useState<string>(questionnaire.merits ?? '');
  const [isPersonalTraining, setPersonalTraining] = useState<boolean>(questionnaire.isPersonalTraining ?? false);
  const [types, setTypes] = useState<string[]>(questionnaire.types);

  const onSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data = {
      id: '',
      isPersonalTraining,
      level,
      merits,
      types,
      userId: questionnaire.userId
    }

    dispatch(createQuestionnaireCoach(data));
  }

  const changeTypeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const valueIndex = types.indexOf(value);

    if (valueIndex === -1) {
      setTypes([...types, value]);

      return;
    }

    setTypes([...types.slice(0, valueIndex), ...types.slice(valueIndex + 1)]);
  }

  const changeLevelHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setLevel(evt.target.value);
  };

  const changePersonalTraining = (evt: ChangeEvent<HTMLInputElement>) => {
    setPersonalTraining(evt.target.checked);
  };

  const levelsBlock = TRAINING_LEVELS.map((value) => {
    return <CustomToggleRadioComponent
      key={value}
      name="level"
      value={value}
      onChangeHandler={changeLevelHandler}
      checked={value === level}
    />
  });

  const checkboxesBlock = TRAINING_TYPES.map((type) => {
    return <BtnCheckboxComponent
      key={type}
      value={type}
      name="specialisation"
      values={types}
      onChange={changeTypeHandler}
    />
  });

  return (
    <div className="popup-form popup-form--questionnaire-coach">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form method="post" action="#" onSubmit={onSubmitHandler}>
              <div className="questionnaire-coach">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-coach__wrapper">
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">Ваша специализация (тип) тренировок</span>
                    <div className="specialization-checkbox questionnaire-coach__specializations">
                      {checkboxesBlock}
                    </div>
                  </div>
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">Ваш уровень</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                      {levelsBlock}
                    </div>
                  </div>
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
                    <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                      <label>
                        <span className="drag-and-drop__label" tabIndex={0}>
                          Загрузите сюда файлы формата PDF, JPG или PNG
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                        <input type="file" name="import" tabIndex={-1} accept=".pdf, .jpg, .png" />
                      </label>
                    </div>
                  </div>
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">
                      Расскажите о своём опыте, который мы сможем проверить
                    </span>
                    <div className="custom-textarea questionnaire-coach__textarea">
                      <label>
                        <textarea
                          name="description"
                          placeholder=""
                          value={merits}
                          onChange={(evt) => setMerits(evt.target.value)}
                        >
                        </textarea>
                      </label>
                    </div>
                    <div className="questionnaire-coach__checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value="individual-training"
                          name="individual-training"
                          onChange={changePersonalTraining}
                          checked={isPersonalTraining}
                        />
                        <span className="questionnaire-coach__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="questionnaire-coach__checkbox-label">
                          Хочу дополнительно индивидуально тренировать
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <button className="btn questionnaire-coach__button" type="submit">Продолжить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireCoachComponent;
