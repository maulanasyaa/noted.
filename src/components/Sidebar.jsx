import { Archive, House, LogOut, NotebookPen, UserKey } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useLanguage from '../hooks/useLanguage';

function Sidebar({ handleLogout }) {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <aside className="flex flex-col text-primary min-h-screen w-54 bg-surface p-4 shrink-0">
      <div className="flex h-12 items-center gap-3 font-bold text-2xl">
        <NotebookPen className="text-icon" />
        <h2 className="text-text-primary">Noted.</h2>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        {/* menu home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex text-base items-center gap-3 p-2 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'bg-primary-soft text-primary font-semibold'
                : 'text-text-muted hover:bg-primary-soft hover:text-primary'
            }`
          }
        >
          <House size={18} />
          <span>{t('sidebar_home')}</span>
        </NavLink>

        {/* menu archive */}
        <NavLink
          to="/archive"
          className={({ isActive }) =>
            `flex text-base items-center gap-3 p-2 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'bg-primary-soft text-primary font-semibold'
                : 'text-text-muted hover:bg-primary-soft hover:text-primary'
            }`
          }
        >
          <Archive size={18} />
          <span>{t('sidebar_archive')}</span>
        </NavLink>
      </div>
      <div className="mt-auto flex items-center justify-center gap-6 bg-primary-soft p-2 rounded-2xl mb-2 h-20">
        <UserKey className="text-icon" size={25} />
        <div className="flex flex-col">
          <span className="text-text-primary font-semibold text-sm">
            {t('sidebar_greeting', { name: user?.name })}
          </span>
          <span className="text-text-muted text-xs">{user?.email}</span>
        </div>
      </div>
      <button
        className="flex items-center justify-center bg-primary text-md text-text-on-primary rounded-lg h-8 cursor-pointer hover:bg-primary-hover transition-all gap-2"
        onClick={handleLogout}
      >
        {t('sidebar_logout')}
        <LogOut size={15} />
      </button>
    </aside>
  );
}

export default Sidebar;
