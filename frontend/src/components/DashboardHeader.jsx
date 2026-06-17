import { useNavigate } from "react-router-dom";

function DashboardHeader({ title, subtitle, navItems, activeNav, onNavChange, onBrandClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header className="dashboard-header">
      <div
        className={`dashboard-header__brand ${onBrandClick ? "dashboard-header__brand--clickable" : ""}`}
        onClick={onBrandClick}
        onKeyDown={onBrandClick ? (e) => e.key === "Enter" && onBrandClick() : undefined}
        role={onBrandClick ? "button" : undefined}
        tabIndex={onBrandClick ? 0 : undefined}
      >
        <span className="dashboard-header__logo">NP</span>
        <div>
          <p className="dashboard-header__org">NayePankh Foundation</p>
          <h1 className="dashboard-header__title">{title}</h1>
          {subtitle && <p className="dashboard-header__subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="dashboard-header__actions">
        {navItems && navItems.length > 0 && (
          <nav className="dashboard-header__nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`dashboard-header__nav-btn ${
                  activeNav === item.id ? "dashboard-header__nav-btn--active" : ""
                }`}
                onClick={() => onNavChange(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        <button className="btn btn--outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
