import {AuthConfig} from "angular-oauth2-oidc";

export const noDiscoveryAuthConfig: AuthConfig = {
  clientId:
    'theses',
  redirectUri: 'http://localhost:4200/index.html',
  postLogoutRedirectUri: '',
  scope: 'openid profile email',
  resource: '',
  rngUrl: '',
  oidc: true,
  requestAccessToken: true,
  options: null,
  clearHashAfterLogin: true,
  tokenEndpoint: 'https://self.se.jku.at/auth/realms/se-mitarbeiter/protocol/openid-connect/token',
  userinfoEndpoint: 'https://self.se.jku.at/auth/realms/se-mitarbeiter/protocol/openid-connect/userinfo',
  responseType: 'token',
  showDebugInformation: true,
  dummyClientSecret: '8e9051b1-2879-41fb-963d-73f5430028be',
  requireHttps: 'remoteOnly',
  silentRefreshIFrameName: 'angular-oauth-oidc-silent-refresh-iframe',
  timeoutFactor: 0.75,
  sessionCheckIntervall: 3000,
  sessionCheckIFrameName: 'angular-oauth-oidc-check-session-iframe',
  disableAtHashCheck: false,
  skipSubjectCheck: false,
};
