/* include.js - loads header.html and footer.html into the pages and wires up mobile nav */
document.addEventListener('DOMContentLoaded', function() {
  function loadInto(selector, url, callback) {
    var el = document.querySelector(selector);
    if (!el) return;
    fetch(url).then(function(resp) {
      if (!resp.ok) throw new Error('Network response was not ok');
      return resp.text();
    }).then(function(html) {
      el.innerHTML = html;
      if (callback) callback();
    }).catch(function(err) {
      console.error('Include load failed:', err);
    });
  }

  loadInto('#site-header', 'header.html', initNav);
  loadInto('#site-footer', 'footer.html');

  function initNav() {
    var btn = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function() {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
    // Close nav on link click (mobile)
    var links = nav.querySelectorAll('a');
    links.forEach(function(a) {
      a.addEventListener('click', function() {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
