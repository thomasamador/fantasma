const STORAGE_KEY = 'fantasma-theme';
const THEMES = { light: 'light', dark: 'dracula' };

export function initThemeToggle() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
        updateToggleIcon(btn);
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === THEMES.light ? THEMES.dark : THEMES.light;
            document.documentElement.setAttribute('data-theme', next);
            document.documentElement.className = (next === THEMES.light) ? 'has-dark-text' : 'has-light-text';
            localStorage.setItem(STORAGE_KEY, next);
            updateToggleIcon(btn);
        });
    });
}

function updateToggleIcon(btn) {
    const isDark = document.documentElement.getAttribute('data-theme') !== THEMES.light;
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.querySelector('.icon-sun').style.display = isDark ? 'block' : 'none';
    btn.querySelector('.icon-moon').style.display = isDark ? 'none' : 'block';
}
