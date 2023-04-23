import { memo, useEffect } from 'react';

import { fetchSpecial } from '../../store/trainings-data/api-actions';
import { DEFAULT_TRAINING_QUERY } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSpecial, isTrainingsLoading } from '../../store/trainings-data/selectors';
import LoaderComponent from '../loader/loader.component';
import SpecialItemComponent from './special-item.component';

type SpecialComponentProps = {
  level: string;
  types: string[];
}

function SpecialComponent({level, types}: SpecialComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const special = useAppSelector(getSpecial);
  const isLoading = useAppSelector(isTrainingsLoading);

  useEffect(() => {
    dispatch(fetchSpecial({
      ...DEFAULT_TRAINING_QUERY,
      level: level,
      limit: 9,
      types: types.toString()
    }))
  }, [level, types]);

  if (isLoading) {
    return <LoaderComponent />
  }

  const specialBlock = special.map((item) => {
    return <SpecialItemComponent id={item.id} title={item.title} preview="" />
  })

  return (
    <div className="special-for-you__wrapper">
      <div className="special-for-you__title-wrapper">
        <h2 className="special-for-you__title">Специально подобрано для вас</h2>
        <div className="special-for-you__controls">
          <button className="btn-icon special-for-you__control" type="button" aria-label="previous">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button className="btn-icon special-for-you__control" type="button" aria-label="next">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className="special-for-you__list">
        {specialBlock}
      </ul>
    </div>
  )
}

export default memo(SpecialComponent);
