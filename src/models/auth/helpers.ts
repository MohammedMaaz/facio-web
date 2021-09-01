import {
  authSlice,
  logout,
  LSKeys,
  selectIsLoggedIn,
  startBgRefreshLoop,
} from ".";

export const isNearToExpiry = (
  accessTokenExpiry: string,
  tolerance: number = 60000
) => {
  if (!accessTokenExpiry) return true;
  return new Date(accessTokenExpiry).getTime() - Date.now() <= tolerance;
};

export const getNextRefreshTime = (
  accessTokenExpiry: string,
  tolerance: number = 60000,
  fallback = 10 * tolerance
) => {
  if (!accessTokenExpiry) return fallback;
  return new Date(accessTokenExpiry).getTime() - Date.now() - tolerance - 1;
};

export const logoutListener = (evt: StorageEvent) => {
  //if logout key is added
  if (evt.key === LSKeys.logout && evt.oldValue === null) {
    const { store } = require("../../store");
    store.dispatch(authSlice.actions.clearRefreshToken());
    localStorage.removeItem(LSKeys.refreshToken);
    store.dispatch(logout());
  }
};

export const scheduleNextRefresh = (nextRefreshTime: number) => {
  return setTimeout(() => {
    const { store } = require("../../store");
    const state = store.getState();
    if (selectIsLoggedIn(state) !== "loggedOut") {
      store.dispatch(startBgRefreshLoop());
    }
  }, nextRefreshTime);
};
