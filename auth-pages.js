(function () {
  'use strict';

  var core = window.PortalCore;
  if (!core) {
    return;
  }

  var LANG_KEY = 'systemtrading.ui.lang.v1';
  var EN = {
    'brand.name': 'STP',
    'auth.login': 'Log In',
    'auth.signup': 'Sign Up',
    'auth.login.page_title': 'Log In | SystemTrading Premier',
    'auth.signup.page_title': 'Sign Up | SystemTrading Premier',
    'authpage.login.desc': 'After login and verification, you can start auto-trading.',
    'authpage.signup.desc': 'Please complete identity verification before live auto-trading.',
    'authpage.email': 'Email',
    'authpage.password': 'Password',
    'authpage.name': 'Name',
    'authpage.phone': 'Mobile Number',
    'authpage.api_base_opt': 'Backend API Base URL (Optional)',
    'authpage.signup.submit': 'Create Account',
    'authpage.login.foot_prefix': 'First time here?',
    'authpage.signup.foot_prefix': 'Already have an account?',
    'authpage.login.result_default': 'Enter your login credentials.',
    'authpage.signup.result_default': 'Enter your sign-up information.',
    'authpage.ph.email': 'you@example.com',
    'authpage.ph.password': 'Password',
    'authpage.ph.password_signup': 'At least 8 characters',
    'authpage.ph.name': 'Hong Gil-dong',
    'authpage.ph.phone': '010-1234-5678',
    'authpage.ph.api_base': 'https://api.example.com',
    'auth.error.password_short': 'Password must be at least 8 characters.',
    'auth.log.signup_ok': 'Sign-up completed',
    'auth.log.signup_fail': 'Sign-up failed',
    'auth.log.login_ok': 'Login completed',
    'auth.log.login_fail': 'Login failed',
    'auth.log.next_home': 'Redirecting to home page.',
    'auth.log.current_user_prefix': 'Current signed-in user: '
  };

  var signupForm = document.getElementById('signupForm');
  var loginForm = document.getElementById('loginForm');
  var apiInput = document.getElementById('authApiBase');
  var resultBox = document.getElementById('authResult');
  var btnLangKo = document.getElementById('btnLangKoAuth');
  var btnLangEn = document.getElementById('btnLangEnAuth');
  var authPage = String((document.body && document.body.getAttribute('data-auth-page')) || '').toLowerCase();

  var state = {
    lang: loadLanguage()
  };

  function loadLanguage() {
    var stored = String(localStorage.getItem(LANG_KEY) || '').toLowerCase();
    if (stored === 'ko' || stored === 'en') {
      return stored;
    }
    return String(navigator.language || '').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en';
  }

  function setLanguage(lang) {
    if (lang !== 'ko' && lang !== 'en') {
      return;
    }
    state.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyI18n();
  }

  function trans(key, koText) {
    if (state.lang !== 'en') {
      return koText;
    }
    return EN[key] || koText;
  }

  function applyI18n() {
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'ko';
    document.title = authPage === 'signup'
      ? trans('auth.signup.page_title', '회원가입 | SystemTrading Premier')
      : trans('auth.login.page_title', '로그인 | SystemTrading Premier');

    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      if (!node.dataset.koText) {
        node.dataset.koText = node.textContent;
      }
      node.textContent = state.lang === 'ko' ? node.dataset.koText : (EN[key] || node.dataset.koText);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-placeholder');
      if (!node.dataset.koPlaceholder) {
        node.dataset.koPlaceholder = node.getAttribute('placeholder') || '';
      }
      node.setAttribute('placeholder', state.lang === 'ko' ? node.dataset.koPlaceholder : (EN[key] || node.dataset.koPlaceholder));
    });

    if (btnLangKo) {
      btnLangKo.classList.toggle('active', state.lang === 'ko');
    }
    if (btnLangEn) {
      btnLangEn.classList.toggle('active', state.lang === 'en');
    }
  }

  function log(title, payload) {
    var text = '[' + new Date().toLocaleString(state.lang === 'en' ? 'en-US' : 'ko-KR') + '] ' + title + '\n' + (typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2));
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
      log(trans('auth.log.signup_fail', '회원가입 실패'), trans('auth.error.password_short', '비밀번호는 8자 이상이어야 합니다.'));
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
      log(trans('auth.log.signup_ok', '회원가입 완료'), {
        email: user ? user.email : email,
        verified: Boolean(user && user.verified),
        next: trans('auth.log.next_home', '메인 페이지로 이동합니다.')
      });
      redirectHomeSoon();
    } catch (err) {
      log(trans('auth.log.signup_fail', '회원가입 실패'), String(err.message || err));
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
      log(trans('auth.log.login_ok', '로그인 완료'), {
        email: user ? user.email : email,
        verified: Boolean(user && user.verified),
        next: trans('auth.log.next_home', '메인 페이지로 이동합니다.')
      });
      redirectHomeSoon();
    } catch (err) {
      log(trans('auth.log.login_fail', '로그인 실패'), String(err.message || err));
    }
  }

  function init() {
    var settings = core.loadSettings();
    if (apiInput) {
      apiInput.value = settings.apiBase || '';
    }

    applyI18n();

    if (btnLangKo) {
      btnLangKo.addEventListener('click', function () { setLanguage('ko'); });
    }
    if (btnLangEn) {
      btnLangEn.addEventListener('click', function () { setLanguage('en'); });
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
      resultBox.textContent = trans('auth.log.current_user_prefix', '현재 로그인 사용자: ') + (session.user.email || session.user.name || 'unknown');
    }
  }

  init();
})();
