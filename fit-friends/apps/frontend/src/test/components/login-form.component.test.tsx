import { render, screen, fireEvent } from '@testing-library/react';

import LoginFormComponent from '../../app/components/login-form/login-form.component';

describe('LoginFormComponent', () => {
  it('should render email and password inputs', () => {
    render(<LoginFormComponent />);
    const emailInput = screen.getByLabelText('E-mail');
    const passwordInput = screen.getByLabelText('Пароль');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should prevent default form submission behavior', () => {
    const evt = { preventDefault: jest.fn() };
    render(<LoginFormComponent />);
    const submitButton = screen.getByRole('button', { name: 'Продолжить' });
    fireEvent.click(submitButton, evt);
    expect(evt.preventDefault).toHaveBeenCalled();
  });
});
