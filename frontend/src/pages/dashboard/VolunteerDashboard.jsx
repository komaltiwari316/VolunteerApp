import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardHeader from "../../components/DashboardHeader";

function StatusBadge({ status }) {
  const normalized = (status || "assigned").toLowerCase();
  return <span className={`badge badge--${normalized}`}>{status}</span>;
}

const VOLUNTEER_VIEWS = {
  tasks: "tasks",
  pending: "pending",
  completed: "completed",
};

function VolunteerDashboard() {
  const [activeView, setActiveView] = useState(VOLUNTEER_VIEWS.tasks);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/tasks/mytasks", {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (id) => {
    const token = localStorage.getItem("token");
    await API.put(
      `/tasks/complete/${id}`,
      {},
      { headers: { Authorization: token } }
    );
    fetchTasks();
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status !== "completed").length;

  const filteredTasks = tasks.filter((task) => {
    if (activeView === VOLUNTEER_VIEWS.pending) {
      return task.status !== "completed";
    }
    if (activeView === VOLUNTEER_VIEWS.completed) {
      return task.status === "completed";
    }
    return true;
  });

  const navItems = [
    { id: VOLUNTEER_VIEWS.tasks, label: "All Tasks" },
    { id: VOLUNTEER_VIEWS.pending, label: "Pending Tasks" },
    { id: VOLUNTEER_VIEWS.completed, label: "Completed Tasks" },
  ];

  const sectionTitle =
    activeView === VOLUNTEER_VIEWS.pending
      ? "Pending Tasks"
      : activeView === VOLUNTEER_VIEWS.completed
        ? "Completed Tasks"
        : "All Tasks";

  return (
    <div className="volunteer-page">
      <DashboardHeader
        title="Volunteer Dashboard"
        subtitle="View and complete your assigned tasks"
        navItems={navItems}
        activeNav={activeView}
        onNavChange={setActiveView}
        onBrandClick={() => setActiveView(VOLUNTEER_VIEWS.tasks)}
      />

      <div className="dashboard-body">
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-card__value">{tasks.length}</p>
            <p className="stat-card__label">Total Tasks</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__value">{pendingCount}</p>
            <p className="stat-card__label">Pending</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__value">{completedCount}</p>
            <p className="stat-card__label">Completed</p>
          </div>
        </div>

        <section className="volunteer-page__section">
          <h2 className="volunteer-page__section-title">{sectionTitle}</h2>

          {loading ? (
            <div className="empty-state">Loading your tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              {activeView === VOLUNTEER_VIEWS.tasks
                ? "No tasks assigned yet. Check back after admin approval."
                : `No ${sectionTitle.toLowerCase()} found.`}
            </div>
          ) : (
            <div className="task-list">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${task.status === "completed" ? "task-card--completed" : ""}`}
                >
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p className="task-card__deadline">Deadline: {task.deadline}</p>
                  <StatusBadge status={task.status} />

                  {task.status !== "completed" && (
                    <button
                      className="btn btn--success"
                      onClick={() => completeTask(task.id)}
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default VolunteerDashboard;
