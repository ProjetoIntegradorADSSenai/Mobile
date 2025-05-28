import * as React from 'react';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
};

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'myapp',
  path: 'control'
});
console.log('Redirect URI gerado:', redirectUri);



const GITHUB_CLIENT_ID = Constants.expoConfig?.extra?.githubClientId ?? Constants.manifest?.extra?.githubClientId;

if (!GITHUB_CLIENT_ID) {
  throw new Error("GITHUB_CLIENT_ID não configurado corretamente.");
}

export function useGithubAuth() {

  const isExpoGo = Constants.appOwnership === 'expo';

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: isExpoGo ? 'expo' : 'myapp',
    path: 'control'
  });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GITHUB_CLIENT_ID,
      scopes: ['read:user'],
      redirectUri,
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('Authorization Code:', code);
    }
  }, [response]);

  return {
    promptAsync,
    response,
  };
}
