import { useNavigate } from "react-router-dom";

function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="role-page">
      <div className="role-page__hero">
        <h1 className="role-page__title">Volunteer Registration System</h1>
        <p className="role-page__subtitle">
          Join our mission to make a difference. Register as a volunteer or
          manage the program as an admin.
        </p>
      </div>

      <div className="role-page__grid">
        <div className="card role-card card--hover">
          <div className="role-card__icon">A</div>
          <h2>Admin</h2>
          <p className="role-card__desc">
            Approve volunteers, assign tasks, and generate reports.
          </p>

          <button
            className="btn btn--primary"
            onClick={() => navigate("/admin-register")}
          >
            Register
          </button>

          <button
            className="btn btn--outline"
            onClick={() => navigate("/admin-login")}
          >
            Login
          </button>
        </div>

        <div className="card role-card card--hover">
          <div className="role-card__icon">V</div>
          <h2>Volunteer</h2>
          <p className="role-card__desc">
            Sign up, get approved, and complete assigned community tasks.
          </p>

          <button
            className="btn btn--primary"
            onClick={() => navigate("/volunteer-register")}
          >
            Register
          </button>

          <button
            className="btn btn--outline"
            onClick={() => navigate("/volunteer-login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;
