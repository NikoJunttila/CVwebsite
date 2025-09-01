live version: www.junttila.dev

ng build
firebase deploy


add file src/environments/environment.ts
and something like this from firebase settings
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456",
    measurementId: "G-XXXXXXX" // optional, only if analytics was enabled
  }
};
