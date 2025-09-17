export enum Messages {
  INTERNAL_SERVER_ERROR = "❌ Internal server error.",
  
  // Login Messages
  LOGIN_SUCCESS = "✅ Logged in successfully.",
  PASSWORD_INCORRECT = "❌ The password you entered is incorrect.",
  USER_BLOCKED = "❌ This account has been blocked. Please contact support.",
  USER_NOT_FOUND = "❌ No account found with the provided email address.",

  ACCESS_TOKEN_NOT_DEFINED = "❌ACCESS_TOKEN_SECRET is not defined in environment variables",
  REFRESH_TOKEN_NOT_DEFINED = "❌REFRESH_TOKEN_SECRET is not defined in environment variables",

  VALIDATION_FAILED = "❌ Validation failed",

}

export enum LogMessages {
  HANDLE_REQUEST_ERROR = "handleRequest error:",
};
