importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: 'AIzaSyD1OD0UcTbOaIZ8KiL3Kniyzojd0BkRLJE', authDomain: 'dziro-push.firebaseapp.com', projectId: 'dziro-push',
  storageBucket: 'dziro-push.firebasestorage.app', messagingSenderId: '1063927156549', appId: '1:1063927156549:web:39676c3b179588f366f82c'
});
firebase.messaging();
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
