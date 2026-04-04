import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Controls from "../components/Admin/Controls";
import StudentList from "../components/Admin/StudentList";

function AdminDashboard({
  setCurrentUser,
  students,
  setStudents,
  branches,
  setBranches,
  defaultBranches,
}) {
  const navigate = useNavigate();
  const [branchName, setBranchName] = useState("");
  const [branchSeats, setBranchSeats] = useState("");
  const [message, setMessage] = useState("");

  const handleAddBranch = () => {
    const name = branchName.trim().toUpperCase();
    const totalSeats = Number(branchSeats);

    if (!name || !totalSeats) {
      setMessage("Enter a branch name and seat count.");
      return;
    }

    setBranches((prev) => ({
      ...prev,
      [name]: {
        total: totalSeats,
        remaining: prev[name]?.remaining ?? totalSeats,
      },
    }));

    setBranchName("");
    setBranchSeats("");
    setMessage("Branch saved successfully.");
  };

  const updateSeats = (name, value) => {
    const totalSeats = Number(value);

    if (!totalSeats && value !== "0") return;

    setBranches((prev) => {
      const current = prev[name];
      const allocatedCount = current.total - current.remaining;
      const safeRemaining = Math.max(totalSeats - allocatedCount, 0);

      return {
        ...prev,
        [name]: {
          total: totalSeats,
          remaining: safeRemaining,
        },
      };
    });
  };

  const removeBranch = (name) => {
    setBranches((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });

    setStudents((prev) =>
      prev.map((student) => {
        const updatedPreferences = (student.preferences || []).filter(
          (preference) => preference !== name,
        );
        const removedAllocatedBranch = student.allocated === name;

        let status = student.status;
        if (removedAllocatedBranch) {
          status = updatedPreferences.length ? "Locked" : "Draft";
        }

        return {
          ...student,
          preferences: updatedPreferences,
          allocated: removedAllocatedBranch ? null : student.allocated,
          status,
        };
      }),
    );

    setMessage(`${name} removed and student preferences updated.`);
  };

  const removeStudent = (studentId) => {
    setStudents((prev) => prev.filter((student) => student.id !== studentId));
    setMessage("Student removed from the table.");
  };

  const runAllocation = () => {
    const branchState = JSON.parse(JSON.stringify(branches));

    Object.keys(branchState).forEach((branch) => {
      branchState[branch].remaining = branchState[branch].total;
    });

    const sortedStudents = [...students]
      .map((student) => ({
        ...student,
        allocated: null,
        status: student.preferences?.length ? "Locked" : student.status,
      }))
      .sort((a, b) => Number(a.rank || Infinity) - Number(b.rank || Infinity));

    const allocatedStudents = sortedStudents.map((student) => {
      if (!student.preferences?.length || !student.rank) {
        return {
          ...student,
          allocated: "Not Allocated",
          status: "Allocated",
        };
      }

      let allocatedBranch = "Not Allocated";

      for (const preference of student.preferences) {
        if (branchState[preference] && branchState[preference].remaining > 0) {
          allocatedBranch = preference;
          branchState[preference].remaining -= 1;
          break;
        }
      }

      return {
        ...student,
        allocated: allocatedBranch,
        status: "Allocated",
      };
    });

    setStudents(allocatedStudents);
    setBranches(branchState);
    setMessage("Allocation completed successfully.");
  };

  const resetSystem = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        allocated: null,
        status: student.preferences?.length ? "Locked" : "Draft",
      })),
    );

    const resetBranches = Object.fromEntries(
      Object.entries(branches).map(([name, info]) => [
        name,
        { ...info, remaining: info.total },
      ]),
    );

    setBranches(
      Object.keys(resetBranches).length ? resetBranches : defaultBranches,
    );
    setMessage("System reset completed.");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <span className="badge">Admin Dashboard</span>
          <h2>Seat Allocation Control Panel</h2>
          <p>Manage branches, run allocation, and review all student submissions.</p>
        </div>
        <button type="button" className="secondary-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-grid">
        <Controls
          branchName={branchName}
          branchSeats={branchSeats}
          setBranchName={setBranchName}
          setBranchSeats={setBranchSeats}
          onAddBranch={handleAddBranch}
          onRunAllocation={runAllocation}
          onResetSystem={resetSystem}
          branches={branches}
          onUpdateSeats={updateSeats}
          onRemoveBranch={removeBranch}
          message={message}
        />
      </div>

      <StudentList students={students} onRemoveStudent={removeStudent} />
    </div>
  );
}

export default AdminDashboard;
