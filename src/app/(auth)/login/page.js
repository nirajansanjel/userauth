"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data.email, data.password);
      if (res) {
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error(err.code);
    }
  };
  return (
    <div className="register-root">
      <div className="register-card">
        {/* Left decorative panel */}
        <aside className="register-panel" aria-hidden="true">
          <div className="panel-blob panel-blob-1" />
          <div className="panel-blob panel-blob-2" />
          <div className="panel-brand">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect
                width="36"
                height="36"
                rx="10"
                fill="white"
                fillOpacity="0.15"
              />
              <circle cx="18" cy="18" r="8" stroke="white" strokeWidth="2" />
              <circle cx="18" cy="18" r="3" fill="white" />
            </svg>
            <span>Orion</span>
          </div>
          <div className="panel-copy">
            <h2>Welcome back</h2>
            <p>Sign in to pick up right where you left off.</p>
          </div>
          <ul className="panel-perks">
            {[
              "Your data is safe & encrypted",
              "99.9% uptime guarantee",
              "24/7 support",
            ].map((p) => (
              <li key={p}>
                <span className="perk-check" aria-hidden="true">
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
        </aside>

        {/* Right form panel */}
        <section className="register-form-side">
          <div className="form-header">
            <h1>Sign in to your account</h1>
            <p>
              Dont have an account?{" "}
              <a href="/register" className="link">
                Sign up
              </a>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="register-form"
          >
            {/* Email */}
            <div className={`field ${errors.email ? "field--error" : ""}`}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="field-error" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className={`field ${errors.password ? "field--error" : ""}`}>
              <div className="password-label-row">
                <label htmlFor="password">Password</label>
                <a href="/forgot-password" className="link forgot-link">
                  Forgot password?
                </a>
              </div>
              <div className="input-wrap">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  className="toggle-eye"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="field-error" role="alert">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember me */}
            <div className="field field-checkbox">
              <label className="checkbox-label">
                <input
                  id="remember"
                  type="checkbox"
                  {...register("remember")}
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Firebase error banner */}
            {firebaseError && (
              <div className="firebase-error" role="alert">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {firebaseError}
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="spinner" aria-hidden="true" />
              ) : null}
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </section>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .register-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f3ef;
          padding: 2rem 1rem;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        .register-card {
          display: flex;
          width: 100%;
          max-width: 860px;
          min-height: 520px;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 32px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06);
        }

        /* ── Left panel ── */
        .register-panel {
          flex: 0 0 320px;
          background: #1a1035;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.5rem 2rem;
        }

        .panel-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(48px);
          pointer-events: none;
        }
        .panel-blob-1 {
          width: 260px; height: 260px;
          top: -80px; right: -80px;
          background: rgba(124, 88, 235, 0.45);
        }
        .panel-blob-2 {
          width: 200px; height: 200px;
          bottom: -60px; left: -60px;
          background: rgba(56, 189, 248, 0.3);
        }

        .panel-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          position: relative;
          z-index: 1;
        }

        .panel-copy {
          position: relative;
          z-index: 1;
        }
        .panel-copy h2 {
          color: #ffffff;
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1.25;
          margin-bottom: 0.6rem;
          letter-spacing: -0.02em;
        }
        .panel-copy p {
          color: rgba(255,255,255,0.6);
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .panel-perks {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .panel-perks li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.75);
          font-size: 0.85rem;
        }
        .perk-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: rgba(124, 88, 235, 0.35);
          color: #c4b5fd;
          font-size: 11px;
          flex-shrink: 0;
        }

        /* ── Right form side ── */
        .register-form-side {
          flex: 1;
          padding: 2.75rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.75rem;
        }

        .form-header h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111;
          letter-spacing: -0.025em;
          margin-bottom: 0.35rem;
        }
        .form-header p {
          font-size: 0.875rem;
          color: #6b7280;
        }
        .link {
          color: #7c3aed;
          text-decoration: none;
          font-weight: 500;
        }
        .link:hover { text-decoration: underline; }

        /* ── Form fields ── */
        .register-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .field label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #374151;
          letter-spacing: 0.01em;
        }

        .field input[type="email"],
        .field input[type="password"],
        .field input[type="text"] {
          width: 100%;
          height: 42px;
          padding: 0 12px;
          border: 1.5px solid #e5e7eb;
          border-radius: 9px;
          font-size: 0.9rem;
          color: #111;
          background: #fafaf9;
          transition: border-color 0.15s, box-shadow 0.15s;
          outline: none;
          font-family: inherit;
        }
        .field input::placeholder { color: #9ca3af; }
        .field input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
          background: #fff;
        }
        .field--error input {
          border-color: #ef4444;
          background: #fff8f8;
        }
        .field--error input:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
        }

        /* Password label row with inline forgot link */
        .password-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .forgot-link {
          font-size: 0.775rem;
          font-weight: 500;
        }

        .input-wrap {
          position: relative;
        }
        .input-wrap input {
          padding-right: 42px;
        }
        .toggle-eye {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .toggle-eye:hover { color: #6b7280; }

        .field-error {
          font-size: 0.775rem;
          color: #dc2626;
          font-weight: 500;
        }

        /* Checkbox */
        .field-checkbox .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 0.8125rem;
          color: #4b5563;
          font-weight: 400;
          cursor: pointer;
          line-height: 1.5;
        }
        .field-checkbox input[type="checkbox"] {
          width: 16px;
          height: 16px;
          border: 1.5px solid #d1d5db;
          border-radius: 4px;
          flex-shrink: 0;
          accent-color: #7c3aed;
          margin-top: 1px;
          cursor: pointer;
        }

        /* Firebase error banner */
        .firebase-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: #fef2f2;
          border: 1.5px solid #fca5a5;
          border-radius: 9px;
          font-size: 0.8125rem;
          color: #b91c1c;
          font-weight: 500;
          line-height: 1.45;
        }

        /* Submit button */
        .btn-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 44px;
          margin-top: 0.3rem;
          background: #7c3aed;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.15s, transform 0.1s;
          font-family: inherit;
        }
        .btn-submit:hover:not(:disabled) { background: #6d28d9; }
        .btn-submit:active:not(:disabled) { transform: scale(0.98); }
        .btn-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Spinner */
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Success state */
        .success-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f0fdf4;
          border: 1.5px solid #86efac;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
        }
        .success-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #22c55e;
          color: white;
          font-size: 14px;
          flex-shrink: 0;
        }
        .success-box p {
          font-size: 0.9rem;
          color: #15803d;
          font-weight: 500;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .register-panel { display: none; }
          .register-form-side { padding: 2rem 1.5rem; }
          .register-card { border-radius: 16px; }
        }
      `}</style>
    </div>
  );
};

export default Login;
