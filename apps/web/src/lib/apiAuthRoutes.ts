import Env from "./env";

export const BASE_URL = Env.BACKEND_URL;
export const API_URL = BASE_URL + "/api";
export const LOGIN_URL = API_URL + "/auth/login";
export const CLUBS = API_URL + "/clubs";
export const CLUBS_BY_USER = API_URL + "/clubs_by_user";
export const CHATS_URL = API_URL + "/chats";