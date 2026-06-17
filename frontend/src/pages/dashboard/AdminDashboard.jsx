import { useEffect, useState } from "react";

import API from "../../services/api";

import DashboardHeader from "../../components/DashboardHeader";



function StatusBadge({ status }) {

  const normalized = (status || "pending").toLowerCase();

  return <span className={`badge badge--${normalized}`}>{status}</span>;

}



const ADMIN_VIEWS = {

  volunteers: "volunteers",

  assignTask: "assign-task",

  report: "report",

};



function AdminDashboard() {

  const [activeView, setActiveView] = useState(ADMIN_VIEWS.volunteers);

  const [volunteers, setVolunteers] = useState([]);

  const [taskData, setTaskData] = useState({

    volunteerId: "",

    title: "",

    description: "",

    deadline: "",

  });

  const [taskMessage, setTaskMessage] = useState("");



  useEffect(() => {

    fetchVolunteers();

  }, []);



  const fetchVolunteers = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/admin/volunteers", {

        headers: { Authorization: token },

      });

      setVolunteers(res.data);

    } catch (error) {

      console.log(error);

    }

  };



  const approveVolunteer = async (id) => {

    const token = localStorage.getItem("token");

    await API.put(

      `/admin/status/${id}`,

      { status: "approved" },

      { headers: { Authorization: token } }

    );

    fetchVolunteers();

  };



  const deleteVolunteer = async (id) => {

    const token = localStorage.getItem("token");

    await API.delete(`/admin/delete/${id}`, {

      headers: { Authorization: token },

    });

    fetchVolunteers();

  };



  const assignTask = async (e) => {

    e.preventDefault();

    setTaskMessage("");



    try {

      const token = localStorage.getItem("token");

      await API.post("/tasks/assign", taskData, {

        headers: { Authorization: token },

      });

      setTaskMessage("Task assigned successfully!");

      setTaskData({ volunteerId: "", title: "", description: "", deadline: "" });

    } catch {

      setTaskMessage("Failed to assign task. Please check the volunteer ID.");

    }

  };



  const approvedCount = volunteers.filter((v) => v.status === "approved").length;

  const pendingCount = volunteers.filter((v) => v.status === "pending").length;



  const navItems = [
    { id: ADMIN_VIEWS.volunteers, label: "All Volunteers" },
    { id: ADMIN_VIEWS.assignTask, label: "Assign Task" },
    { id: ADMIN_VIEWS.report, label: "Volunteer Report" },
  ];



  return (

    <div className="admin-page">

      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Manage volunteers, tasks & reports"
        navItems={navItems}
        activeNav={activeView}
        onNavChange={setActiveView}
        onBrandClick={() => setActiveView(ADMIN_VIEWS.volunteers)}
      />



      <div className="dashboard-body">

        {activeView === ADMIN_VIEWS.volunteers && (

          <>

            <div className="stats-grid">

              <div className="stat-card">

                <p className="stat-card__value">{volunteers.length}</p>

                <p className="stat-card__label">Total Volunteers</p>

              </div>

              <div className="stat-card">

                <p className="stat-card__value">{approvedCount}</p>

                <p className="stat-card__label">Approved</p>

              </div>

              <div className="stat-card">

                <p className="stat-card__value">{pendingCount}</p>

                <p className="stat-card__label">Pending Approval</p>

              </div>

            </div>



            <section className="admin-page__section">

              <h2 className="admin-page__section-title">All Volunteers</h2>



              {volunteers.length === 0 ? (

                <div className="empty-state">No volunteers registered yet.</div>

              ) : (

                <div className="admin-volunteer-list">

                  {volunteers.map((v) => (

                    <div key={v.id} className="card card--compact admin-volunteer-card">

                      <h3>{v.name}</h3>

                      <p>{v.email}</p>

                      <p>{v.phone}</p>

                      <div className="admin-volunteer-card__meta">

                        <StatusBadge status={v.status} />

                        <span className="badge badge--default">ID: {v.id}</span>

                      </div>



                      <div className="admin-volunteer-card__actions">

                        {v.status !== "approved" && (

                          <button

                            className="btn btn--success"

                            onClick={() => approveVolunteer(v.id)}

                          >

                            Approve

                          </button>

                        )}

                        <button

                          className="btn btn--danger"

                          onClick={() => deleteVolunteer(v.id)}

                        >

                          Delete

                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </section>

          </>

        )}



        {activeView === ADMIN_VIEWS.assignTask && (

          <section className="admin-page__section admin-page__panel">

            <h2 className="admin-page__section-title">Assign Task</h2>



            {taskMessage && (

              <div

                className={`alert ${taskMessage.includes("success") ? "alert--success" : "alert--error"}`}

              >

                {taskMessage}

              </div>

            )}



            <form className="admin-task-form" onSubmit={assignTask}>

              <input

                className="form-field"

                placeholder="Volunteer ID"

                required

                value={taskData.volunteerId}

                onChange={(e) =>

                  setTaskData({ ...taskData, volunteerId: e.target.value })

                }

              />

              <input

                className="form-field"

                placeholder="Task Title"

                required

                value={taskData.title}

                onChange={(e) =>

                  setTaskData({ ...taskData, title: e.target.value })

                }

              />

              <input

                className="form-field"

                placeholder="Description"

                required

                value={taskData.description}

                onChange={(e) =>

                  setTaskData({ ...taskData, description: e.target.value })

                }

              />

              <input

                className="form-field"

                type="date"

                placeholder="Deadline"

                required

                value={taskData.deadline}

                onChange={(e) =>

                  setTaskData({ ...taskData, deadline: e.target.value })

                }

              />

              <button className="btn btn--primary" type="submit">

                Assign Task

              </button>

            </form>

          </section>

        )}



        {activeView === ADMIN_VIEWS.report && (

          <section className="admin-page__section admin-page__panel">

            <h2 className="admin-page__section-title">Volunteer Report</h2>



            <div className="report-section">

              {volunteers.length === 0 ? (

                <div className="empty-state">No volunteer data to report yet.</div>

              ) : (

                <table className="report-table">

                  <thead>

                    <tr>

                      <th>ID</th>

                      <th>Name</th>

                      <th>Email</th>

                      <th>Skills</th>

                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    {volunteers.map((v) => (

                      <tr key={v.id}>

                        <td>{v.id}</td>

                        <td>{v.name}</td>

                        <td>{v.email}</td>

                        <td>{v.skills || "—"}</td>

                        <td>

                          <StatusBadge status={v.status} />

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              )}

            </div>

          </section>

        )}

      </div>

    </div>

  );

}



export default AdminDashboard;

