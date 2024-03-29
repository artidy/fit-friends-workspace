function AccountUserComponent(): JSX.Element {
  return (
    <div className="personal-account-user">
      <div className="personal-account-user__schedule">
        <form action="#" method="get">
          <div className="personal-account-user__form">
            <div className="personal-account-user__input">
              <label><span className="personal-account-user__label">План на день, ккал</span>
                <input type="text" name="schedule-for-the-day" value="3 300" />
              </label>
            </div>
            <div className="personal-account-user__input">
              <label><span className="personal-account-user__label">План на неделю, ккал</span>
                <input type="text" name="schedule-for-the-week" value="23 100" />
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="personal-account-user__info"><a className="thumbnail-link thumbnail-link--theme-dark" href="#">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-dark">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-ranking"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Дневник тренировок</span></a><a
        className="thumbnail-link thumbnail-link--theme-dark" href="#">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-dark">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-book"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Дневник питания</span></a>
        <section className="my-progress personal-account-user__my-progress">
          <div className="my-progress__sidebar">
            <svg className="my-progress__icon" width="46" height="51" aria-hidden="true">
              <use xlinkHref="#icon-chart-filled"></use>
            </svg>
            <ul className="my-progress__list">
              <li className="my-progress__item"><span>поступило, Ккал</span></li>
              <li className="my-progress__item"><span>ушло,<br /> Ккал</span></li>
              <li className="my-progress__item"><span>Итого за&nbsp;день, Ккал</span></li>
            </ul>
          </div>
          <div className="my-progress__content">
            <div className="my-progress__title-wrapper">
              <h2 className="my-progress__title">Мой прогресс</h2>
              <div className="my-progress__controls">
                <button className="btn-icon btn-icon--outlined my-progress__control" type="button"
                        aria-label="previous">
                  <svg width="11" height="8" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                </button>
                <button className="btn-icon btn-icon--outlined my-progress__control" type="button" aria-label="next">
                  <svg width="11" height="8" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>
            <table className="my-progress__table">
              <tr className="my-progress__row my-progress__row--head">
                <th className="my-progress__cell my-progress__cell--head">пн</th>
                <th className="my-progress__cell my-progress__cell--head">вт</th>
                <th className="my-progress__cell my-progress__cell--head">ср</th>
                <th className="my-progress__cell my-progress__cell--head">чт</th>
                <th className="my-progress__cell my-progress__cell--head">пт</th>
                <th className="my-progress__cell my-progress__cell--head">сб</th>
                <th className="my-progress__cell my-progress__cell--head">вс</th>
              </tr>
              <tr className="my-progress__row">
                <td className="my-progress__cell">3000</td>
                <td className="my-progress__cell">1000</td>
                <td className="my-progress__cell">3000</td>
                <td className="my-progress__cell">1000</td>
                <td className="my-progress__cell">3000</td>
                <td className="my-progress__cell">1000</td>
                <td className="my-progress__cell">3000</td>
              </tr>
              <tr className="my-progress__row">
                <td className="my-progress__cell">2000</td>
                <td className="my-progress__cell">4500</td>
                <td className="my-progress__cell">2000</td>
                <td className="my-progress__cell">4500</td>
                <td className="my-progress__cell">2000</td>
                <td className="my-progress__cell">4500</td>
                <td className="my-progress__cell">2000</td>
              </tr>
              <tr className="my-progress__row">
                <td className="my-progress__cell my-progress__cell--red">1000</td>
                <td className="my-progress__cell my-progress__cell--green">3500</td>
                <td className="my-progress__cell my-progress__cell--red">1000</td>
                <td className="my-progress__cell my-progress__cell--green">3500</td>
                <td className="my-progress__cell my-progress__cell--red">1000</td>
                <td className="my-progress__cell my-progress__cell--green">3500</td>
                <td className="my-progress__cell my-progress__cell--red">1000</td>
              </tr>
            </table>
          </div>
        </section>
        <div className="personal-account-user__diagram"></div>
      </div>
      <div className="personal-account-user__additional-info"><a className="thumbnail-link thumbnail-link--theme-light"
                                                                 href="#">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-friends"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои друзья</span></a><a
        className="thumbnail-link thumbnail-link--theme-light" href="#">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-weight"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои залы</span></a><a
        className="thumbnail-link thumbnail-link--theme-light personal-account-user__shop" href="#">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="#icon-shopping-cart"></use>
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои покупки</span></a>
        <div className="personal-account-user__calendar"></div>
      </div>
    </div>
  )
}

export default AccountUserComponent;
