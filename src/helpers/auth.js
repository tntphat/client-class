export async function login() {
  const authResponse = await new Promise((resolve, reject) =>
    window.FB.login(
      function (response) {
        if (response.status === 'connected') {
          FB.api('/me?fields=id,email,name,picture.width(720).height(720)', function (data) {
            resolve(data);
          });
        }
      },
      { scope: 'email' },
    ),
  );
  console.log(authResponse);
  if (!authResponse) return;
}

export function logout() {
  window.FB.logout(function (res) {
    console.log(res, 'aaa');
  });
}

// async function apiAuthenticate(accessToken, setData) {
//   axios
//     .get(`https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${accessToken}`)
//     .then((response) => {
//       console.log('res: ', response);
//       setData(response.data);
//     });
// }
// console.log('a');
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
