import { Link } from 'react-router-dom';

type UsersCatalogItemProps = {
  id: string;
  name: string;
  location: string;
}

function UsersCatalogItem({id, name, location}: UsersCatalogItemProps): JSX.Element {
  return (
    <div className="thumbnail-user thumbnail-user--role-user">
      <div className="thumbnail-user__image">
        <picture>
          <source
            type="image/webp"
            srcSet=""
          />
          <img
            src=""
            srcSet=""
            width="82"
            height="82"
            alt=""
          />
        </picture>
      </div>
      <div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
        <svg width="12" height="12" aria-hidden="true">
          <use xlinkHref="#icon-crown"></use>
        </svg>
      </div>
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{name}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">{location}</address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        <li className="thumbnail-user__hashtags-item">
          <div className="hashtag thumbnail-user__hashtag">
            <span>#аэробика</span>
          </div>
        </li>
      </ul>
      <Link className="btn btn--medium thumbnail-user__button" to="#">Подробнее</Link>
    </div>
  )
}

export default UsersCatalogItem;
