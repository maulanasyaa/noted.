// Dictionary terjemahan EN <-> ID.
// Struktur: { key: { en: '...', id: '...' } }
// Placeholder pakai tanda kurung siku, mis. [name] / [count],
// diganti via fungsi t() dengan parameter vars.

const translations = {
  // --- Document ---
  document_title: {
    id: 'Noted. - Aplikasi Catatan',
    en: 'Noted. - Notes App',
  },

  // --- Sidebar ---
  sidebar_home: { id: 'Beranda', en: 'Home' },
  sidebar_archive: { id: 'Arsip', en: 'Archive' },
  sidebar_greeting: { id: 'Hai, [name]!', en: 'Hi, [name]!' },
  sidebar_logout: { id: 'Logout', en: 'Logout' },

  // --- Header ---
  header_search_placeholder: { id: 'Cari catatan...', en: 'Search notes...' },
  header_search_label: { id: 'Cari catatan', en: 'Search notes' },
  header_add_note: { id: 'Tambah Catatan', en: 'Add Note' },
  header_total_notes: {
    id: 'Total [count] catatan',
    en: 'Total [count] notes',
  },
  home_title: { id: 'Semua Catatan', en: 'All Notes' },
  archive_title: { id: 'Catatan Arsip', en: 'Archived Notes' },

  // --- Home: modal tambah catatan ---
  add_note_title: { id: 'Tambah Catatan Baru', en: 'New Note' },
  add_note_description: {
    id: 'Isi detail catatan barumu.',
    en: 'Fill in your new note details.',
  },
  add_note_field_title: { id: 'Judul', en: 'Title' },
  add_note_field_body: { id: 'Isi catatan', en: 'Note content' },
  add_note_submit: { id: 'Tambah Catatan', en: 'Add Note' },

  // --- NoteList empty state ---
  notes_empty: { id: 'Tidak ada catatan', en: 'No notes' },
  archive_empty: { id: 'Arsip Kosong', en: 'Archive is empty' },
  notes_action_error: {
    id: 'Operasi catatan gagal. Silakan coba lagi.',
    en: 'The note operation failed. Please try again.',
  },
  note_load_error: {
    id: 'Catatan gagal dimuat. Silakan coba lagi.',
    en: 'The note could not be loaded. Please try again.',
  },
  auth_loading_status: {
    id: 'Memeriksa ruang Anda...',
    en: 'Checking your space...',
  },
  auth_loading_description: {
    id: 'Memastikan semuanya siap untuk pikiran Anda.',
    en: 'Making sure everything is ready for your thoughts.',
  },
  note_loading_label: {
    id: 'Sedang memuat detail catatan',
    en: 'Loading note details',
  },
  note_loading_title: {
    id: 'Menyiapkan pikiran Anda',
    en: 'Gathering your thoughts',
  },
  note_loading_description: {
    id: 'Sebentar, kami sedang mencari catatan Anda ✨',
    en: 'Just a little moment while we find your notes ✨',
  },
  note_loading_sr: {
    id: 'Sedang mengambil data catatan...',
    en: 'Fetching note data...',
  },

  // --- NoteItem menu ---
  note_archive: { id: 'Arsipkan', en: 'Archive' },
  note_unarchive: { id: 'Batal Arsip', en: 'Unarchive' },
  note_delete: { id: 'Hapus', en: 'Delete' },

  // --- DeleteConfirmModal ---
  delete_title: { id: 'Hapus Catatan', en: 'Delete Note' },
  delete_description: {
    id: 'Apakah Anda yakin ingin menghapus catatan ini? Tindakan ini tidak dapat dibatalkan.',
    en: 'Are you sure you want to delete this note? This action cannot be undone.',
  },
  button_cancel: { id: 'Batal', en: 'Cancel' },
  button_processing: { id: 'Memproses...', en: 'Processing...' },
  button_delete: { id: 'Hapus', en: 'Delete' },

  // --- ArchiveConfirmModal ---
  archive_title_action: { id: 'Arsipkan Catatan', en: 'Archive Note' },
  unarchive_title_action: { id: 'Batal Arsip Catatan', en: 'Unarchive Note' },
  archive_description: {
    id: 'Apakah Anda yakin ingin mengarsipkan catatan ini? Anda dapat menemukannya di bagian arsip.',
    en: 'Are you sure you want to archive this note? You can find it in the archive section.',
  },
  unarchive_description: {
    id: 'Apakah Anda yakin ingin mengeluarkan catatan ini dari arsip? Anda dapat menemukannya di bagian catatan utama.',
    en: 'Are you sure you want to unarchive this note? You can find it in your main notes.',
  },
  button_archive: { id: 'Arsipkan', en: 'Archive' },
  button_unarchive: { id: 'Batal Arsip', en: 'Unarchive' },

  // --- NoteDetail ---
  detail_back_home: { id: 'Kembali ke Beranda', en: 'Back to Home' },

  // --- LogoutConfirmModal ---
  logout_title: { id: 'Keluar', en: 'Logout' },
  logout_description: {
    id: 'Apakah Anda yakin ingin keluar? Anda akan diarahkan ke halaman login.',
    en: 'Are you sure you want to logout? You will be redirected to the login page.',
  },
  button_logout: { id: 'Keluar', en: 'Logout' },

  // --- Login ---
  login_intro_title: { id: 'Selamat Datang Kembali', en: 'Welcome Back' },
  login_intro_description: {
    id: 'Pikiran, ide, dan rencana Anda tinggal selangkah lagi dari login.',
    en: 'Your thoughts, ideas, and plans are just a login away.',
  },
  login_form_title: { id: 'Masuk', en: 'Sign In' },
  login_form_description: {
    id: 'Selamat datang kembali! Masukkan detail Anda untuk mengakses catatan.',
    en: 'Welcome back! Please enter your details to access your notes.',
  },
  login_email_label: { id: 'Email', en: 'Email' },
  login_email_placeholder: {
    id: 'Masukkan email Anda',
    en: 'Enter your email',
  },
  login_password_label: { id: 'Kata Sandi', en: 'Password' },
  login_password_placeholder: {
    id: 'Masukkan kata sandi Anda',
    en: 'Enter your password',
  },
  login_submit: { id: 'Masuk', en: 'Login' },
  login_loading_label: { id: 'Sedang memproses login', en: 'Processing login' },
  login_illustration_label: {
    id: 'Ilustrasi buku catatan, pena, dan tanaman',
    en: 'Illustration of a notebook, pen, and plant',
  },
  login_no_account: { id: 'Belum punya akun?', en: "Don't have an account?" },
  login_register_link: { id: 'Daftar', en: 'Register' },
  login_loading_title: {
    id: 'Menyiapkan ruang Anda',
    en: 'Getting things ready',
  },
  login_loading_description: {
    id: 'Menyiapkan ruang kecil untuk pikiran Anda...',
    en: 'Preparing your little space of thoughts...',
  },

  // --- Register ---
  register_intro_title: {
    id: 'Tangkap Pikiran Anda',
    en: 'Capture Your Thoughts',
  },
  register_intro_description: {
    id: 'Buat akun dan mulailah menyimpan ide dan rencana Anda di satu tempat.',
    en: 'Create an account and start saving your ideas and plans in one place.',
  },
  register_intro_extra: {
    id: 'Atur catatan Anda, tingkatkan produktivitas Anda, dan jangan pernah kehilangan ide penting lagi.',
    en: 'Organize your notes, boost your productivity, and never lose an important idea again.',
  },
  register_form_title: { id: 'Buat Akun', en: 'Create Your Account' },
  register_form_description: {
    id: 'Bergabung dengan Noted. dan mulailah menyimpan pikiran Anda di satu tempat.',
    en: 'Join Noted. and start saving your thoughts in one place.',
  },
  register_name_label: { id: 'Nama Lengkap', en: 'Full Name' },
  register_name_placeholder: {
    id: 'Masukkan nama Anda',
    en: 'Enter your name',
  },
  register_email_label: { id: 'Email', en: 'Email' },
  register_email_placeholder: {
    id: 'Masukkan email Anda',
    en: 'Enter your email',
  },
  register_password_label: { id: 'Kata Sandi', en: 'Password' },
  register_password_placeholder: {
    id: 'Masukkan kata sandi',
    en: 'Enter your password',
  },
  register_confirm_label: {
    id: 'Konfirmasi Kata Sandi',
    en: 'Confirm Password',
  },
  register_confirm_placeholder: {
    id: 'Konfirmasi kata sandi',
    en: 'Confirm your password',
  },
  register_password_mismatch: {
    id: 'Kata sandi tidak cocok.',
    en: 'Passwords do not match.',
  },
  register_illustration_label: {
    id: 'Ilustrasi catatan dan daun',
    en: 'Illustration of a note and leaves',
  },
  register_submit: { id: 'Daftar', en: 'Register' },
  register_creating: { id: 'Membuat akun', en: 'Creating account' },
  register_has_account: {
    id: 'Sudah punya akun?',
    en: 'Already have an account?',
  },
  register_login_link: { id: 'Masuk', en: 'Login' },
  theme_group_label: { id: 'Pilihan tema', en: 'Theme options' },
  theme_light_label: { id: 'Tema terang', en: 'Light theme' },
  theme_dark_label: { id: 'Tema gelap', en: 'Dark theme' },
  language_toggle_label: { id: 'Ubah bahasa', en: 'Change language' },

  // --- NotFound ---
  notfound_title: { id: 'Halaman Tidak Ditemukan', en: 'Page Not Found' },
  notfound_heading: {
    id: 'Oops, sepertinya halaman yang Anda cari tidak ada.',
    en: 'Oops, it looks like the page you are looking for does not exist.',
  },
  notfound_description: {
    id: 'Halaman yang Anda coba akses mungkin telah dihapus, atau alamat URL yang Anda masukkan salah. Silakan periksa kembali alamat URL atau kembali ke beranda.',
    en: 'The page you are trying to access may have been deleted, or the URL you entered is incorrect. Please check the URL or go back to the homepage.',
  },
  notfound_back_home: { id: 'Kembali ke Beranda', en: 'Back to Home' },

  // --- NotesLoading ---
  notes_loading: { id: 'Memuat catatan...', en: 'Loading your notes...' },
};

export default translations;
