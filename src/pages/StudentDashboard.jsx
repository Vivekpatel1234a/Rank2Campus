import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Predictor from "../components/Student/Predictor";
import Preferences from "../components/Student/Preferences";
import Result from "../components/Student/Result";

function StudentDashboard({
  currentUser,
  setCurrentUser,
  students,
  setStudents,
  branches,
}) {
  const navigate = useNavigate();
  const currentStudent = students.find(
    (student) => student.id === currentUser.id,
  );

  const [name, setName] = useState(() => currentStudent?.name || "");
  const [rank, setRank] = useState(() => currentStudent?.rank || "");
  const [prediction, setPrediction] = useState([]);
  const [preferences, setPreferences] = useState(() =>
    (currentStudent?.preferences || []).filter((branchName) =>
      Object.hasOwn(branches, branchName),
    ),
  );
  const [message, setMessage] = useState("");
  const isInfoComplete = Boolean(name.trim()) && Boolean(rank);
  const hasAllocatedSeat =
    currentStudent?.allocated && currentStudent.allocated !== "Not Allocated";

  const predictBranches = (studentRank) => {
    if (studentRank <= 1000) return ["CSE", "IT"];
    if (studentRank <= 2500) return ["IT", "ECE"];
    return ["ECE", "ME"];
  };

  const handlePredict = () => {
    const numericRank = Number(rank);

    if (!numericRank) {
      setMessage("Enter a valid rank before prediction.");
      setPrediction([]);
      return;
    }

    setPrediction(predictBranches(numericRank));
    setMessage("");
  };

  const handleSelectBranch = (branchName) => {
    if (preferences.includes(branchName)) {
      setMessage("This branch is already in your preferences.");
      return;
    }

    setPreferences((prev) => [...prev, branchName]);
    setMessage("");
  };

  const movePreference = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= preferences.length) return;

    const updated = [...preferences];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setPreferences(updated);
  };

  const deletePreference = (index) => {
    setPreferences((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    setMessage("Preference removed from the list.");
  };

  const handleLockPreferences = () => {
    const trimmedName = name.trim();
    const numericRank = Number(rank);

    if (!trimmedName || !numericRank || preferences.length === 0) {
      setMessage("Add name, rank, and at least one branch preference.");
      return;
    }

    setStudents((prev) =>
      prev.map((student) =>
        student.id !== currentUser.id
          ? student
          : {
              ...student,
              name: trimmedName,
              rank: numericRank,
              preferences,
              status: hasAllocatedSeat ? "Allocated" : "Locked",
              allocated: hasAllocatedSeat ? student.allocated : null,
            },
      ),
    );

    setMessage("Preferences locked successfully.");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <span className="badge">Student Dashboard</span>
          <h2>Welcome, {currentUser.id}</h2>
          <p>Fill your details, predict branches, choose preferences, and check your result.</p>
        </div>
        <button type="button" className="secondary-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <h3>Student Info</h3>
          <div className="form-grid compact-grid">
            <label>
              Name
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                required
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label>
              Rank
              <input
                type="number"
                placeholder="Enter your rank"
                value={rank}
                required
                min="1"
                onChange={(event) => setRank(event.target.value)}
              />
            </label>
          </div>
        </section>

        <Predictor
          rank={rank}
          prediction={prediction}
          onPredict={handlePredict}
          isInfoComplete={isInfoComplete}
        />

        <Preferences
          branches={branches}
          preferences={preferences}
          isInfoComplete={isInfoComplete}
          onSelectBranch={handleSelectBranch}
          onMovePreference={movePreference}
          onDeletePreference={deletePreference}
          onLockPreferences={handleLockPreferences}
        />
      </div>

      {message ? <p className="status-text page-message">{message}</p> : null}

      <Result student={currentStudent} />
    </div>
  );
}

export default StudentDashboard;
