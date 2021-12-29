// import { NgModule } from '@angular/core';
// import { AuthModule } from 'angular-auth-oidc-client';
//
//
// @NgModule({
//   imports: [AuthModule.forRoot({
//     config: {
//       authority: 'https://self.se.jku.at/auth/realms/se-mitarbeiter/protocol/openid-connect/token',
//       redirectUrl: window.location.origin,
//       postLogoutRedirectUri: window.location.origin,
//       clientId: 'theses',
//       scope: 'openid profile', // 'openid profile offline_access ' + your scopes
//       responseType: 'code',
//       silentRenew: true,
//       useRefreshToken: true,
//       renewTimeBeforeTokenExpiresInSeconds: 30,
//       customParamsAuthRequest: {
//         secret: '8e9051b1-2879-41fb-963d-73f5430028be',
//       }
//     }
//   })],
//   exports: [AuthModule],
// })
// export class AuthConfigModule {}
