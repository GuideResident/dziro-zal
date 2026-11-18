/* DZIRO: сервис-воркер уведомлений. Показывает каждое push-сообщение сам — так надёжнее на iPhone. */
const BASE = self.registration.scope;
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  let j = {};
  try { j = e.data ? e.data.json() : {}; } catch (err) { j = { data: { body: e.data ? e.data.text() : '' } }; }
  const d = j.data || {}, n = j.notification || {};
  const title = d.title || n.title || 'DZIRO';
  const opts = {
    body: d.body || n.body || '',
    icon: BASE + 'icon-192.png',
    badge: BASE + 'icon-192.png',
    tag: d.tag || undefined,
    data: { link: d.link || (j.fcmOptions && j.fcmOptions.link) || BASE }
  };
  e.waitUntil(self.registration.showNotification(title, opts));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const link = (e.notification.data && e.notification.data.link) || BASE;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if (c.url.indexOf(BASE) === 0 && 'focus' in c) { c.navigate(link).catch(() => {}); return c.focus(); } }
    return self.clients.openWindow(link);
  }));
});
