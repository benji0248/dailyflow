export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  } as const;
  
  export type StatusCodeKey = keyof typeof STATUS_CODES;
  export type StatusCodeValue = typeof STATUS_CODES[StatusCodeKey];