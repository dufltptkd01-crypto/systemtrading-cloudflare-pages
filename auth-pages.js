(function () {
  'use strict';

  var core = window.PortalCore;
  if (!core) {
    return;
  }

  var signupForm = document.getElementById('signupForm');
  var loginForm = document.getElementById('loginForm');
  var apiInput = document.getElementById('authApiBase');
  var resultBox = document.getElementById('authResult');

  function log(title, payload) {
    var text = '[' + new Date().toLocaleString('ko-KR') + '] ' + title + '\n' + (typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2));
    if (resultBox) {
      resultBox.textContent = text;
    }
  }

  function formatPhone(value) {
    var digits = String(value || '').replace(/\D/g, '').slice(0, 11);
    if (digits.length < 4) {
      return digits;
    }
    if (digits.length < 8) {
      return digits.slice(0, 3) + '-' + digits.slice(3);
    }
    if (digits.length < 11) {
      return digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7);
    }
    return digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7, 11);
  }

  function saveApiBaseIfAny() {
    var settings = core.loadSettings();
    var base = String((apiInput && apiInput.value) || '').trim();
    if (base) {
      settings.apiBase = base;
      core.saveSettings(settings);
    }
    return base || settings.apiBase || '';
  }

  function redirectHomeSoon() {
    setTimeout(function () {
      window.location.href = './index.html';
    }, 1000);
  }

  async function handleSignup(event) {
    event.preventDefault();

    var name = document.getElementById('signupName').value.trim();
    var phone = formatPhone(document.getElementById('signupPhone').value.trim());
    var email = document.getElementById('signupEmail').value.trim();
    var password = document.getElementById('signupPassword').value;

    if (password.length < 8) {
      log('회원가입 실패', '비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    var apiBase = saveApiBaseIfAny();

    try {
      var data = await core.callApi('register', 'POST', {
        name: name,
        phone: phone,
        email: email,
        password: password
      }, {
        withAuth: false,
        apiBase: apiBase
      });

      var token = String(data.access_token || '');
      var user = data.user || null;
      core.saveSession({
        token: token,
        user: user,
        verified: Boolean(user && user.verified),
        billing: data.billing || null
      });
      log('회원가입 완료', {
        email: user ? user.email : email,
        verified: user ? user.verified : false,
        next: '메인 페이지로 이동합니다.'
      });
      redirectHomeSoon();
    } catch (err) {
      log('회원가입 실패', String(err.message || err));
    }
  }

  async function handleLogin(event) {
    event.preventDefault();

    var email = document.getElementById('loginEmail').value.trim();
    var password = document.getElementById('loginPassword').value;
    var apiBase = saveApiBaseIfAny();

    try {
      var data = await core.callApi('login', 'POST', {
        email: email,
        password: password
      }, {
        withAuth: false,
        apiBase: apiBase
      });

      var token = String(data.access_token || '');
      var user = data.user || null;
      core.saveSession({
        token: token,
        user: user,
        verified: Boolean(user && user.verified),
        billing: data.billing || null
      });
      log('로그인 완료', {
        email: user ? user.email : email,
        verified: user ? user.verified : false,
        next: '메인 페이지로 이동합니다.'
      });
      redirectHomeSoon();
    } catch (err) {
      log('로그인 실패', String(err.message || err));
    }
  }

  function init() {
    var settings = core.loadSettings();
    if (apiInput) {
      apiInput.value = settings.apiBase || '';
    }

    if (signupForm) {
      var phoneInput = document.getElementById('signupPhone');
      phoneInput.addEventListener('input', function () {
        phoneInput.value = formatPhone(phoneInput.value);
      });
      signupForm.addEventListener('submit', handleSignup);
    }

    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    }

    var session = core.loadSession();
    if (session.user && resultBox) {
      resultBox.textContent = '현재 로그인 사용자: ' + (session.user.email || session.user.name || 'unknown');
    }
  }

  init();
})();
