import { useEffect, useState } from "react";

const NEWS_API =
  "https://content.guardianapis.com/search?section=education&q=admission%20counselling%20registration&order-by=newest&page-size=4&api-key=test";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getNotifications() {
      try {
        const response = await fetch(NEWS_API);

        if (!response.ok) {
          throw new Error("Failed to fetch news.");
        }

        const data = await response.json();
        const items = data.response?.results || [];

        const updates =
          items.map((item, index) => ({
            id: index,
            title: item.webTitle || "Latest update",
            link: item.webUrl || "#",
            source: "The Guardian",
          }));

        setNotifications(updates);
        setError("");
      } catch {
        setError("Unable to load notifications right now.");
      }
      setLoading(false);
    }

    getNotifications();
  }, []);

  return (
    <div className="page-shell">
      <section className="info-hero notifications-hero">
        <span className="section-kicker">Notifications</span>
        <h1>Latest updates</h1>
        <p>Education, admission, and counselling-related updates shown using a simple fetch API call.</p>
      </section>

      <section className="info-section">
        {loading ? <p className="muted-text">Loading updates...</p> : null}
        {error ? <p className="muted-text">{error}</p> : null}

        <div className="notifications-grid">
          {notifications.map((item) => (
            <article key={item.id} className="notification-card">
              <span className="notification-badge">{item.source}</span>
              <h3>{item.title}</h3>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="notification-link"
              >
                Read full update
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NotificationsPage;
