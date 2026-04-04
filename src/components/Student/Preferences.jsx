function Preferences({
  branches,
  preferences,
  isInfoComplete,
  onSelectBranch,
  onMovePreference,
  onDeletePreference,
  onLockPreferences,
}) {
  return (
    <>
      <section className="panel">
        <h3>Select Branch Preferences</h3>
        <div className="card-grid">
          {Object.entries(branches).map(([branchName, seatInfo]) => (
            <button
              type="button"
              key={branchName}
              className={
                preferences.includes(branchName)
                  ? "branch-card selected"
                  : "branch-card"
              }
              disabled={!isInfoComplete}
              onClick={() => onSelectBranch(branchName)}
            >
              <span className="card-label">{branchName}</span>
              <strong>{seatInfo.total} total seats</strong>
              <span>{seatInfo.remaining} remaining seats</span>
            </button>
          ))}
        </div>
        {!isInfoComplete ? (
          <p className="muted-text">
            Fill name and rank first to select branch preferences.
          </p>
        ) : null}
      </section>

      <section className="panel">
        <div className="section-title">
          <h3>Preference Ordering</h3>
          <button
            type="button"
            className="primary-btn"
            onClick={onLockPreferences}
            disabled={!isInfoComplete || preferences.length === 0}
          >
            Lock Preferences
          </button>
        </div>

        {preferences.length > 0 ? (
          <div className="preference-list">
            {preferences.map((branch, index) => (
              <div className="preference-item" key={`${branch}-${index}`}>
                <div>
                  <span className="order-badge">{index + 1}</span>
                  <strong>{branch}</strong>
                </div>

                <div className="inline-actions">
                  <button
                    type="button"
                    className="small-btn"
                    onClick={() => onMovePreference(index, -1)}
                  >
                    Move Up
                  </button>
                  <button
                    type="button"
                    className="small-btn"
                    onClick={() => onMovePreference(index, 1)}
                  >
                    Move Down
                  </button>
                  <button
                    type="button"
                    className="small-btn danger-btn"
                    onClick={() => onDeletePreference(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted-text">
            Select branches from the cards to build your preference list.
          </p>
        )}
        {isInfoComplete && preferences.length === 0 ? (
          <p className="muted-text">
            Add at least one preference before locking.
          </p>
        ) : null}
      </section>
    </>
  );
}

export default Preferences;
