import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { authService } from "./services/authService";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionManagement from "./components/PermissionManagement";
import Profile from "./components/Profile";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.logout().then(() => {
      setCurrentUser(null);
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-between bg-white h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                RBAC System
              </span>
            </div>
            {currentUser && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {authService.isAdmin() ? (
                  <>
                    <NavLink
                      to="/users"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }
                inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                      }
                    >
                      Users
                    </NavLink>
                    <NavLink
                      to="/roles"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }
                inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                      }
                    >
                      Roles
                    </NavLink>
                    <NavLink
                      to="/permissions"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }
                inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                      }
                    >
                      Permissions
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }
              inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                    }
                  >
                    Profile
                  </NavLink>
                )}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
              inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`
                  }
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>

          {/* Hamburger Menu */}
          {currentUser && (
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon changes based on menu state */}
                {menuOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && currentUser && (
          <div className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {authService.isAdmin() ? (
                <>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      }
              block px-3 py-2 rounded-md text-base font-medium`
                    }
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to="/roles"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      }
              block px-3 py-2 rounded-md text-base font-medium`
                    }
                  >
                    Roles
                  </NavLink>
                  <NavLink
                    to="/permissions"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      }
              block px-3 py-2 rounded-md text-base font-medium`
                    }
                  >
                    Permissions
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }
            block px-3 py-2 rounded-md text-base font-medium`
                  }
                >
                  Profile
                </NavLink>
              )}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }
              block px-3 py-2 rounded-md text-base font-medium`
                }
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </NavLink>
            </div>
          </div>
        )}

        <main className="max-w-7xl mx-auto py-6">
          <Routes>
            <Route
              path="/"
              element={<Login setCurrentUser={setCurrentUser} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/permissions" element={<PermissionManagement />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Login({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    authService
      .login(username, password)
      .then((user) => {
        setCurrentUser(user);
        if (authService.isAdmin()) {
          navigate("/users");
        } else {
          navigate("/profile");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="w-screen  flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Login
        </h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-indigo-500 hover:underline">
            Signup
          </NavLink>
        </p>
      </div>
    </div>
  );
}

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    alert(`Signed up as: ${username}, Email: ${email}`);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center text-yellow-500">
          Signup
        </h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            onClick={handleSignup}
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/" className="text-yellow-500 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default App;
