import { getAccessToken } from "../services/note.service";

export const showFormattedDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

export const isUserLoggedIn = () => {
  const isAuthenticated = getAccessToken();

  if (isAuthenticated) return true;

  return false;
};

export const getHomeRouteForLoggedInUser = () => {
  const isAuthenticated = isUserLoggedIn();

  if (isAuthenticated) return "/app";

  return "/login";
};
