import { useState } from 'react';

import { NotebookPen } from 'lucide-react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import LoginLoadingModal from '../components/LoginLoadingModal';
import useAuth from '../hooks/useAuth';
import useInput from '../hooks/useInput';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  //   state for form fields
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await login({ email, password });

      if (error) {
        return;
      }

      navigate('/', { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Top-right decoration */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 250"
        fill="none"
        className="pointer-events-none absolute -right-10 -top-10 w-80 animate-bubble-top"
        aria-hidden="true"
      >
        <path
          d="M90 0H300V250C254 235 224 209 206 173C181 125 160 62 90 0Z"
          fill="#EAE1D6"
        />
      </svg>

      {/* Bottom-left decoration */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 420 300"
        fill="none"
        className="pointer-events-none absolute -bottom-10 -left-10 w-96 animate-bubble-bottom"
        aria-hidden="true"
      >
        <path
          d="M0 0C65 8 93 37 119 81C151 135 184 152 247 162C322 174 374 193 420 300H0V0Z"
          fill="#EAE1D6"
        />
      </svg>

      <header className="absolute left-14 top-10 z-10 flex items-center gap-3">
        <NotebookPen size={30} strokeWidth={1.8} className="text-icon" />
        <span className="text-3xl font-bold tracking-tight text-text-primary">
          Noted.
        </span>
      </header>

      <main className="relative z-10 grid min-h-screen grid-cols-2 items-center gap-16 px-16 py-24">
        {/* Left: Illustration and introduction */}
        <section className="flex flex-col items-center justify-center text-center">
          {/* Illustration */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 240"
            fill="none"
            className="mb-6 w-80 animate-float"
            role="img"
            aria-label="Notebook, pen, and plant illustration"
          >
            {/* Organic background */}
            <path
              d="M38 128C26 99 43 78 70 72C94 67 96 39 124 40C148 41 153 57 179 54C205 51 218 70 241 83C267 99 272 123 251 143C232 162 201 173 166 173H85C57 173 45 153 38 128Z"
              fill="#E9E0D5"
            />

            {/* Plant stem */}
            <path
              d="M78 174C72 143 64 112 54 91"
              stroke="#899078"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Plant leaves */}
            <g fill="#899078">
              <path d="M54 112C33 106 27 87 31 69C49 77 59 92 54 112Z" />
              <path d="M59 133C39 139 23 128 17 112C36 109 52 117 59 133Z" />
              <path d="M64 151C46 158 32 149 26 135C44 130 58 138 64 151Z" />
              <path d="M54 94C53 76 63 59 78 52C81 70 71 87 54 94Z" />
            </g>

            {/* Notebook shadow */}
            <path
              d="M104 78L177 64C185 62 191 68 192 76L207 174L130 190C122 192 116 186 115 178L104 78Z"
              fill="#D8CCBC"
            />

            {/* Notebook cover */}
            <path
              d="M96 72L169 58C177 56 183 62 184 70L199 168L122 184C114 186 108 180 107 172L96 72Z"
              fill="#B6A089"
              stroke="#9B846B"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Notebook label */}
            <rect
              x="123"
              y="82"
              width="43"
              height="25"
              rx="4"
              transform="rotate(-10 123 82)"
              fill="#F8F4F0"
            />

            {/* Notebook binding */}
            <g stroke="#806A54" strokeWidth="3" strokeLinecap="round">
              <path d="M104 91L113 89" />
              <path d="M107 113L116 111" />
              <path d="M110 135L119 133" />
              <path d="M113 157L122 155" />
            </g>

            {/* Pen */}
            <g transform="rotate(18 211 123)">
              <rect
                x="205"
                y="83"
                width="8"
                height="83"
                rx="4"
                fill="#8B765F"
              />
              <rect
                x="207"
                y="87"
                width="4"
                height="62"
                rx="2"
                fill="#CFC0AC"
              />
              <path d="M205 162L209 175L213 162Z" fill="#6F5A45" />
              <path d="M205 83L209 74L213 83Z" fill="#6F5A45" />
            </g>

            {/* Decorative circles */}
            <circle cx="228" cy="76" r="8" fill="#E0D5C7" />
            <circle cx="241" cy="83" r="5" fill="#E0D5C7" />
            <circle cx="90" cy="187" r="9" fill="#D9D9C8" />
          </svg>

          {/* Intro text */}
          <h1 className="text-4xl font-semibold tracking-tight text-text-primary">
            Welcome Back
          </h1>

          <p className="mt-4 max-w-sm text-lg leading-8 text-text-secondary">
            Your thoughts, ideas, and plans are just a login away.
          </p>
        </section>

        {/* Right: Empty login modal */}
        <section className="mx-auto w-full max-w-md rounded-2xl border border-border bg-surface/80 p-8 shadow-sm backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-text-primary mb-2">
            Create Your Account
          </h2>
          <p className="text-text-muted mb-8">
            Join <span className="font-semibold">Noted.</span> and start saving
            your thoughts in one place.
          </p>
          <form action="submit" onSubmit={handleSubmit}>
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

            {/* submit button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            >
              Login
              <ArrowRight
                className="ml-2 inline-block animate-arrow-right"
                size={16}
              />
            </button>
            <hr className="my-4 border-border" />
            <p className="mt-4 text-center text-sm text-text-muted">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary hover:underline font-bold"
              >
                Register
              </Link>
            </p>
          </form>
        </section>
      </main>

      {/* loading after login */}
      {isLoading && <LoginLoadingModal />}
    </div>
  );
}

export default Login;
