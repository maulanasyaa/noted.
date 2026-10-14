import { useState } from 'react';

import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  NotebookPen,
  UserRound,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   state for form fields
  const [fullName, onFullNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      setTimeout(() => {
        setPasswordMatchError(false);
      }, 2000);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await register({ name: fullName, email, password });
      if (!error) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Register failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Top-right bubble */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 180"
        fill="none"
        className="pointer-events-none absolute -right-10 -top-10 w-80 animate-bubble-top"
        aria-hidden="true"
      >
        <path
          d="M125 0H300V180C263 169 235 148 218 119C195 79 176 44 125 0Z"
          fill="#EAE1D6"
        />
      </svg>

      {/* Bottom-left bubble */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 420 250"
        fill="none"
        className="pointer-events-none absolute -bottom-10 -left-10 w-96 animate-bubble-bottom"
        aria-hidden="true"
      >
        <path
          d="M0 0C65 8 93 37 119 81C151 135 184 152 247 162C322 174 374 193 420 250H0V0Z"
          fill="#EAE1D6"
        />
      </svg>

      <header className="absolute left-14 top-10 z-10 flex items-center gap-3">
        <NotebookPen size={30} strokeWidth={1.8} className="text-icon" />
        <span className="text-3xl font-bold tracking-tight text-text-primary">
          Noted.
        </span>
      </header>

      <main className="relative z-10 grid min-h-[calc(100vh-4rem)] grid-cols-2 items-center gap-16 px-16 py-10">
        {/* Left: Illustration and introduction */}
        <section className="flex flex-col items-center justify-center text-center">
          {/* Animated SVG illustration */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 220"
            fill="none"
            className="mb-6 w-72 animate-float"
            role="img"
            aria-label="Illustration of a note and leaves"
          >
            {/* Organic background */}
            <path
              d="M49 96C39 70 61 48 91 43C112 39 128 19 151 27C173 34 181 52 204 55C233 58 253 78 250 102C247 125 228 142 201 143H87C64 142 46 122 49 96Z"
              fill="#E9E0D5"
            />

            {/* Paper shadow */}
            <path
              d="M99 56L190 44C198 43 204 49 205 57L218 155L124 170C116 171 110 165 109 157L99 56Z"
              fill="#D8CCBC"
            />

            {/* Note paper */}
            <path
              d="M94 52L185 40C193 39 199 45 200 53L211 148L117 163C109 164 103 158 102 150L94 52Z"
              fill="#FBF8F3"
              stroke="#AA957C"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Folded corner */}
            <path
              d="M181 144L211 148L187 124C183 131 181 137 181 144Z"
              fill="#D9CBBB"
            />

            {/* Note lines */}
            <g stroke="#D4C6B5" strokeWidth="3" strokeLinecap="round">
              <path d="M116 69L176 61" />
              <path d="M118 84L179 76" />
              <path d="M120 99L169 92" />
            </g>

            {/* Animated leaves */}
            <g className="animate-leaf">
              <path
                d="M219 105C218 79 237 57 258 54C259 78 245 99 219 105Z"
                fill="#899078"
              />
              <path
                d="M219 105C221 84 235 68 252 59"
                stroke="#697459"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M224 119C244 110 260 116 270 132C250 140 233 135 224 119Z"
                fill="#A7AD94"
              />
              <path
                d="M224 119L263 132"
                stroke="#7F896D"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M219 105C220 123 219 136 214 146"
                stroke="#697459"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* Decorative circles */}
            <circle cx="77" cy="151" r="15" fill="#D9D9C8" />
            <circle cx="263" cy="148" r="7" fill="#E5D9C9" />
          </svg>

          <h1 className="text-4xl font-semibold tracking-tight text-text-primary">
            Capture Your Thoughts
          </h1>

          <p className="mt-4 max-w-md text-lg leading-7 text-text-secondary">
            Organize your notes, boost your productivity, and never lose an
            important idea again.
          </p>
        </section>

        {/* Right: Registration modal */}
        <section className="mx-auto w-full max-w-md rounded-2xl border border-border bg-surface/80 p-8 shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-text-primary mb-2">
            Create Your Account
          </h2>
          <p className="text-text-muted mb-8">
            Join <span className="font-semibold">Noted.</span> and start saving
            your thoughts in one place.
          </p>
          <form action="submit" onSubmit={handleSubmit}>
            {/* full name field */}
            <div className="flex flex-col gap-2 mb-3">
              <label
                htmlFor="full_name"
                className="text-text-secondary font-bold"
              >
                Full Name
              </label>
              <div className="flex items-center border border-border rounded-md px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-primary">
                <UserRound className="text-icon" size={20} />
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted text-text-primary"
                  placeholder="Enter your name"
                  required
                  value={fullName}
                  onChange={onFullNameChange}
                />
              </div>
            </div>

            {/* email field */}
            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="email" className="text-text-secondary font-bold">
                Email
              </label>
              <div className="flex items-center border border-border rounded-md px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-primary">
                <Mail className="text-icon" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted text-text-primary"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={onEmailChange}
                />
              </div>
            </div>

            {/* password field */}
            <div className="flex flex-col gap-2 mb-3">
              <label
                htmlFor="password"
                className="text-text-secondary font-bold"
              >
                Password
              </label>
              <div className="flex items-center border border-border rounded-md px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-primary">
                <LockKeyhole className="text-icon" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted text-text-primary"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={onPasswordChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-icon hover:text-text-primary focus:outline-none shrink-0"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* confirm password field */}
            <div className="flex flex-col gap-2 mb-4">
              <label
                htmlFor="confirm_password"
                className="text-text-secondary font-bold"
              >
                Confirm Password
              </label>
              <div
                className={
                  passwordMatchError
                    ? 'flex items-center border border-red-500 rounded-md px-3 py-2 gap-2 animate-shake-error'
                    : 'flex items-center border border-border rounded-md px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-primary'
                }
              >
                <LockKeyhole className="text-icon" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm_password"
                  name="confirm_password"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted text-text-primary"
                  placeholder="Enter your password"
                  required
                  value={confirmPassword}
                  onChange={onConfirmPasswordChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-icon hover:text-text-primary focus:outline-none shrink-0"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 inline-block animate-spin" size={16} />
                  Creating account
                </>
              ) : (
                <>
                  Register
                  <ArrowRight
                    className="ml-2 inline-block animate-arrow-right"
                    size={16}
                  />
                </>
              )}
            </button>
          </form>
          <hr className="my-4 border-border" />
          <p className="mt-4 text-center text-sm text-text-muted">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary hover:underline font-bold"
            >
              Login
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Register;
