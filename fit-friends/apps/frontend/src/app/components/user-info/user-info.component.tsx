import { ChangeEvent, FormEvent, useState } from 'react';

import InputLoadAvatarComponent from '../input-load-avatar/input-load-avatar.component';
import CustomSelectComponent from '../custom-select/custom-select.component';
import { LOCATIONS, TRAINING_LEVELS, TRAINING_TYPES, UserGender, UserRole } from '../../const';
import BtnCheckboxComponent from '../btn-checkbox/btn-checkbox.component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser } from '../../store/user-data/selectors';
import { getQuestionnaire } from '../../store/questionnaire-data/selectors';
import { getUpdateFields, toggleArrayValue } from '../../services/helpers';
import { updateUser } from '../../store/user-data/api-actions';
import { updateQuestionnaireCoach } from '../../store/questionnaire-data/api-actions';

function UserInfoComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const profile = useAppSelector(getQuestionnaire);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [name, setName] = useState<string>(user?.name ?? '');
  const [merits, setMerits] = useState<string>(profile.merits ?? '');
  const [isActiveStatus, toggleActiveStatus] = useState<boolean>(profile.isPersonalTraining ?? profile.isReady ?? false);
  const [types, setTypes] = useState<string[]>(profile.types);
  const [level, setLevel] = useState<string>(profile.level);
  const [location, setLocation] = useState<string>(user?.location ?? '');
  const [gender, setGender] = useState<string>(user?.gender ?? '');

  if (!user || !profile) {
    return <div>Данные не найдены</div>
  }

  const onSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (readOnly) {
      setReadOnly(false);

      return;
    }

    let updateData = getUpdateFields(user, {
      gender,
      location,
      name,
    });

    if (updateData) {
      dispatch(updateUser(updateData))
    }

    updateData = getUpdateFields(profile, {
      isPersonalTraining: isActiveStatus,
      isReady: isActiveStatus,
      level,
      merits,
      types
    })

    if (updateData) {
      dispatch(updateQuestionnaireCoach({...updateData, userId: user.id}));
    }

    setReadOnly(true);
  }

  const onChangeTypeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setTypes(toggleArrayValue(evt.target.value, types));
  }

  const onChangeNameHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  }

  const onChangeMeritsHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setMerits(evt.target.value);
  }

  const onChangeStatusHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    toggleActiveStatus(evt.target.checked);
  }

  const trainingTypesBlock = TRAINING_TYPES.map((type) => {
    return <BtnCheckboxComponent
      key={type}
      value={type}
      name="specialisation"
      values={types}
      onChange={onChangeTypeHandler}
    />
  });

  const btnEditText = readOnly ? 'Редактировать' : 'Сохранить';
  let statusText = isActiveStatus ? 'Готов тренировать' : 'Не готов тренировать';

  if (user.role === UserRole.User) {
    statusText = isActiveStatus ? 'Готов тренироваться' : 'Не готов тренироваться';
  }

  return (
    <section className="user-info-edit">
      <div className="user-info-edit__header">
        <InputLoadAvatarComponent readOnly={readOnly} avatarUrl={user.avatar} />
        <div className="user-info-edit__controls">
          <button className="user-info-edit__control-btn" aria-label="обновить">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-change"></use>
            </svg>
          </button>
          <button className="user-info-edit__control-btn" aria-label="удалить">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-trash"></use>
            </svg>
          </button>
        </div>
      </div>
      <form className="user-info-edit__form" action="#" method="post" onSubmit={onSubmitHandler}>
        <button
          className="btn-flat btn-flat--underlined user-info-edit__save-button"
          type="submit"
          aria-label={btnEditText}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg>
          <span>{btnEditText}</span>
        </button>
        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title">Обо мне</h2>
          <div className="custom-input user-info-edit__input">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChangeNameHandler}
                  readOnly={readOnly}
                />
              </span>
            </label>
          </div>
          <div className="custom-textarea user-info-edit__textarea">
            <label>
              <span className="custom-textarea__label">Описание</span>
              <textarea
                name="description"
                value={merits}
                onChange={onChangeMeritsHandler}
                readOnly={readOnly}
              >
                {merits}
              </textarea>
            </label>
          </div>
        </div>
        <div className="user-info-edit__section user-info-edit__section--status">
          <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
            <label>
              <input
                type="checkbox"
                name="ready-for-training"
                onChange={onChangeStatusHandler}
                checked={isActiveStatus}
                readOnly={readOnly}
              />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg>
              </span>
              <span className="custom-toggle__label">{statusText}</span>
            </label>
          </div>
        </div>
        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
          <div className="specialization-checkbox user-info-edit__specialization">
            {trainingTypesBlock}
          </div>
        </div>
        <CustomSelectComponent
          className="custom-select user-info-edit__select"
          title={'Локация'}
          currentItem={location}
          items={LOCATIONS}
          setCurrentItem={setLocation}
          readonly={readOnly}
        />
        <CustomSelectComponent
          className="custom-select user-info-edit__select"
          title={'Пол'}
          currentItem={gender as string}
          items={[UserGender.Unknown, UserGender.Male, UserGender.Female]}
          setCurrentItem={setGender}
          readonly={readOnly}
        />
        <CustomSelectComponent
          className="custom-select user-info-edit__select"
          title={'Уровень'}
          currentItem={level}
          items={TRAINING_LEVELS}
          setCurrentItem={setLevel}
          readonly={readOnly}
        />
      </form>
    </section>
  )
}

export default UserInfoComponent;
