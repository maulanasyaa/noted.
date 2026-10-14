import { Plus, Search } from 'lucide-react';

import useLanguage from '../hooks/useLanguage';

function SearchBar({ keyword, onKeywordChange }) {
  const { t } = useLanguage();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full max-w-md">
      <div className="relative flex items-center text-text-muted">
        <Search size={18} className="absolute left-3 pointer-events-none" />
        <input
          type="search"
          placeholder={t('header_search_placeholder')}
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>
    </form>
  );
}

function Header({
  headerTitle,
  totalNotes,
  handleClick,
  keyword,
  onKeywordChange,
  showAddButton = true,
}) {
  const { t } = useLanguage();

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="flex text-text-primary font-medium text-3xl">
          {headerTitle}
        </h1>
        <p className="text-sm text-text-muted">
          {t('header_total_notes', { count: totalNotes })}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <SearchBar keyword={keyword} onKeywordChange={onKeywordChange} />
        {showAddButton && (
          <button
            onClick={handleClick}
            className="flex w-70 items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg active:translate-y-0.5 hover:bg-primary-hover transition-all"
          >
            <Plus size={18} />
            <span className="text-sm text-white font-medium ml-2">
              {t('header_add_note')}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
