<div align="center">

# 🎭 MemeBattle — Caption Challenge Game

<img src="https://i.imgflip.com/30b1gx.jpg" width="120" style="border-radius:16px;" />

**Write. Vote. Dominate.**

[![Live Demo](https://img.shields.io/badge/🎮%20Play%20Now-Live%20Demo-ff2d78?style=for-the-badge&labelColor=121827)](https://adityak9822.github.io/Meme-Battle-Caption-Challenge-Game)
&nbsp;
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> A 5-round browser meme-captioning game — no framework, no server, no build step. Just open and play.

</div>

---

## 🕹️ What is MemeBattle?

MemeBattle drops a random meme in front of you and gives you **30 seconds** to write the funniest caption you can. Submit it, and a simulated crowd of voters likes, dislikes, and LOLs at your caption. Your score is calculated, your rank badge is assigned, and your name goes up on the leaderboard — all without a single server request.

Built entirely with **vanilla HTML, CSS, and JavaScript**. No npm. No webpack. No React. Just five files and a browser.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎲 **Random Memes** | 9 classic meme templates, no repeats per session |
| ⏱️ **30s Timer** | SVG ring countdown with danger animation at ≤10s |
| 🗳️ **AI Vote Simulation** | Likes, Dislikes & LOLs generated from caption quality |
| 🏆 **Live Leaderboard** | Persists across sessions via `localStorage` |
| 🎖️ **Rank System** | Rookie → Rising Star → Meme Pro → Meme Legend |
| 🏅 **Achievements** | Caption God, On Fire, Hot Start & more |
| 📱 **Responsive** | Works on desktop and mobile |

---

## 🧮 Scoring Formula

```
SCORE = (Likes × 10) + (LOLs × 8) − (Dislikes × 5) + (TimeLeft × 3) + LengthBonus
```

> `LengthBonus = +50` if your caption is longer than 30 characters.
> Write fast *and* write something funny — both matter.

---

## 🎖️ Rank Tiers

```
  0 – 999   →  🥉 Rookie
1000 – 1499  →  ⭐ Rising Star
1500 – 1999  →  🔥 Meme Pro
2000+        →  👑 Meme Legend
```

---

## 🗂️ Project Structure

```
Meme-Battle-Caption-Challenge-Game/
├── index.html   → Home page — hero, stats, leaderboard, forum
├── play.html    → Game page — username, arena, voting, results
├── style.css    → All shared styles (CSS custom properties)
├── home.js      → Leaderboard rendering & stats logic
└── play.js      → Core game engine — timer, votes, scoring, saves
```

Zero dependencies. Zero build step. Open `index.html` and it runs.

---

## ⚙️ How the Vote Simulation Works

```js
const quality  = caption.length > 20 ? Math.random() * 0.6 + 0.4 : Math.random() * 0.4;
const base     = Math.floor(Math.random() * 80) + 20;
const likes    = Math.floor(base * quality);
const dislikes = Math.floor(base * (1 - quality) * 0.6);
const funny    = Math.floor(likes * (0.3 + Math.random() * 0.7));
```

Longer captions → higher quality → more likes → more LOLs. Short captions get penalised. The algorithm rewards effort.

---

## 🚀 Run Locally

```bash
git clone https://github.com/adityak9822/Meme-Battle-Caption-Challenge-Game.git
cd Meme-Battle-Caption-Challenge-Game
# Open index.html in your browser — that's it.
```

No `npm install`. No terminal running in the background. Just a browser.

---

## 🛠️ Tech Stack

- **HTML5** — semantic structure across two pages
- **CSS3** — custom properties, flexbox, SVG animations, responsive breakpoints
- **Vanilla JS (ES6+)** — game engine, vote simulation, score formula, countUp animator
- **localStorage** — leaderboard persistence (`memeLB` key, top 20 entries)

---

<div align="center">

**Made with 🧠 and absolutely zero servers**

[![Play MemeBattle](https://img.shields.io/badge/🎮%20Open%20MemeBattle-Play%20Now-ff2d78?style=for-the-badge&labelColor=121827)](https://adityak9822.github.io/Meme-Battle-Caption-Challenge-Game)

</div>
