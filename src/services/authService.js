// This is a mock authentication service. In a real application, you would use proper authentication mechanisms.

let currentUser = null;

const users = [
  { id: 1, username: "admin", password: "shiva", role: "admin" },
  { id: 2, username: "user", password: "shiva", role: "user" },
];

export const authService = {
  login: (username, password) => {
    console.log(username, password);
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      currentUser = user;
      return Promise.resolve(user);
    }
    return Promise.reject("Invalid username or password");
  },
  logout: () => {
    currentUser = null;
    return Promise.resolve();
  },
  getCurrentUser: () => {
    return currentUser;
  },
  isAdmin: () => {
    return currentUser && currentUser.role === "admin";
  },
};
