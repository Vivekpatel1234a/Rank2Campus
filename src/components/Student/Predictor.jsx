const predictionChanceMap = {
  0: "High chance",
  1: "Medium chance",
};

function Predictor({ rank, prediction, onPredict, isInfoComplete }) {
  return (
    <section className="panel">
      <div className="section-title">
        <h3>Branch Predictor</h3>
        <button
          type="button"
          className="primary-btn"
          onClick={onPredict}
          disabled={!isInfoComplete}
        >
          Predict Branches
        </button>
      </div>

      <p className="muted-text">
        Current rank: <strong>{rank || "-"}</strong>
      </p>
      {!isInfoComplete ? (
        <p className="muted-text">Fill name and rank first to enable prediction.</p>
      ) : null}

      <div className="card-grid">
        {prediction.length > 0 ? (
          prediction.map((branch, index) => (
            <article key={branch} className="info-card accent-card">
              <p className="card-label">{predictionChanceMap[index]}</p>
              <h4>{branch}</h4>
              <p>Suggested based on your rank range.</p>
            </article>
          ))
        ) : (
          <p className="muted-text">
            Enter your rank and click prediction to view suggested branches.
          </p>
        )}
      </div>
    </section>
  );
}

export default Predictor;
