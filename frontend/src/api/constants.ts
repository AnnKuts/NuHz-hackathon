export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001/api',
  TIMEOUT: 10000,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    GOOGLE_LOGIN: '/auth/google-login',
    ME: '/auth/me',
  },
  
  CV: {
    BASE: '/cv',
    BY_USER: (userId: string) => `/cv/user/${userId}`,
    BY_ID: (cvId: string) => `/cv/${cvId}`,
  },
  
  INTERVIEW: {
    RESULTS: '/interview-results',
    BY_USER: (userId: string) => `/interview-results/user/${userId}`,
    LATEST: (userId: string) => `/interview-results/user/${userId}/latest`,
  },
  
  USER: {
    BASE: '/users',
    BY_ID: (userId: string) => `/users/${userId}`,
    STATS: (userId: string) => `/users/${userId}/stats`,
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const REQUEST_HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  APPLICATION_JSON: 'application/json',
} as const;