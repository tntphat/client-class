import { LOCAL_STORAGE_TOKEN } from '../constants';

export async function loginGg(callback) {
  const authResponse = await new Promise((resolve, reject) =>
    window.FB.login(function (response) {
      console.log(response, 'res');
      if (response.status === 'connected') {
        FB.api('/me?fields=id,email,name,picture.width(720).height(720)', function (data) {
          resolve({ data, accessToken: response.authResponse.accessToken });
        });
      }
    }),
  );
  callback(authResponse);
  // console.log(authResponse);
  if (!authResponse) return;
}

export function logOutFb() {
  window.FB.logout(function (res) {});
}

export function logOutGg() {
  window.gapi.auth2
    .getAuthInstance()
    .signOut()
    .then(function () {
      console.log('User signed out.');
    });
}

export const authWithGg = (clientId, onSuccess, onFailure) => {
  console.log(process.env.NODE_ENV);
  window.onGoogleScriptLoad = () => {
    const _gapi = window.gapi;

    _gapi.load('auth2', () => {
      (async () => {
        const _googleAuth = await _gapi.auth2.init({
          client_id: clientId,
        });
        _googleAuth.attachClickHandler(
          document.getElementById('customBtn'),
          {
            prompt: 'consent',
          },
          onSuccess,
          onFailure,
        );
      })();
    });
  };
};
export const loadScript = () => {
  const appId =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_FB_APP_TEST_ID
      : process.env.REACT_APP_FB_APP_ID;
  // Fb
  window.fbAsyncInit = function () {
    window.FB.init({
      appId,
      cookie: true,
      xfbml: true,
      version: 'v8.0',
    });
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  // GG
  (function () {
    const id = 'google-js';
    const src = 'https://apis.google.com/js/platform.js';

    const firstJs = document.getElementsByTagName('script')[0];

    // Prevent script from loading twice
    if (document.getElementById(id)) {
      return;
    }
    const js = document.createElement('script');
    js.id = id;
    js.src = src;
    js.onload = window.onGoogleScriptLoad;
    firstJs.parentNode.insertBefore(js, firstJs);
  })();
};

export const setCookie = (day, value, key, domain) => {
  let now = new Date();
  let time = now.getTime();
  let expireTime = time + day * 86400 * 1000;
  now.setTime(expireTime);

  let domainString;
  if (domain) {
    domainString = `;domain=${domain}`;
  } else {
    domainString = ``;
  }

  document.cookie = `${key}=${value};expires=${now.toUTCString()}${domainString};path=/`;
};

export const deletetAllCookieOfDomain = (domain) => {
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) setCookie(1, '', cookies[i].split('=')[0], domain);
};

export const readCookie = (name) => {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// export let regNumber = /^\d+$/;

export let regNumber = /^[0-9]+$/;

export function deleteAllCookies() {
  var allCookies = document.cookie.split(';');

  for (var i = 0; i < allCookies.length; i++)
    document.cookie = allCookies[i] + '=;expires=' + new Date(0).toUTCString();
}

export const login = (token) => {
  deleteAllCookies();
  setCookie(365, token, LOCAL_STORAGE_TOKEN, window.location.hostname);
  window.location.replace('/');
};

export const logout = () => {
  deletetAllCookieOfDomain(window.location.hostname);
  // logOutFb();
  // logOutGg();
  window.location.replace('/');
};
