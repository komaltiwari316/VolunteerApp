import { Link } from "react-router-dom";

function AuthLayout({ title, subtitle, children, footerLink }) {
  return (
    <div className="auth-page">
      <div className="auth-page__panel auth-page__panel--brand">
        <div className="auth-brand">
          <span className="auth-brand__logo">NP</span>
          <h1 className="auth-brand__title">NayePankh Foundation</h1>
          <p className="auth-brand__tagline">
            Volunteer Registration &amp; Management System
          </p>
          <ul className="auth-brand__features">
            <li>Register as a volunteer</li>
            <li>Get approved by admin</li>
            <li>Receive &amp; complete tasks</li>
          </ul>
        </div>
      </div>

      <div className="auth-page__panel auth-page__panel--form">
        <div className="auth-box card">
          <h2>{title}</h2>
          {subtitle && <p className="auth-box__subtitle">{subtitle}</p>}
          {children}
          {footerLink && (
            <p className="auth-box__footer">
              {footerLink.text}{" "}
              <Link to={footerLink.to}>{footerLink.label}</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
