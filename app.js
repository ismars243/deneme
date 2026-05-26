'use strict';

const PRAYERS = [
  { key: 'Fajr',    label: 'İmsak'  },
  { key: 'Sunrise', label: 'Güneş'  },
  { key: 'Dhuhr',   label: 'Öğle'   },
  { key: 'Asr',     label: 'İkindi' },
  { key: 'Maghrib', label: 'Akşam'  },
  { key: 'Isha',    label: 'Yatsı'  },
];

const MONTHS = [
  'Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
  'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık',
];

let userLat = null;
let userLng = null;
let todayTimings = null;
let notifOn = false;

const $locationText = document.getElementById('location-text');
const $nextLabel    = document.getElementById('next-label');
const $countdown    = document.getElementById('countdown');
const $untilText    = document.getElementById('until-text');
const $prayersRow   = document.getElementById('prayers-row');
const $monthHeading = document.getElementById('month-heading');
const $tableBody    = document.getElementById('table-body');
const $notifBtn     = document.getElementById('notif-btn');

function pad(n) {
  return String(n).padStart(2, '0');
}

function clean(str) {
  return str.replace(/\s*\(.*\)/, '').trim().slice(0, 5);
}

function toDate(timeStr) {
  const [h, m] = clean(timeStr).split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

// --- Location ---
function getLocation() {
  return new Promise(resolve => {
    const fallback = () => resolve({ lat: 41.0082, lng: 28.9784, city: 'İstanbul' });

    if (!navigator.geolocation) { fallback(); return; }

    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        let city = 'Konumunuz';
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { 'Accept-Language': 'tr' } }
          );
          const d = await r.json();
          city = d.address.city || d.address.town || d.address.village || d.address.county || city;
        } catch {}
        resolve({ lat, lng, city });
      },
      fallback,
      { timeout: 8000, maximumAge: 600000 }
    );
  });
}

// --- API ---
async function fetchCalendar(year, month) {
  // Method 13 = Diyanet (Turkey), Method 3 = MWL (global)
  const isTurkey = (userLat > 35.8 && userLat < 42.2 && userLng > 25.6 && userLng < 44.9);
  const method = isTurkey ? 13 : 3;
  const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${userLat}&longitude=${userLng}&method=${method}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('API error');
  const json = await res.json();
  if (json.code !== 200) throw new Error('Bad response');
  return json.data;
}

// --- Render table ---
function renderTable(data, todayNum) {
  $tableBody.innerHTML = data.map((day, i) => {
    const n = i + 1;
    const t = day.timings;
    const cls = n === todayNum ? ' class="today"' : '';
    return `<tr${cls}>
      <td>${n}</td>
      <td>${clean(t.Fajr)}</td>
      <td>${clean(t.Sunrise)}</td>
      <td>${clean(t.Dhuhr)}</td>
      <td>${clean(t.Asr)}</td>
      <td>${clean(t.Maghrib)}</td>
      <td>${clean(t.Isha)}</td>
    </tr>`;
  }).join('');
}

// --- Countdown tick ---
function tick() {
  if (!todayTimings) return;

  const now = new Date();
  const times = PRAYERS.map(p => ({ ...p, date: toDate(todayTimings[p.key]) }));
  const nextIdx = times.findIndex(p => now < p.date);
  const prevIdx = nextIdx === -1 ? times.length - 1 : Math.max(nextIdx - 1, 0);

  $prayersRow.innerHTML = times.map((p, i) => {
    const active = (i === prevIdx && nextIdx !== -1) ? ' active' : '';
    return `<div class="p-card${active}">
      <div class="p-name">${p.label}</div>
      <div class="p-time">${clean(todayTimings[p.key])}</div>
    </div>`;
  }).join('');

  if (nextIdx === -1) {
    $nextLabel.textContent = 'Yatsı geçti';
    $countdown.textContent = '--:--:--';
    $untilText.textContent = 'yarın imsak vakti için bekleniyor';
    return;
  }

  const next = times[nextIdx];
  const diff = next.date - now;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  $nextLabel.textContent = next.label;
  $countdown.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  $untilText.textContent = `vakite kadar · ${clean(todayTimings[next.key])}`;
}

// --- Notification check (runs every 30s) ---
function checkNotif() {
  if (!notifOn || !todayTimings || Notification.permission !== 'granted') return;
  const now = new Date();
  PRAYERS.forEach(p => {
    const t = toDate(todayTimings[p.key]);
    if (Math.abs(now - t) < 35000) {
      new Notification(`${p.label} Vakti`, {
        body: `${clean(todayTimings[p.key])} — ${p.label} vakti girdi.`,
        icon: 'icon.svg',
        tag: p.key,
        renotify: false,
      });
    }
  });
}

// --- Notification button ---
$notifBtn.addEventListener('click', async () => {
  if (!('Notification' in window)) {
    alert('Bu tarayıcı bildirimleri desteklemiyor.');
    return;
  }

  if (notifOn) {
    notifOn = false;
    $notifBtn.classList.remove('on');
    return;
  }

  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    notifOn = true;
    $notifBtn.classList.add('on');
    new Notification('İmsakiye', {
      body: 'Namaz vakti bildirimleri açıldı.',
      icon: 'icon.svg',
    });
  } else {
    alert('Bildirim izni reddedildi. Tarayıcı/telefon ayarlarından izin verebilirsiniz.');
  }
});

// --- Init ---
async function init() {
  const loc = await getLocation();
  userLat = loc.lat;
  userLng = loc.lng;
  $locationText.textContent = '📍 ' + loc.city;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const today = now.getDate();

  $monthHeading.textContent = `${MONTHS[month - 1]} ${year}`;

  try {
    const data = await fetchCalendar(year, month);
    todayTimings = data[today - 1].timings;
    renderTable(data, today);
    tick();
    setInterval(tick, 1000);
    setInterval(checkNotif, 30000);

    // Scroll today's row into view after render
    setTimeout(() => {
      const row = $tableBody.querySelector('.today');
      if (row) row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 300);
  } catch {
    $tableBody.innerHTML = '<tr><td colspan="7" class="error">Veri yüklenemedi. İnternet bağlantınızı kontrol edin.</td></tr>';
    $countdown.textContent = '--:--:--';
    $nextLabel.textContent = 'hata';
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

init();
