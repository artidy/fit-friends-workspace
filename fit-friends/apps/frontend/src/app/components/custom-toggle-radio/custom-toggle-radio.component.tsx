import { ChangeEventHandler } from 'react';

import { getFormatTitle } from '../../services/helpers';

type CustomToggleRadioComponentProps = {
  name: string;
  value: string;
  checked: boolean;
  onChangeHandler: ChangeEventHandler;
}

function CustomToggleRadioComponent({name, value, checked, onChangeHandler}: CustomToggleRadioComponentProps): JSX.Element {
  return (
    <div className="custom-toggle-radio__block">
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          onChange={onChangeHandler}
          checked={checked}
        />
        <span className="custom-toggle-radio__icon"></span>
        <span className="custom-toggle-radio__label">{getFormatTitle(value)}</span>
      </label>
    </div>
  )
}

export default CustomToggleRadioComponent;
