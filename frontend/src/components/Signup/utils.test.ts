import { validateSignUp } from './utils';

describe('validateSignUp function', () => {
  it('should return an error message if email is empty', () => {
    const result = validateSignUp('', 'ValidPassword123!');
    expect(result).toBe('Please fill in all fields');
  });

  it('should return an error message if password is empty', () => {
    const result = validateSignUp('test@example.com', '');
    expect(result).toBe('Please fill in all fields');
  });

  it('should return an error message if email is invalid', () => {
    const result = validateSignUp('invalid-email', 'ValidPassword123!');
    expect(result).toBe('Please enter a valid email address');
  });

  it('should return an error message if password is not strong enough', () => {
    const result = validateSignUp('test@example.com', 'WeakPassword');
    expect(result).toBe(
      'Password is not strong enough. It should contain at least one special character, one number, one uppercase letter and one lowercase letter.',
    );
  });

  it('should return null if both email and password are valid', () => {
    const result = validateSignUp('test@example.com', 'StrongPassword123!');
    expect(result).toBeNull();
  });
});
