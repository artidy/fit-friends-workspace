import { ChangeEventHandler, memo } from 'react';

type InputLoadAvatarComponentProps = {
  readOnly: boolean;
  avatarUrl: string;
  onChange: ChangeEventHandler;
}

function InputLoadAvatarComponent({readOnly, avatarUrl, onChange}: InputLoadAvatarComponentProps): JSX.Element {
  return (
    <div className="input-load-avatar">
      <label>
        <input
          className="visually-hidden"
          type="file"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={onChange}
          readOnly={readOnly}
        />
        <span className="input-load-avatar__avatar">
          <img
            src={avatarUrl}
            width="98"
            height="98"
            alt="Фото пользователя"
          />
        </span>
      </label>
    </div>
  )
}

export default memo(InputLoadAvatarComponent);
