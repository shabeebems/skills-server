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

  CREATABLE_ROLES_FETCHED = "✅ Creatable roles fetched successfully based on your role.",
  USER_CREATED_SUCCESS = "✅ New user created successfully.",
  SCHOOL_CREATED_SUCCESS = "✅ New school created successfully.",
  SCHOOL_FETCH_SUCCESS = "✅ fetch all school success",

  STATE_CREATED_SUCCESS = "✅ New state created successfully.",
  STATE_FETCH_SUCCESS = "✅ fetch all state success",

  COUNTRY_CREATED_SUCCESS = "✅ Country created successfully.",
  COUNTRY_FETCH_SUCCESS = "✅ Country fetched successfully.",

  DISTRICT_CREATED_SUCCESS = "✅ District created successfully.",
  DISTRICT_FETCH_SUCCESS = "✅ Districts fetched successfully.",

  SYSTEM_SETTING_UPDATED_SUCCESS = "✅ Value added or updated successfully.",
  SYSTEM_SETTING_FETCH_SUCCESS = "✅ Values fetched successfully.",
}

export enum LogMessages {
  HANDLE_REQUEST_ERROR = "handleRequest error:",
}
