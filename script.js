document.addEventListener('DOMContentLoaded', function () {
  // mobile nav toggle
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });
  }

  // scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        var a = i.querySelector('.faq-a');
        if (a) a.style.maxHeight = null;
      });
      if (!wasOpen) {
        item.classList.add('open');
        var a = item.querySelector('.faq-a');
        if (a) a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // simple callback form -> fake submit feedback
  document.querySelectorAll('form[data-callback]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var note = form.querySelector('.form-success');
      if (btn) {
        var original = btn.textContent;
        btn.textContent = 'Отправлено ✓';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
          form.reset();
        }, 2600);
      }
      if (note) {
        note.style.display = 'block';
        setTimeout(function () { note.style.display = 'none'; }, 2600);
      }
    });
  });
});
