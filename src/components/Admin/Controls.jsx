function Controls({
  branchName,
  branchSeats,
  setBranchName,
  setBranchSeats,
  onAddBranch,
  onRunAllocation,
  onResetSystem,
  branches,
  onUpdateSeats,
  onRemoveBranch,
  message,
}) {
  return (
    <>
      <section className="panel">
        <h3>Manage Branches</h3>
        <div className="form-grid compact-grid">
          <label>
            Branch Name
            <input
              type="text"
              placeholder="Example: CIVIL"
              value={branchName}
              onChange={(event) => setBranchName(event.target.value)}
            />
          </label>

          <label>
            Seats
            <input
              type="number"
              placeholder="Enter seat count"
              value={branchSeats}
              onChange={(event) => setBranchSeats(event.target.value)}
            />
          </label>
        </div>

        <div className="inline-actions">
          <button type="button" className="primary-btn" onClick={onAddBranch}>
            Add / Update Branch
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={onRunAllocation}
          >
            Run Allocation
          </button>
          <button
            type="button"
            className="secondary-btn danger-btn"
            onClick={onResetSystem}
          >
            Reset System
          </button>
        </div>

        {message ? <p className="status-text">{message}</p> : null}
      </section>

      <section className="panel">
        <h3>Branch Status</h3>
        <div className="card-grid">
          {Object.entries(branches).map(([name, info]) => (
            <article className="info-card" key={name}>
              <p className="card-label">{name}</p>
              <h4>
                {info.remaining} / {info.total}
              </h4>
              <p>Remaining / total seats</p>

              <label className="field-inline">
                Update Seats
                <input
                  type="number"
                  min="0"
                  value={info.total}
                  onChange={(event) => onUpdateSeats(name, event.target.value)}
                />
              </label>

              <button
                type="button"
                className="small-btn danger-btn"
                onClick={() => onRemoveBranch(name)}
              >
                Remove Branch
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Controls;
