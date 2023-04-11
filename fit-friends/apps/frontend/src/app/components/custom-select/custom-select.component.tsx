import { memo, MouseEvent, MutableRefObject, useEffect, useRef } from 'react';

type CustomSelectComponentProps = {
  title: string;
  currentItem: string;
  className?: string;
  items: string[];
  setCurrentItem: Function;
  readonly?: boolean;
}

function CustomSelectComponent({title, items, currentItem, className = '', setCurrentItem, readonly = false}: CustomSelectComponentProps): JSX.Element {
  const customSelect: MutableRefObject<HTMLDivElement|null> = useRef(null);

  const handleSelect = () => {
    if (readonly) {
      return;
    }

    customSelect.current?.classList.toggle('is-open');
  };

  useEffect(() => {
    const currentCustomSelect = customSelect.current;

    if (!currentCustomSelect) {
      return;
    }

    currentCustomSelect.classList.remove(
      'custom-select--not-selected',
      'not-empty',
      'custom-select--readonly'
    );

    if (readonly) {
      currentCustomSelect.classList.add('custom-select--readonly');
    }

    if (currentItem) {
      currentCustomSelect.classList.add('not-empty');

      return;
    }

    currentCustomSelect.classList.add('custom-select--not-selected');
  }, [currentItem, readonly])

  const handleChooseOption = (evt: MouseEvent<HTMLUListElement>) => {
    const option = evt.target as HTMLElement;

    if(!option.classList.contains('custom-select__item')) {
      return;
    }

    const value = option.getAttribute('data-value') ?? '';

    setCurrentItem(value);
  };

  const itemsBlock = items.map((value) => {
    return (
      <li key={value} className="custom-select__item" data-value={value}>{value}</li>
    )
  })

  return (
    <div ref={customSelect} className={`custom-select ${className} custom-select--not-selected`} onClick={handleSelect}>
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
