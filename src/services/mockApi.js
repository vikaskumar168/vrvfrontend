let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
  },
];

let roles = [
  { id: 1, name: "Admin", permissions: ["read", "write", "delete"] },
  { id: 2, name: "User", permissions: ["read"] },
];

let permissions = [
  { id: 1, name: "read", description: "Can read data" },
  { id: 2, name: "write", description: "Can write data" },
  { id: 3, name: "delete", description: "Can delete data" },
];

export const mockApi = {
  getUsers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(users), 500);
    });
  },

  addUser: async (user) => {
    return new Promise((resolve) => {
      const newUser = { ...user, id: users.length + 1 };
      users.push(newUser);
      setTimeout(() => resolve(newUser), 500);
    });
  },

  updateUser: async (id, updatedUser) => {
    return new Promise((resolve, reject) => {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        setTimeout(() => resolve(users[index]), 500);
      } else {
        setTimeout(() => reject(new Error("User not found")), 500);
      }
    });
  },

  deleteUser: async (id) => {
    return new Promise((resolve) => {
      users = users.filter((user) => user.id !== id);
      setTimeout(() => resolve(), 500);
    });
  },

  getRoles: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(roles), 500);
    });
  },

  addRole: async (role) => {
    return new Promise((resolve) => {
      const newRole = { ...role, id: roles.length + 1 };
      roles.push(newRole);
      setTimeout(() => resolve(newRole), 500);
    });
  },

  updateRole: async (id, updatedRole) => {
    return new Promise((resolve, reject) => {
      const index = roles.findIndex((role) => role.id === id);
      if (index !== -1) {
        roles[index] = { ...roles[index], ...updatedRole };
        setTimeout(() => resolve(roles[index]), 500);
      } else {
        setTimeout(() => reject(new Error("Role not found")), 500);
      }
    });
  },

  deleteRole: async (id) => {
    return new Promise((resolve) => {
      roles = roles.filter((role) => role.id !== id);
      setTimeout(() => resolve(), 500);
    });
  },

  getPermissions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(permissions), 500);
    });
  },

  addPermission: async (permission) => {
    return new Promise((resolve) => {
      const newPermission = { ...permission, id: permissions.length + 1 };
      permissions.push(newPermission);
      setTimeout(() => resolve(newPermission), 500);
    });
  },

  updatePermission: async (id, updatedPermission) => {
    return new Promise((resolve, reject) => {
      const index = permissions.findIndex((permission) => permission.id === id);
      if (index !== -1) {
        permissions[index] = { ...permissions[index], ...updatedPermission };
        setTimeout(() => resolve(permissions[index]), 500);
      } else {
        setTimeout(() => reject(new Error("Permission not found")), 500);
      }
    });
  },

  deletePermission: async (id) => {
    return new Promise((resolve) => {
      permissions = permissions.filter((permission) => permission.id !== id);
      setTimeout(() => resolve(), 500);
    });
  },
};
