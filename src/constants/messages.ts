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

  // -------- Department --------
  DEPARTMENT_CREATED_SUCCESS = "Department created successfully",
  DEPARTMENT_FETCH_SUCCESS = "Departments fetched successfully",
  DEPARTMENT_UPDATED_SUCCESS = "Department updated successfully",
  DEPARTMENT_DELETED_SUCCESS = "Department deleted successfully",
  DEPARTMENT_NOT_FOUND = "Department not found",
  DEPARTMENT_ALREADY_EXISTS = "Department with this name already exists in the organization",

  // -------- Class --------
  CLASS_CREATED_SUCCESS = "Class created successfully",
  CLASS_FETCH_SUCCESS = "Classes fetched successfully",
  CLASS_UPDATED_SUCCESS = "Class updated successfully",
  CLASS_DELETED_SUCCESS = "Class deleted successfully",
  CLASS_NOT_FOUND = "Class not found",
  CLASS_ALREADY_EXISTS = "Class with this name already exists in the organization",

  // -------- Section --------
  SECTION_CREATED_SUCCESS = "Section created successfully",
  SECTION_FETCH_SUCCESS = "Sections fetched successfully",
  SECTION_UPDATED_SUCCESS = "Section updated successfully",
  SECTION_DELETED_SUCCESS = "Section deleted successfully",
  SECTION_NOT_FOUND = "Section not found",
  SECTION_ALREADY_EXISTS = "Section with this name already exists in the organization",

  // -------- Subject --------
  SUBJECT_CREATED_SUCCESS = "Subject created successfully",
  SUBJECT_FETCH_SUCCESS = "Subjects fetched successfully",
  SUBJECT_UPDATED_SUCCESS = "Subject updated successfully",
  SUBJECT_DELETED_SUCCESS = "Subject deleted successfully",
  SUBJECT_NOT_FOUND = "Subject not found",
  SUBJECT_ALREADY_EXISTS = "Subject with this name or code already exists in the organization and department",

  // -------- Assignment --------
  ASSIGNMENT_CREATED_SUCCESS = "Assignment created successfully",
  ASSIGNMENT_FETCH_SUCCESS = "Assignments fetched successfully",
  ASSIGNMENT_UPDATED_SUCCESS = "Assignment updated successfully",
  ASSIGNMENT_DELETED_SUCCESS = "Assignment deleted successfully",
  ASSIGNMENT_NOT_FOUND = "Assignment not found",
  ASSIGNMENT_ALREADY_EXISTS = "Assignment already exists for one or more selected sections.",
  LOGOUT_SUCCESS = "You have been logged out successfully.",
}

export enum LogMessages {
  HANDLE_REQUEST_ERROR = "handleRequest error:",
}
