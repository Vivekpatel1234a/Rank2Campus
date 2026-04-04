function StudentList({ students, onRemoveStudent }) {
  return (
    <section className="panel">
      <h3>Student List</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rank</th>
              <th>Preferences</th>
              <th>Status</th>
              <th>Allocated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name || student.id}</td>
                  <td>{student.rank || "-"}</td>
                  <td>
                    {student.preferences?.length
                      ? student.preferences.join(", ")
                      : "-"}
                  </td>
                  <td>{student.status || "Draft"}</td>
                  <td>
                    {student.allocated &&
                    student.allocated !== "Not Allocated" ? (
                      <span className="result-pill success">
                        {student.allocated}
                      </span>
                    ) : student.allocated === "Not Allocated" ? (
                      <span className="result-pill waiting">Not Allocated</span>
                    ) : (
                      <span className="result-pill waiting">Waiting...</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small-btn danger-btn"
                      onClick={() => onRemoveStudent(student.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-row">
                  No students have logged in yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default StudentList;
