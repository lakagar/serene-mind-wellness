
// Simple utility for managing login state in localStorage

export const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const logIn = () => {
  localStorage.setItem("isLoggedIn", "true");
};

export const logOut = () => {
  localStorage.removeItem("isLoggedIn");
};
