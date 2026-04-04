import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AboutPage from "./pages/AboutPage";
import NotificationsPage from "./pages/NotificationsPage";
import counsellingLogo from "./assets/counselling-logo.svg";

const DEFAULT_BRANCHES = {
  CSE: { total: 2, remaining: 2 },
  IT: { total: 3, remaining: 3 },
  ECE: { total: 3, remaining: 3 },
  ME: { total: 2, remaining: 2 },
};

const STORAGE_KEYS = {
  users: "smart-counselling-users",
  students: "smart-counselling-students",
  branches: "smart-counselling-branches",
};

const readStorage = (key, fallbackValue) => {
  const savedValue = localStorage.getItem(key);

  if (!savedValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(savedValue);
  } catch {
    return fallbackValue;
  }
};

function AppLayout() {
  const [users, setUsers] = useState(() =>
    readStorage(STORAGE_KEYS.users, []),
  );
  const [students, setStudents] = useState(() =>
    readStorage(STORAGE_KEYS.students, []),
  );
  const [branches, setBranches] = useState(() =>
    readStorage(STORAGE_KEYS.branches, DEFAULT_BRANCHES),
  );
  const [currentUser, setCurrentUser] = useState(null);
  const isStudent = currentUser?.role === "student";
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.students, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.branches, JSON.stringify(branches));
  }, [branches]);

  const dashboardLink =
    isAdmin ? "/admin" : isStudent ? "/student" : "/";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/notifications", label: "Notifications" },
    { to: "/about", label: "About Us" },
  ];

  const homeStats = [
    { label: "Registered Students", value: students.length },
    {
      label: "Active Branches",
      value: Object.keys(branches).length,
    },
    {
      label: "Locked Preferences",
      value: students.filter((student) => student.status === "Locked").length,
    },
    {
      label: "Allocated Results",
      value: students.filter(
        (student) =>
          student.allocated && student.allocated !== "Not Allocated",
      ).length,
    },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="brand-block">
            <img
              src={counsellingLogo}
              alt="Rank2Campus"
              className="brand-logo"
            />
            <div>
              <strong>Rank2Campus</strong>
              <span>Admission counselling and seat allotment portal</span>
            </div>
          </Link>

          <nav className="main-nav">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className="nav-link">
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="topbar-side">
            <Link to={dashboardLink} className="profile-button profile-link-button">
              <span className="profile-avatar" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="profile-icon"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 14C7.58172 14 4 17.134 4 21H20C20 17.134 16.4183 14 12 14Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="content-shell">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                users={users}
                setUsers={setUsers}
                students={students}
                setStudents={setStudents}
                setCurrentUser={setCurrentUser}
                stats={homeStats}
              />
            }
          />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/student"
            element={
              isStudent ? (
                <StudentDashboard
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  students={students}
                  setStudents={setStudents}
                  branches={branches}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin"
            element={
              isAdmin ? (
                <AdminDashboard
                  setCurrentUser={setCurrentUser}
                  students={students}
                  setStudents={setStudents}
                  branches={branches}
                  setBranches={setBranches}
                  defaultBranches={DEFAULT_BRANCHES}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="footer-shell">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img
                src={counsellingLogo}
                alt="Rank2Campus"
                className="brand-logo footer-mark"
              />
              <div>
                <strong>Rank2Campus</strong>
                <span>
                  A unified portal for student registration, preference locking,
                  and transparent seat allocation.
                </span>
              </div>
            </div>
          </div>

          <div className="footer-links">
            <h4>Student Services</h4>
            <div className="footer-link-list">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
              <Link to={dashboardLink}>Dashboard</Link>
            </div>
          </div>

          <div className="footer-info">
            <h4>Contact</h4>
            <p>Admissions Cell, City Campus, New Delhi 110001</p>
            <p>support@rank2campus.edu.in</p>
            <p>+91 1800 123 4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>(c) 2026 Rank2Campus. All rights reserved.</span>
          <span>Privacy Policy</span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
