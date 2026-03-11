const $ = id => document.getElementById(id);

const getRank = s => [
  { min: 2000, name: '🔱 MEME LEGEND', badge: 'legend' },
  { min: 1500, name: '💜 MEME PRO',    badge: 'pro'    },
  { min: 1000, name: '🌱 RISING STAR', badge: 'rising' },
  { min: 0,    name: '🐣 ROOKIE',      badge: 'rookie' },
].find(r => s >= r.min);

const getLB = () => {
  try { return JSON.parse(localStorage.getItem('memeLB') || '[]'); }
  catch { return []; }
};

const toast = msg => {
  $('toast').textContent = msg;
  $('toast').classList.add('show');
  setTimeout(() => $('toast').classList.remove('show'), 2500);
};

function refreshHome() {
  const lb = getLB();
  $('sg').textContent = localStorage.getItem('totalGames') || '0';
  $('sp').textContent = lb.length;
  $('st').textContent = lb.length ? lb[0].score.toLocaleString() : '0';

  const medals = ['🥇', '🥈', '🥉'];
  $('lbBody').innerHTML = lb.length
    ? lb.slice(0, 10).map((e, i) => {
        const r  = getRank(e.score);
        const rc = i < 3 ? ['gold', 'silver', 'bronze'][i] : '';
        const rk = i < 3 ? 'r' + (i + 1) : '';
        return `
          <div class="lb-row ${rc}">
            <div class="lb-rank ${rk}">${medals[i] || i + 1}</div>
            <div class="lb-name">
              <div>${e.name}</div>
              <div class="lb-date">${e.date}</div>
            </div>
            <div class="lb-score">${e.score.toLocaleString()}</div>
            <div class="lb-badge-col"><span class="badge ${r.badge}">${r.name}</span></div>
          </div>`;
      }).join('')
    : `<div class="empty-lb"><div class="ei">🏆</div><p>No entries yet — play a game</p></div>`;
}

function clearLB() {
  if (!confirm('Reset leaderboard?')) return;
  localStorage.removeItem('memeLB');
  refreshHome();
  toast('Leaderboard reset');
}

refreshHome();
