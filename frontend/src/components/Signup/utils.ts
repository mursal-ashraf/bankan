export const validateSignUp = (email: string, password: string) => {
  if (!email || !password) return 'Please fill in all fields';

  // regex to check whether password is strong enough
  // contains special character, number, uppercase letter and numbers
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

  // regex to check if email is valid
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  if (!passwordRegex.test(password))
    return 'Password is not strong enough. It should contain at least one special character, one number, one uppercase letter and one lowercase letter.';

  return null;
};
