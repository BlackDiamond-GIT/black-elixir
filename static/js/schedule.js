(function () {
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateClocks() {
    var now = new Date();
    var formatted = new Intl.DateTimeFormat('cs-CZ', {
      timeZone: 'Europe/Prague',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);

    document.querySelectorAll('[data-schedule-clock]').forEach(function (el) {
      el.textContent = formatted;
    });
  }

  function initTabs() {
    document.querySelectorAll('[data-schedule-tabs]').forEach(function (bar) {
      bar.addEventListener('click', function (event) {
        var btn = event.target.closest('[data-schedule-tab]');
        if (!btn) return;

        var id = btn.getAttribute('data-schedule-tab');
        bar.querySelectorAll('.schedule-tabs__btn').forEach(function (tab) {
          var active = tab === btn;
          tab.classList.toggle('active', active);
          tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        document.querySelectorAll('[data-schedule-card]').forEach(function (card) {
          var show = card.getAttribute('data-masseuse-id') === id;
          card.classList.toggle('schedule-masseuse--hidden', !show);
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateClocks();
    setInterval(updateClocks, 60000);
    initTabs();
  });
})();
