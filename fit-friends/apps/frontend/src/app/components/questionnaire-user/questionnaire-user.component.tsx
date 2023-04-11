import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getQuestionnaire } from '../../store/questionnaire-data/selectors';
import { createQuestionnaireUser, } from '../../store/questionnaire-data/api-actions';
import { DURATIONS, TRAINING_LEVELS, TRAINING_TYPES } from '../../const';
import CustomToggleRadioComponent from '../custom-toggle-radio/custom-toggle-radio.component';
import BtnCheckboxComponent from '../btn-checkbox/btn-checkbox.component';

function QuestionnaireUserComponent(): JSX.Element {
  const questionnaire = useAppSelector(getQuestionnaire);
  const dispatch = useAppDispatch();
  const [level, setLevel] = useState<string>(questionnaire.level);
  const [duration, setDuration] = useState<string>(questionnaire.duration ?? '');
  const [loseCalories, setLoseCalories] = useState<number>(questionnaire.loseCalories ?? 0);
  const [loseCaloriesPerDay, setLoseCaloriesPerDay] = useState<number>(questionnaire.loseCaloriesPerDay ?? 0);
  const [isReady, setReady] = useState<boolean>(questionnaire.isReady ?? false);
  const [types, setTypes] = useState<string[]>(questionnaire.types);

  const onSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (questionnaire.id) {
      return;
    }

    const data = {
      id: '',
      duration,
      level,
      loseCalories,
      types,
      loseCaloriesPerDay,
      isReady,
      userId: questionnaire.userId
    }

    dispatch(createQuestionnaireUser(data));
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

  const changeDurationHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setDuration(evt.target.value);
  };

  const changeReadyHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setReady(evt.target.checked);
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

  const durationsBlock = DURATIONS.map((value) => {
    return <CustomToggleRadioComponent
      key={value}
      name="time"
      value={value}
      checked={value === duration}
      onChangeHandler={changeDurationHandler}
    />
  })

  return (
    <div className="popup-form popup-form--questionnaire-user">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form method="post" action="#" onSubmit={onSubmitHandler}>
              <div className="questionnaire-user">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-user__wrapper">
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                    <div className="specialization-checkbox questionnaire-user__specializations">
                      {checkboxesBlock}
                    </div>
                  </div>
                  <div className="questionnaire-user__block">
                    <span className="questionnaire-user__legend">
                      Сколько времени вы готовы уделять на тренировку в день
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {durationsBlock}
                    </div>
                  </div>
                  <div className="questionnaire-user__block"><span
                    className="questionnaire-user__legend">Ваш уровень</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {levelsBlock}
                    </div>
                  </div>
                  <div className="questionnaire-user__block">
                    <div className="questionnaire-user__calories-lose">
                      <span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                            <span className="custom-input__wrapper">
                              <input
                                type="number"
                                name="calories-lose"
                                value={loseCalories}
                                onChange={(evt) => setLoseCalories(+evt.target.value)}
                                required
                              />
                              <span className="custom-input__text">ккал</span>
                            </span>
                        </label>
                      </div>
                    </div>
                    <div className="questionnaire-user__calories-waste">
                      <span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                            <span className="custom-input__wrapper">
                              <input
                                type="number"
                                name="calories-waste"
                                value={loseCaloriesPerDay}
                                onChange={(evt) => setLoseCaloriesPerDay(+evt.target.value)}
                                required
                              />
                              <span className="custom-input__text">ккал</span>
                            </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireUserComponent;
