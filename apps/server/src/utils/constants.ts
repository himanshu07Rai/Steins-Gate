export const USER_ROLE = {
    ADMIN: 5,
    USER: 1,
} as const;

export const HTTP_HEADER = {AUTH: 'authorization', USER_AGENT: 'User-Agent'} as const;

export const AUTH_COOKIE = 'aKookie';

export const HTTP_CODE = {
    OK: 200,
    PENDING: 201,
    ACCEPTED: 202,
    REDIRECT_PERMANENT: 301,
    REDIRECT_TEMP: 302,
    BAD_REQUEST: 400,
    NO_AUTH: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    SERVER_ERROR: 500,
    SERVICE_DOWN: 503,
  } as const;
