(() => {
  'use strict';

  const activateTab = (button) => {
    const targetId = button.dataset.tabTarget;
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    document.querySelectorAll('.tab-btn').forEach((item) => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-selected', item === button ? 'true' : 'false');
    });

    document.querySelectorAll('.tab-content').forEach((item) => {
      item.classList.toggle('active', item === target);
      item.hidden = item !== target;
    });
  };

  const initTabs = () => {
    const buttons = document.querySelectorAll('.tab-btn[data-tab-target]');
    const tabs = document.querySelectorAll('.tab-content');

    if (!buttons.length || !tabs.length) return;

    buttons.forEach((button) => {
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', button.dataset.tabTarget || '');
      button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');

      button.addEventListener('click', () => activateTab(button));
    });

    tabs.forEach((tab) => {
      tab.setAttribute('role', 'tabpanel');
      tab.hidden = !tab.classList.contains('active');
    });
  };

  const initBackToTop = () => {
    const button = document.getElementById('btt');
    if (!button) return;

    const toggleButton = () => {
      button.classList.toggle('show', window.scrollY > 400);
    };

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggleButton, { passive: true });
    toggleButton();
  };

  const initSmoothAnchors = () => {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
      link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initBackToTop();
    initSmoothAnchors();
  });

  window.switchTab = (button, id) => {
    if (!button || !id) return;
    button.dataset.tabTarget = id;
    activateTab(button);
  };
})();
