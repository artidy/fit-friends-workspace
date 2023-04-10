import { memo, MouseEvent, MutableRefObject, useRef } from 'react';

type CustomSelectComponentProps = {
  title: string;
  currentItem: string;
  items: string[];
  setCurrentItem: Function;
}

function CustomSelectComponent({title, items, currentItem, setCurrentItem}: CustomSelectComponentProps): JSX.Element {
  const customSelect: MutableRefObject<HTMLDivElement|null> = useRef(null);

  const handleSelect = () => {
    customSelect.current?.classList.toggle('is-open');
    document.body.classList.toggle('scroll-lock');
  };

  const handleChooseOption = (evt: MouseEvent<HTMLUListElement>) => {
    const option = evt.target as HTMLElement;

    if(!option.classList.contains('custom-select__item')) {
      return;
    }

    const value = option.getAttribute('data-value') ?? '';

    setCurrentItem(value);

    if (value) {
      customSelect.current?.classList.remove('custom-select--not-selected');
      customSelect.current?.classList.add('not-empty');

      return;
    }

    customSelect.current?.classList.add('custom-select--not-selected');
    customSelect.current?.classList.remove('not-empty');
  };

  const itemsBlock = items.map((value) => {
    return (
      <li key={value} className="custom-select__item" data-value={value}>{value}</li>
    )
  })

  return (
    <div ref={customSelect} className="custom-select custom-select--not-selected" onClick={handleSelect}>
      <span className="custom-select__label">{title}</span>
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
        <span className="custom-select__text">{currentItem}</span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox" onClick={handleChooseOption}>
        {itemsBlock}
      </ul>
    </div>
  )
}

export default memo(CustomSelectComponent);
