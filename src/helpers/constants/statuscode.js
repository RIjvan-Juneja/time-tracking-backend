export const STATUS_MESSAGE = freeze({
  SUCCESS: 'success',
  CREATED: 'created',
  UPDATED: 'updated',
  DELETED: 'deleted',
  ERROR: 'error',
  NOT_FOUND: 'not found',
  UNAUTHORIZED: 'unauthorized'
})

export const STATUS_CODE = freeze({
  CREATED: 201,
  UPDATE: 200,
  DELETE: 200,
  ERROR: 500,
  NOT_FOUND: 404,
  UNAUTHORIZED : 401
})

export const ERROR_MESSAGE = freeze({
  NO_TOKEN: 'No token provided',
  INVALID_TOKEN: 'Invalid token',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  PASSWORD_NOT_MATCH: 'Password does not match',
  NOT_ENOUGH_PERMISSIONS: 'Not enough permissions to perform this action',
  WRONG_CREDENTIALS: 'Wrong credentials',
  NOT_ENOUGH_TIME: 'Not enough time to perform this action',
  NOT_ENOUGH_STORAGE: 'Not enough storage to perform this action',
})

export const ERROR_CODE = freeze({
  NO_TOKEN: 401,
  INVALID_TOKEN: 401,
  USER_NOT_FOUND: 404,
  EMAIL_ALREADY_EXISTS: 400,
  PASSWORD_NOT_MATCH: 400,
  NOT_ENOUGH_PERMISSIONS: 403,
  WRONG_CREDENTIALS: 401,
  NOT_ENOUGH_TIME: 429,
  NOT_ENOUGH_STORAGE: 413,
})

export const PERMISSIONS = freeze({
  ADMIN: 'admin',
  USER: 'user',
})

export const STORAGE_LIMITS = freeze({
  TIME_LIMIT_IN_HOURS: 24,
  STORAGE_LIMIT_IN_MB: 1000,
})


export const TASK_STATUS = freeze({
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
})
