function Result({ student }) {
  return (
    <section className="panel">
      <h3>Student Status</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rank</th>
              <th>Preferences</th>
              <th>Status</th>
              <th>Allocated Branch</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{student?.name || "-"}</td>
              <td>{student?.rank || "-"}</td>
              <td>
                {student?.preferences?.length
                  ? student.preferences.join(", ")
                  : "-"}
              </td>
              <td>{student?.status || "Draft"}</td>
              <td>
                {student?.allocated &&
                student.allocated !== "Not Allocated" ? (
                  <span className="result-pill success">
                    Allocated {"\u{1F389}"} {student.allocated}
                  </span>
                ) : student?.allocated === "Not Allocated" ? (
                  <span className="result-pill waiting">Not Allocated</span>
                ) : (
                  <span className="result-pill waiting">Waiting...</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Result;
