import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

type GymsCatalogItemComponentProps = {
  id: number;
  title: string;
  location: string;
  isVerified: boolean;
  description: string;
}

function GymsCatalogItemComponent({id, title, location, isVerified, description}: GymsCatalogItemComponentProps): JSX.Element {
  return (
    <div className="thumbnail-gym">
      <div className="thumbnail-gym__image">
        <picture>
          <source type="image/webp" srcSet="" />
          <img src="" srcSet="" width="330" height="190" alt="" />
        </picture>
      </div>
      {isVerified ?
        <div className="thumbnail-gym__verified">
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-verify"></use>
          </svg>
        </div> : null
      }
      <button className="thumbnail-gym__favourite-button">
        <span className="visually-hidden">Добавить в Избранное</span>
        <svg width="14" height="13" aria-hidden="true">
          <use xlinkHref="#icon-heart"></use>
        </svg>
      </button>
      <div className="thumbnail-gym__header">
        <h4 className="thumbnail-gym__title">{title}</h4>
        <div className="thumbnail-gym__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-gym__location-address">{location}</address>
        </div>
      </div>
      <div className="thumbnail-gym__text-wrapper">
        <p className="thumbnail-gym__text">{description}</p>
      </div>
      <div className="thumbnail-gym__buttons-wrapper">
        <Link className="btn btn--small thumbnail-gym__button" to={`${AppRoute.Gyms}/${id}`}>Подробнее</Link>
      </div>
    </div>
  )
}

export default GymsCatalogItemComponent;
