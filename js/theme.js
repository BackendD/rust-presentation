// Theme manager for Rust presentation: handles instant dark/light switching and localStorage persistence across sections
(function() {
    var STORAGE_KEY = 'rust_presentation_theme';

    function getPreferredTheme() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'dark' || stored === 'light') {
                return stored;
            }
        } catch (e) {}
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    function applyTheme(theme) {
        var root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark-theme');
            root.classList.remove('light-theme');
        } else {
            root.classList.add('light-theme');
            root.classList.remove('dark-theme');
        }

        // Update toggle buttons across DOM
        var toggles = document.querySelectorAll('.theme-toggle-btn');
        toggles.forEach(function(btn) {
            var isDark = theme === 'dark';
            btn.setAttribute('aria-label', isDark ? 'تغییر به تم روشن' : 'تغییر به تم تاریک');
            btn.setAttribute('title', isDark ? 'روشن (Light Mode)' : 'تاریک (Dark Mode)');
            var icon = btn.querySelector('.theme-toggle-icon');
            var text = btn.querySelector('.theme-toggle-text');
            if (icon) {
                icon.textContent = isDark ? '☀️' : '🌙';
            }
            if (text) {
                text.textContent = isDark ? 'روشن' : 'تاریک';
            }
        });

        // If Chart.js is present (railroad chart on index), trigger update if needed
        if (window.Chart && window.Chart.instances) {
            try {
                Object.values(window.Chart.instances).forEach(function(chart) {
                    var isDark = theme === 'dark';
                    var textColor = isDark ? '#cbd5e1' : '#475569';
                    var gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                    if (chart.options && chart.options.scales) {
                        ['x', 'y'].forEach(function(axis) {
                            if (chart.options.scales[axis]) {
                                if (chart.options.scales[axis].ticks) chart.options.scales[axis].ticks.color = textColor;
                                if (chart.options.scales[axis].grid) chart.options.scales[axis].grid.color = gridColor;
                            }
                        });
                        chart.update();
                    }
                });
            } catch (e) {}
        }
    }

    window.toggleTheme = function() {
        var current = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (e) {}
        applyTheme(next);
    };

    // Apply immediately to prevent flash of wrong theme
    var initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    // Ensure buttons are updated once DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            applyTheme(getPreferredTheme());
        });
    }
})();

