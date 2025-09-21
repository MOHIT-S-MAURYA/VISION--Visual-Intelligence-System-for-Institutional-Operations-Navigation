// Placeholder API functions for VISION frontend

export const userAPI = {
  login: async (credentials) => {
    // Placeholder login function
    console.log("Login attempt:", credentials);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: "1",
              name: "Test User",
              email: credentials.email,
              role: "Teacher",
              permissions: ["view_attendance", "mark_attendance"],
            },
            token: "fake-jwt-token-" + Date.now(),
          },
        });
      }, 1000);
    });
  },

  logout: async () => {
    // Placeholder logout function
    console.log("Logout");
    return Promise.resolve();
  },

  register: async (userData) => {
    // Placeholder register function
    console.log("Register attempt:", userData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: "1",
              name: userData.name,
              email: userData.email,
              role: "Student",
              permissions: ["view_attendance"],
            },
            token: "fake-jwt-token-" + Date.now(),
          },
        });
      }, 1000);
    });
  },

  verifyToken: async (token) => {
    // Placeholder token verification
    console.log("Verify token:", token);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: "1",
              name: "Test User",
              email: "test@example.com",
              role: "Teacher",
              permissions: ["view_attendance", "mark_attendance"],
            },
          },
        });
      }, 500);
    });
  },
};

export default userAPI;
