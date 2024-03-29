function ReviewComponent(): JSX.Element {
  return (
    <div className="review">
      <div className="review__user-info">
        <div className="review__user-photo">
          <picture>
            <source
              type="image/webp"
              srcSet="" />
            <img
              src=""
              srcSet=""
              width="64"
              height="64"
              alt="Изображение пользователя"
            />
          </picture>
        </div>
        <span className="review__user-name">Никита</span>
        <div className="review__rating">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <span>5</span>
        </div>
      </div>
      <p className="review__comment">
        Эта тренировка для меня зарядка по&nbsp;утрам, помогает
        проснуться.
      </p>
    </div>
  )
}

export default ReviewComponent;
