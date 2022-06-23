export const AUTH_STORAGE_KEY = 'auth_token';
export const USER_ID_STORAGE_KEY = 'user_id';

export const wrapUsingAuth = (options = {}) => {
     const headers = {
          ...options.headers,
          'Content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem(AUTH_STORAGE_KEY)}`
     }
     return {
          ...options,
          headers,
     };
}