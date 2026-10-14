import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function NotFound() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex min-w-0 flex-1 items-center justify-center px-6">
        <div className="w-full max-w-lg text-center">
          {/* Illustration */}
          <div
            className="mx-auto mb-8 flex h-48 w-48 items-center justify-center"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 240 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              {/* Ground shadow */}
              <ellipse
                cx="120"
                cy="177"
                rx="62"
                ry="9"
                fill="var(--primary-soft)"
                opacity="0.7"
              />

              {/* Paper */}
              <path
                d="M62 32C62 25.373 67.373 20 74 20H151L178 47V160C178 166.627 172.627 172 166 172H74C67.373 172 62 166.627 62 160V32Z"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="2"
              />

              {/* Fold */}
              <path
                d="M151 20V43C151 45.209 152.791 47 155 47H178"
                fill="var(--primary-soft)"
                stroke="var(--border)"
                strokeWidth="2"
              />

              {/* 404 */}
              <text
                x="120"
                y="105"
                textAnchor="middle"
                fill="var(--primary)"
                fontSize="39"
                fontWeight="700"
                fontFamily="Quicksand, sans-serif"
              >
                404
              </text>

              {/* Lines */}
              <path
                d="M82 123H158"
                stroke="var(--border)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <path
                d="M95 137H145"
                stroke="var(--primary-soft)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Decorations */}
              <circle cx="43" cy="65" r="7" fill="var(--accent-sage)" />

              <path
                d="M195 68L198 75L205 78L198 81L195 88L192 81L185 78L192 75L195 68Z"
                fill="var(--accent-sand)"
              />

              <circle cx="201" cy="122" r="5" fill="var(--accent-rose)" />

              <path
                d="M38 111H52"
                stroke="var(--accent-lavender)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Halaman Tidak Ditemukan
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              Oops, sepertinya halaman yang Anda cari tidak ada.
            </h1>

            <p className="mx-auto max-w-md text-base leading-7 text-text-secondary">
              Halaman yang Anda coba akses mungkin telah dihapus, atau alamat
              URL yang Anda masukkan salah. Silakan periksa kembali alamat URL
              atau kembali ke beranda.
            </p>
          </div>

          {/* Action */}
          <div className="mt-8">
            <Link
              to="/"
              className="
                inline-flex items-center justify-center
                rounded-xl
                bg-primary
                px-5 py-2.5
                text-sm font-semibold text-white
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-primary-hover
                hover:shadow-md
                focus:outline-none
                focus:ring-2
                focus:ring-primary
                focus:ring-offset-2
                focus:ring-offset-background
              "
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
