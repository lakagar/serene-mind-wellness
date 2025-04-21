
// Simple utility for managing login state in localStorage

export const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const logIn = (email?: string) => {
  localStorage.setItem("isLoggedIn", "true");
  if (email) {
    localStorage.setItem("userEmail", email);
  }
};

export const logOut = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
};

export const getUserEmail = () => {
  return localStorage.getItem("userEmail") || "";
};
