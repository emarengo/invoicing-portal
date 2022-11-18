import { nanoid } from 'nanoid';
import { stringify } from 'query-string';

// Static oidc params for OIDC provider
const authority = process.env.REACT_APP_ONE_LOGIN_AUTHORITY;
const clientId = process.env.REACT_APP_ONE_LOGIN_CLIENT_ID;
const redirectUri = process.env.REACT_APP_ONE_LOGIN_REDIRECT_URI;
const responseType = 'id_token token';
const scope = 'openid profile';

// mandatory random generated string
const state = nanoid(32);
const nonce = nanoid(32);

export const beginAuth = () => {
  // Generate authentication URL
  const params = stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: responseType,
    scope,
    state,
    nonce
  });
  const authUrl = `${authority}/auth?${params}`;

  // Attempt login by navigating to authUrl
  window.location.assign(authUrl);
};
