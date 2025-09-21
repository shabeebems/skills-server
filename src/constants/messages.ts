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

  // -------- Country --------
  COUNTRY_CREATED_SUCCESS = "Country created successfully",
  COUNTRY_FETCH_SUCCESS = "Countries fetched successfully",
  COUNTRY_UPDATED_SUCCESS = "Country updated successfully",
  COUNTRY_DELETED_SUCCESS = "Country deleted successfully",
  COUNTRY_NOT_FOUND = "Country not found",

  // -------- State --------
  STATE_CREATED_SUCCESS = "State created successfully",
  STATE_FETCH_SUCCESS = "States fetched successfully",
  STATE_UPDATED_SUCCESS = "State updated successfully",
  STATE_DELETED_SUCCESS = "State deleted successfully",
  STATE_NOT_FOUND = "State not found",

  // -------- District --------
  DISTRICT_CREATED_SUCCESS = "District created successfully",
  DISTRICT_FETCH_SUCCESS = "Districts fetched successfully",
  DISTRICT_UPDATED_SUCCESS = "District updated successfully",
  DISTRICT_DELETED_SUCCESS = "District deleted successfully",

  SYSTEM_SETTING_UPDATED_SUCCESS = "✅ Value added or updated successfully.",
  SYSTEM_SETTING_FETCH_SUCCESS = "✅ Values fetched successfully.",

  ORGANIZATION_CREATED_SUCCESS = "Organization created successfully.",
  ORGANIZATION_FETCH_SUCCESS = "Organizations fetched successfully.",
  ORGANIZATION_FETCH_SINGLE_SUCCESS = "Organization fetched successfully.",
  ORGANIZATION_UPDATED_SUCCESS = "Organization updated successfully.",
  ORGANIZATION_DELETED_SUCCESS = "Organization deleted successfully.",
  ORGANIZATION_NOT_FOUND = "Organization not found.",
  ORGANIZATION_STATUS_UPDATED = "Organization status updated successfully.",
  ADMIN_EMAIL_ALREADY_EXISTS = "Admin email already exists.",
  MOBILE_NUMBER_ALREADY_EXISTS = "Mobile number already exists.",
}

export enum LogMessages {
  HANDLE_REQUEST_ERROR = "handleRequest error:",
}
