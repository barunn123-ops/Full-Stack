// ============================================================
// highlighting, and contact form validation.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.navbar-toggler-custom');
  var links = document.querySelector('.mn-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

 
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.mn-links a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active');
    }
  });

  
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  var form = document.getElementById('contactForm');

  if (form) {
    var status = document.getElementById('formStatus');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        showStatus('Please fill in every field before sending.', 'err');
        return;
      }

      if (!emailPattern.test(email.value.trim())) {
        showStatus('Your email address doesn\'t look quite right.', 'err');
        return;
      }


      showStatus('Thank you, ' + name.value.trim().split(' ')[0] + '. Your note has reached us. We will reply within a day.', 'ok');
      form.reset();
    });

    function showStatus(text, kind) {
      status.textContent = text;
      status.classList.remove('ok', 'err');
      status.classList.add('show', kind);
    }
  }

  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

});
