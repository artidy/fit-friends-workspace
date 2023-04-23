import { memo } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

type SpecialItemComponentProps = {
  id: number;
  title: string;
  preview: string;
}

function SpecialItemComponent({id, title, preview}: SpecialItemComponentProps): JSX.Element {
  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <source
              type="image/webp"
              srcSet={preview} />
            <img
              src={preview}
              srcSet={preview}
              width="452"
              height="191"
              alt={title}
            />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{title}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link className="btn btn--small thumbnail-preview__button" to={`${AppRoute.Trainings}/${id}`}>Подробнее</Link>
          </div>
        </div>
      </div>
    </li>
  )
}

export default memo(SpecialItemComponent);
