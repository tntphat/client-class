export async function login(callback) {
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
