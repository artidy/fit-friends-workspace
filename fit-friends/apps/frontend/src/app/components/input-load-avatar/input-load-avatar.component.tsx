import { memo } from 'react';

type InputLoadAvatarComponentProps = {
  readOnly: boolean;
  avatarUrl: string;
}

function InputLoadAvatarComponent({readOnly, avatarUrl}: InputLoadAvatarComponentProps): JSX.Element {
  return (
    <div className="input-load-avatar">
      <label>
        <input
          className="visually-hidden"
          type="file"
          name="user-photo-1"
          accept="image/png, image/jpeg"
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
