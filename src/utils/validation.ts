
/**
 * Validates password strength
 */
export function validatePassword(password: string): { isValid: boolean; message: string } {
  if (!password || password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" };
  }
  
  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one number" };
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one special character" };
  }
  
  return { isValid: true, message: "Password is valid" };
}
