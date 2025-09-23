const AUTH_ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  REFRESH_TOKEN: "/auth/refresh-token",
  VERIFY_OTP: "/auth/verify-otp",
  LOGOUT: "/auth/logout",
};

const CARD_ENDPOINTS = {
  CREATE: '/card',
  GET_BY_ID: (id) => `/card/${id}`,
  UPDATE_BY_ID: (id) => `/card/${id}`,
  DELETE_BY_ID: (id) => `/card/${id}`,
  GET_USER_CARDS: "/card/mycards",
};

export { CARD_ENDPOINTS, AUTH_ENDPOINTS };
