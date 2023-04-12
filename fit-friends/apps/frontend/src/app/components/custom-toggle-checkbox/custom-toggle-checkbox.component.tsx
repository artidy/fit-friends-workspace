import { ChangeEventHandler } from 'react';

type CustomToggleCheckboxComponentProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: ChangeEventHandler;
}

function CustomToggleCheckboxComponent({name, value, checked, onChange}: CustomToggleCheckboxComponentProps): JSX.Element {
  return (
    <div className="custom-toggle custom-toggle--checkbox">
      <label>
        <input type="checkbox" value={value} name={name} checked={checked} onChange={onChange} />
        <span className="custom-toggle__icon">
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check"></use>
          </svg>
        </span>
        <span className="custom-toggle__label">{value}</span>
      </label>
    </div>
  )
}

export default CustomToggleCheckboxComponent;
