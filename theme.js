(() => {
  const key = 'kay-shared-theme';
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem(key) ?? localStorage.getItem('kay-download-theme') ?? localStorage.getItem('kay-live-theme');
    root.dataset.theme = saved === 'dark' ? 'dark' : 'light';
  } catch {
    root.dataset.theme = 'light';
  }
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('theme');
    const setTheme = theme => {
      root.dataset.theme = theme;
      const dark = theme === 'dark';
      button.firstElementChild.textContent = dark ? '☀' : '☾';
      button.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
      button.setAttribute('aria-label', button.title);
    };
    setTheme(root.dataset.theme);
    button.hidden = false;
    button.addEventListener('click', () => {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(theme);
      try { localStorage.setItem(key, theme); } catch {}
    });
    window.addEventListener('storage', event => {
      if (event.key === key) setTheme(event.newValue === 'dark' ? 'dark' : 'light');
    });
  });
})();
