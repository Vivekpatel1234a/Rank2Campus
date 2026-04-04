import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialStudentForm = {
  id: "",
  password: "",
};

const initialAdminForm = {
  username: "",
  password: "",
};

function Login({
  users,
  setUsers,
  students,
  setStudents,
  setCurrentUser,
  stats,
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("student");
  const [studentForm, setStudentForm] = useState(initialStudentForm);
  const [adminForm, setAdminForm] = useState(initialAdminForm);
  const [error, setError] = useState("");

  const handleChange = (event, setForm) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  const handleStudentLogin = (event) => {
    event.preventDefault();
    setError("");

    const id = studentForm.id.trim();
    const password = studentForm.password.trim();

    if (!id || !password) {
      setError("Please enter student ID and password.");
      return;
    }

    const existingUser = users.find((user) => user.id === id);

    if (existingUser && existingUser.password !== password) {
      setError("Incorrect password for this student ID.");
      return;
    }

    if (!existingUser) {
      setUsers((prev) => [...prev, { id, password, role: "student" }]);
    }

    if (!students.some((student) => student.id === id)) {
      const newStudent = {
        id,
        name: "",
        rank: "",
        preferences: [],
        status: "Draft",
        allocated: null,
      };

      setStudents((prev) => [
        ...prev,
        newStudent,
      ]);
    }

    setCurrentUser({ id, role: "student" });
    setStudentForm(initialStudentForm);
    navigate("/student");
  };

  const handleAdminLogin = (event) => {
    event.preventDefault();
    setError("");

    if (
      adminForm.username === "admin" &&
      adminForm.password === "admin123"
    ) {
      setCurrentUser({ id: "admin", role: "admin" });
      setAdminForm(initialAdminForm);
      navigate("/admin");
      return;
    }

    setError("Use admin / admin123 for admin login.");
  };

  return (
    <div className="page-shell home-shell">
      <section className="home-top-grid">
        <div className="home-hero-card">
          <span className="section-kicker">Home</span>
          <h1>Smart Counselling Portal</h1>
          <p>Branch prediction, preference locking, and seat allocation in one simple system.</p>

          <div className="mini-dashboard-grid">
            {stats.map((item) => (
              <article key={item.label} className="mini-stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="auth-card">
          <div className="hero-strip compact-strip">
            <span className="badge">Portal Access</span>
            <h2>Login</h2>
            <p>Choose your role and continue.</p>
          </div>

          <div className="tab-row">
            <button
              type="button"
              className={activeTab === "student" ? "tab active" : "tab"}
              onClick={() => changeTab("student")}
            >
              Student
            </button>
            <button
              type="button"
              className={activeTab === "admin" ? "tab active" : "tab"}
              onClick={() => changeTab("admin")}
            >
              Admin
            </button>
          </div>

          {activeTab === "student" ? (
            <form className="form-grid" onSubmit={handleStudentLogin} autoComplete="off">
              <label>
                Student ID
                <input
                  type="text"
                  name="id"
                  placeholder="Enter ID"
                  value={studentForm.id}
                  autoComplete="off"
                  onChange={(event) => handleChange(event, setStudentForm)}
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={studentForm.password}
                  autoComplete="new-password"
                  onChange={(event) => handleChange(event, setStudentForm)}
                />
              </label>

              <button type="submit" className="primary-btn">
                Continue
              </button>
            </form>
          ) : (
            <form className="form-grid" onSubmit={handleAdminLogin} autoComplete="off">
              <label>
                Admin Username
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={adminForm.username}
                  autoComplete="off"
                  onChange={(event) => handleChange(event, setAdminForm)}
                />
              </label>

              <label>
                Admin Password
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={adminForm.password}
                  autoComplete="new-password"
                  onChange={(event) => handleChange(event, setAdminForm)}
                />
              </label>

              <button type="submit" className="primary-btn">
                Login
              </button>
            </form>
          )}

          {error ? <p className="error-text">{error}</p> : null}
        </div>
      </section>

      <section className="info-section">
        <div className="section-heading">
          <span className="section-kicker">Quick Overview</span>
          <h2>Main modules</h2>
        </div>

        <div className="feature-grid simple-grid">
          <article className="feature-card">
            <h3>Student Panel</h3>
            <p>Enter details, predict branches, set order, and track results.</p>
          </article>
          <article className="feature-card">
            <h3>Admin Panel</h3>
            <p>Manage students, update branches, and run the allocation process.</p>
          </article>
          <article className="feature-card">
            <h3>Easy Demo Flow</h3>
            <p>Clean screens and simple steps that are easy to explain in presentation.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Login;
