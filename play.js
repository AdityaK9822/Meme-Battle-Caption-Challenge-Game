const $ = id => document.getElementById(id);

const MEMES = [
  { id: 1, name: 'Distracted Boyfriend', category: 'Relationships', img: 'https://i.imgflip.com/1ur9b0.jpg' },
  { id: 2, name: 'Drake Approves',        category: 'Choices',       img: 'https://i.imgflip.com/30b1gx.jpg' },
  { id: 3, name: 'Two Buttons',           category: 'Decisions',     img: 'https://i.imgflip.com/1g8my4.jpg' },
  { id: 4, name: 'Change My Mind',        category: 'Hot Takes',     img: 'https://i.imgflip.com/24y43o.jpg' },
  { id: 5, name: 'This Is Fine',          category: 'Survival',      img: 'https://i.imgflip.com/wxica.jpg'  },
  { id: 6, name: 'Hide the Pain Harold',  category: 'Struggles',     img: 'https://i.imgflip.com/gk5el.jpg'  },
  { id: 7, name: 'Expanding Brain',       category: 'Galaxy Brain',  img: 'https://i.imgflip.com/1jwhww.jpg' },
  { id: 8, name: 'Surprised Pikachu',     category: 'Reactions',     img: 'https://i.imgflip.com/2kbn1e.jpg' },
  { id: 9, name: 'One Does Not Simply',   category: 'Wisdom',        img: 'https://i.imgflip.com/1bij.jpg'   },
];

const FEEDBACK = [
  ['🔥 LEGENDARY!',    '😂 Crowd goes WILD!', '💎 Comedy gold!',     '🚀 Broke the internet!'],
  ['👏 Nice one!',      '😄 People loved it!', '⭐ Strong caption!',  '🎉 Pretty funny!'      ],
  ['😐 Not bad...',     '🤔 Had potential!',   '📈 Keep practicing!', '💪 Good try!'          ],
  ['😴 Try harder',     '🥱 Crowd yawned...',  '💡 Be more creative!','😬 Rough round...'     ],
];

const RANKS = [
  { min: 2000, name: '🔱 MEME LEGEND', badge: 'legend', css: 'background:rgba(255,215,0,.12);color:#ffd700;border:1px solid rgba(255,215,0,.5);'       },
  { min: 1500, name: '💜 MEME PRO',    badge: 'pro',    css: 'background:rgba(191,95,255,.12);color:#bf5fff;border:1px solid rgba(191,95,255,.5);'     },
  { min: 1000, name: '🌱 RISING STAR', badge: 'rising', css: 'background:rgba(0,255,157,.1);color:#00ff9d;border:1px solid rgba(0,255,157,.5);'        },
  { min: 0,    name: '🐣 ROOKIE',      badge: 'rookie', css: 'background:rgba(255,255,255,.05);color:#5a6a82;border:1px solid rgba(255,255,255,.2);'   },
];

// Game state
const G = {
  username:    '',
  round:       1,
  score:       0,
  usedMemes:   [],
  roundScores: [],
  timer:       null,
  timeLeft:    30,
  submitted:   false,
};

const rand    = arr => arr[Math.floor(Math.random() * arr.length)];
const getRank = s   => RANKS.find(r => s >= r.min);
const getLB   = ()  => { try { return JSON.parse(localStorage.getItem('memeLB') || '[]'); } catch { return []; } };

const toast = msg => {
  $('toast').textContent = msg;
  $('toast').classList.add('show');
  setTimeout(() => $('toast').classList.remove('show'), 2500);
};

function startGame() {
  const name = $('usernameInput').value.trim();
  if (!name) { toast('Enter your callsign!'); return; }

  Object.assign(G, { username: name, round: 1, score: 0, usedMemes: [], roundScores: [], submitted: false });
  $('username-screen').style.display  = 'none';
  $('game-screen').style.display      = 'block';
  $('game-over-screen').style.display = 'none';
  loadRound();
}

function loadRound() {
  G.submitted = false;

  let pool = MEMES.filter(m => !G.usedMemes.includes(m.id));
  if (!pool.length) { G.usedMemes = []; pool = MEMES; }

  const meme = rand(pool);
  G.usedMemes.push(meme.id);

  $('roundNum').textContent    = G.round;
  $('currentScore').textContent = G.score;
  $('memeImg').src             = meme.img;
  $('memeCategory').textContent = meme.category;
  $('memeName').textContent    = meme.name.toUpperCase();
  $('captionInput').value      = '';
  $('charCount').textContent   = '0';
  $('submitBtn').disabled      = false;
  $('votingPanel').classList.remove('show');

  startTimer();
}

function startTimer() {
  clearInterval(G.timer);
  G.timeLeft = 30;

  G.timer = setInterval(() => {
    G.timeLeft--;
    const offset  = 201 - (G.timeLeft / 30) * 201;
    const isDanger = G.timeLeft <= 10;

    $('timerRing').style.strokeDashoffset = offset;
    $('timerNum').textContent = G.timeLeft;
    $('timerRing').classList.toggle('danger', isDanger);
    $('timerNum').classList.toggle('danger', isDanger);

    if (G.timeLeft <= 0) {
      clearInterval(G.timer);
      if (!G.submitted) { toast("⏰ TIME'S UP"); submitCaption(true); }
    }
  }, 1000);
}

function submitCaption(timeUp = false) {
  clearInterval(G.timer);
  G.submitted = true;

  const cap = $('captionInput').value.trim();
  if (!cap && !timeUp) {
    toast('Write a caption first!');
    G.submitted = false;
    startTimer();
    return;
  }

  $('submitBtn').disabled = true;
  $('submittedCaption').textContent = `"${cap || '(no caption)'}"`;

  // Simulate votes
  const quality  = cap.length > 20 ? Math.random() * 0.6 + 0.4 : Math.random() * 0.4;
  const base     = Math.floor(Math.random() * 80) + 20;
  const likes    = Math.floor(base * quality);
  const dislikes = Math.floor(base * (1 - quality) * 0.6);
  const funny    = Math.floor(likes * (0.3 + Math.random() * 0.7));

  countUp('likeCount',    likes);
  countUp('dislikeCount', dislikes);
  countUp('funnyCount',   funny);

  const pts  = Math.max(0, likes * 10 + funny * 8 - dislikes * 5 + G.timeLeft * 3 + (cap.length > 30 ? 50 : 0));
  const tier = pts >= 800 ? 0 : pts >= 500 ? 1 : pts >= 250 ? 2 : 3;

  G.roundScores.push(pts);
  G.score += pts;

  setTimeout(() => {
    $('roundPoints').textContent  = `+${pts}`;
    $('feedbackMsg').textContent  = rand(FEEDBACK[tier]);
    $('currentScore').textContent = G.score;
    $('votingPanel').classList.add('show');
    $('nextBtn').textContent      = G.round >= 5 ? '▶ SEE RESULTS' : 'NEXT MEME ▶';
    spawnPopup(`+${pts}`);
  }, 900);
}

function nextRound() {
  if (G.round >= 5) {
    endGame();
  } else {
    G.round++;
    loadRound();
  }
}

function endGame() {
  $('game-screen').style.display      = 'none';
  $('game-over-screen').style.display = 'block';

  const rank = getRank(G.score);

  $('goEmoji').textContent   = G.score >= 2000 ? '🔱' : G.score >= 1500 ? '💜' : G.score >= 1000 ? '⭐' : '🎮';
  $('finalScore').textContent = G.score.toLocaleString();

  const rb = $('rankBadge');
  rb.textContent  = rank.name;
  rb.style.cssText = rank.css + 'padding:8px 24px;border-radius:3px;font-family:var(--font-display);font-weight:900;font-size:0.7rem;letter-spacing:2px;';

  // Achievements
  const ach = [];
  if (Math.max(...G.roundScores) >= 800)                    ach.push('🔥 Caption God');
  if (Math.min(...G.roundScores) >= 300)                    ach.push('⚡ Consistent');
  if (G.roundScores.filter(s => s >= 600).length >= 3)      ach.push('🎯 On Fire');
  if (G.roundScores[0] >= 700)                              ach.push('💥 Hot Start');
  if (!ach.length)                                          ach.push('🎮 Participated');
  $('achList').innerHTML = ach.map(a => `<div class="ach">${a}</div>`).join('');

  // Save to leaderboard
  const lb = getLB();
  lb.push({ name: G.username, score: G.score, badge: rank.badge, date: new Date().toLocaleDateString() });
  lb.sort((a, b) => b.score - a.score);
  localStorage.setItem('memeLB', JSON.stringify(lb.slice(0, 20)));
  localStorage.setItem('totalGames', parseInt(localStorage.getItem('totalGames') || '0') + 1);

  $('rankMsg').textContent = `YOU RANKED #${lb.findIndex(e => e.name === G.username && e.score === G.score) + 1} ON THE GLOBAL LEADERBOARD`;
}

function resetGame() {
  $('game-over-screen').style.display = 'none';
  $('game-screen').style.display      = 'none';
  $('username-screen').style.display  = 'block';
}

function countUp(id, target) {
  const el = $(id);
  const t0 = Date.now();
  const tick = () => {
    const progress = Math.min((Date.now() - t0) / 800, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

function spawnPopup(text) {
  const el = document.createElement('div');
  el.className = 'score-popup';
  el.textContent = text;
  el.style.cssText = 'top:45%; left:50%; transform:translateX(-50%)';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1700);
}

$('captionInput').addEventListener('input', () => {
  $('charCount').textContent = $('captionInput').value.length;
});

$('usernameInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') startGame();
});
