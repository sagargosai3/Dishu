// ============================================
// BIRTHDAY SURPRISE - SCRIPT
// Uses: bulb.png, uggreen.png, b1.png,
//       banner.png, Balloon-Border.png,
//       bd1.jpg, vine.png, cake128.png
// ============================================

// ---- Utility Helpers ----
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randInt(min, max) {
  return Math.floor(rand(min, max + 1));
}

function pickRandom(arr) {
  return arr[randInt(0, arr.length - 1)];
}

// ---- State ----
let musicPlaying = false;
let continuousBalloonInterval = null;
let sparkleInterval = null;
let lightConfettiInterval = null;

// ---- DOM Helpers ----
const $ = (id) => document.getElementById(id);
const bgOverlay = $('bg-overlay');
const starsContainer = $('stars-container');
const firefliesContainer = $('fireflies-container');
const fireworksContainer = $('fireworks-container');
const balloonsContainer = $('balloons-container');
const confettiContainer = $('confetti-container');
const streamersContainer = $('streamers-container');
const happyBirthdayText = $('happy-birthday-text');
const cakeWrapper = $('cake-wrapper');
const heartBalloon = $('heart-balloon');
const messageCard = $('message-card');
const bulbsRow = $('bulbs-row');
const candlesRow = $('candles-row');
const bgMusic = $('bg-music');
const lightsWire = $('lights-wire');
const vineDecor = $('vine-decor');
const balloonBorderWrapper = document.querySelector('.balloon-border-wrapper');
const bannerWrapper = document.querySelector('.banner-wrapper');

// All buttons
const btnLights = $('btn-lights');
const btnDecorate = $('btn-decorate');
const btnMusic = $('btn-music');
const btnCake = $('btn-cake');
const btnCandles = $('btn-candles');
const btnMessage = $('btn-message');

// ---- Colors Palette ----
const bulbGlowClasses = ['glow-yellow', 'glow-red', 'glow-blue', 'glow-green', 'glow-pink', 'glow-orange'];

const confettiColors = [
  '#ff4d6d', '#ffd700', '#00e5ff', '#76ff03',
  '#e040fb', '#ff6d00', '#ff80ab', '#7c4dff',
  '#18ffff', '#ffab40', '#f50057', '#651fff'
];

const balloonEmojis = ['🎈', '🎈', '🎈', '🩷', '💜', '💙', '🩵', '❤️'];

const streamerColors = [
  'linear-gradient(to bottom, #ff4d6d, #c9184a)',
  'linear-gradient(to bottom, #ffd700, #ff8c00)',
  'linear-gradient(to bottom, #00e5ff, #0091ea)',
  'linear-gradient(to bottom, #e040fb, #9c27b0)',
  'linear-gradient(to bottom, #76ff03, #33691e)',
  'linear-gradient(to bottom, #ff80ab, #f50057)'
];

// ============================================
// STARS GENERATION
// ============================================
function generateStars(count) {
  count = count || 120;
  starsContainer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = rand(1, 3.5);
    star.style.cssText =
      'left:' + rand(0, 100) + '%;' +
      'top:' + rand(0, 70) + '%;' +
      'width:' + size + 'px;' +
      'height:' + size + 'px;' +
      '--duration:' + rand(1.5, 4) + 's;' +
      'animation-delay:' + rand(0, 3) + 's;';
    starsContainer.appendChild(star);
  }
}

// ============================================
// FIREFLIES GENERATION
// ============================================
function generateFireflies(count) {
  count = count || 25;
  firefliesContainer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const ff = document.createElement('div');
    ff.classList.add('firefly');
    ff.style.cssText =
      'left:' + rand(5, 95) + '%;' +
      'top:' + rand(10, 90) + '%;' +
      '--duration:' + rand(5, 12) + 's;' +
      '--dx1:' + rand(-60, 60) + 'px;' +
      '--dy1:' + rand(-60, 60) + 'px;' +
      '--dx2:' + rand(-80, 80) + 'px;' +
      '--dy2:' + rand(-80, 80) + 'px;' +
      '--dx3:' + rand(-50, 50) + 'px;' +
      '--dy3:' + rand(-50, 50) + 'px;' +
      '--dx4:' + rand(-70, 70) + 'px;' +
      '--dy4:' + rand(-70, 70) + 'px;' +
      'animation-delay:' + rand(0, 5) + 's;';
    firefliesContainer.appendChild(ff);
  }
}

// ============================================
// BULBS GENERATION (using bulb.png & uggreen.png)
// ============================================
function generateBulbs() {
  bulbsRow.innerHTML = '';
  var count = window.innerWidth < 480 ? 6 : (window.innerWidth < 768 ? 10 : 14);
  var bulbs = [];

  for (var i = 0; i < count; i++) {
    var item = document.createElement('div');
    item.classList.add('bulb-item');
    var glowClass = bulbGlowClasses[i % bulbGlowClasses.length];
    item.classList.add(glowClass);

    // Wire connecting to the top
    var wire = document.createElement('div');
    wire.classList.add('bulb-wire');
    item.appendChild(wire);

    // Bulb image — alternate between bulb.png and uggreen.png
    var img = document.createElement('img');
    if (glowClass === 'glow-green') {
      img.src = 'uggreen.png';
    } else {
      img.src = 'bulb.png';
    }
    img.alt = 'decorative light';
    item.appendChild(img);

    bulbsRow.appendChild(item);
    bulbs.push(item);
  }
  return bulbs;
}

// ============================================
// SCENE 1 → SCENE 2: Turn Lights On
// ============================================
function turnLightsOn() {
  // Hide hint and button
  btnLights.classList.add('hidden');
  $('scene-dark').classList.remove('active');

  // Transition background to night sky
  bgOverlay.classList.add('night-sky');

  // Generate stars
  generateStars();
  setTimeout(function() {
    starsContainer.classList.add('visible');
  }, 500);

  // Generate fireflies
  generateFireflies();
  setTimeout(function() {
    firefliesContainer.classList.add('visible');
  }, 1500);

  // Show lights wire with bulb images
  var bulbs = generateBulbs();

  setTimeout(function() {
    lightsWire.classList.add('visible');

    // Light bulbs one by one
    bulbs.forEach(function(bulb, i) {
      setTimeout(function() {
        bulb.classList.add('lit');
      }, 200 + i * 200);
    });

    // Show vine decoration
    setTimeout(function() {
      vineDecor.classList.add('visible');
    }, 200 + bulbs.length * 200);

    // After all bulbs light up, show next button
    setTimeout(function() {
      btnDecorate.classList.remove('hidden');
      btnDecorate.classList.add('glow-pulse');
    }, 200 + bulbs.length * 200 + 1000);
  }, 1000);
}

// ============================================
// SCENE 3: Decoration
// ============================================
function startDecoration() {
  btnDecorate.classList.add('hidden');

  // Show balloon border at top
  balloonBorderWrapper.classList.add('visible');

  // Show banner
  setTimeout(function() {
    bannerWrapper.classList.add('visible');
  }, 600);

  // Launch balloons (mix of emoji and b1.png image balloons)
  launchBalloons(25);

  // Launch confetti
  setTimeout(function() { launchConfetti(80); }, 500);

  // Launch streamers
  setTimeout(function() { launchStreamers(15); }, 300);

  // Show Happy Birthday text
  setTimeout(function() {
    happyBirthdayText.classList.add('visible');
  }, 1500);

  // Show sparkles
  startSparkles();

  // Show next button
  setTimeout(function() {
    btnMusic.classList.remove('hidden');
    btnMusic.classList.add('glow-pulse');
  }, 3500);
}

function launchBalloons(count) {
  for (var i = 0; i < count; i++) {
    (function(idx) {
      setTimeout(function() {
        var balloon = document.createElement('div');
        balloon.classList.add('balloon');
        var duration = rand(4, 8);
        var useImage = Math.random() > 0.5; // 50% chance to use b1.png

        if (useImage) {
          balloon.classList.add('img-balloon');
          var img = document.createElement('img');
          img.src = 'b1.png';
          img.alt = 'balloon';
          balloon.appendChild(img);
        } else {
          balloon.classList.add('emoji-balloon');
          balloon.textContent = pickRandom(balloonEmojis);
          balloon.style.fontSize = rand(2, 4) + 'rem';
        }

        balloon.style.cssText +=
          'left:' + rand(5, 95) + '%;' +
          '--duration:' + duration + 's;' +
          '--rotate:' + rand(-20, 20) + 'deg;';
        balloonsContainer.appendChild(balloon);

        // Clean up after animation
        setTimeout(function() { balloon.remove(); }, duration * 1000 + 500);
      }, idx * 120);
    })(i);
  }
}

function launchContinuousBalloons() {
  if (continuousBalloonInterval) return;
  continuousBalloonInterval = setInterval(function() {
    var balloon = document.createElement('div');
    balloon.classList.add('balloon', 'balloon-continuous');
    var duration = rand(6, 12);
    var useImage = Math.random() > 0.6;

    if (useImage) {
      balloon.classList.add('img-balloon');
      var img = document.createElement('img');
      img.src = 'b1.png';
      img.alt = 'balloon';
      balloon.appendChild(img);
    } else {
      balloon.classList.add('emoji-balloon');
      balloon.textContent = pickRandom(balloonEmojis);
      balloon.style.fontSize = rand(1.5, 3.5) + 'rem';
    }

    balloon.style.cssText +=
      'left:' + rand(5, 95) + '%;' +
      '--duration:' + duration + 's;' +
      '--rotate:' + rand(-15, 15) + 'deg;' +
      '--scale:' + rand(0.7, 1.3) + ';';
    balloonsContainer.appendChild(balloon);
    setTimeout(function() { balloon.remove(); }, duration * 1000 + 500);
  }, 600);
}

function launchConfetti(count) {
  for (var i = 0; i < count; i++) {
    var confetti = document.createElement('div');
    var shape = pickRandom(['circle', 'square', 'strip']);
    confetti.classList.add('confetti', shape);
    var size = rand(6, 14);
    confetti.style.cssText =
      'left:' + rand(0, 100) + '%;' +
      '--size:' + size + 'px;' +
      '--color:' + pickRandom(confettiColors) + ';' +
      '--duration:' + rand(2.5, 5) + 's;' +
      '--delay:' + rand(0, 1.5) + 's;' +
      '--spin:' + rand(360, 1080) + 'deg;' +
      '--drift:' + rand(-80, 80) + 'px;';
    confettiContainer.appendChild(confetti);
    (function(el) {
      setTimeout(function() { el.remove(); }, 7000);
    })(confetti);
  }
}

function launchLightConfetti() {
  if (lightConfettiInterval) return;
  lightConfettiInterval = setInterval(function() {
    launchConfetti(5);
  }, 1500);
}

function launchStreamers(count) {
  for (var i = 0; i < count; i++) {
    var streamer = document.createElement('div');
    streamer.classList.add('streamer');
    streamer.style.cssText =
      'left:' + rand(5, 95) + '%;' +
      'background:' + pickRandom(streamerColors) + ';' +
      '--duration:' + rand(3, 6) + 's;' +
      '--delay:' + rand(0, 2) + 's;' +
      '--height:' + rand(60, 120) + 'px;' +
      '--twist:' + rand(-20, 20) + 'deg;';
    streamersContainer.appendChild(streamer);
    (function(el) {
      setTimeout(function() { el.remove(); }, 8000);
    })(streamer);
  }
}

function startSparkles() {
  if (sparkleInterval) return;
  var sparkleEmojis = ['✨', '⭐', '🌟', '💫', '✦'];
  sparkleInterval = setInterval(function() {
    var sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.textContent = pickRandom(sparkleEmojis);
    sparkle.style.cssText =
      'left:' + rand(5, 95) + '%;' +
      'top:' + rand(10, 85) + '%;' +
      '--duration:' + rand(1.5, 3) + 's;';
    document.body.appendChild(sparkle);
    setTimeout(function() { sparkle.remove(); }, 3500);
  }, 400);
}

// ============================================
// SCENE 4: Play Music
// ============================================
function playMusic() {
  btnMusic.classList.add('hidden');

  // Start background music
  if (!musicPlaying) {
    bgMusic.volume = 0.4;
    bgMusic.play().catch(function() {
      // Silent catch for autoplay policies
    });
    musicPlaying = true;
  }

  // Continuous balloons and light confetti
  launchContinuousBalloons();
  launchLightConfetti();

  // Show next button after a moment
  setTimeout(function() {
    btnCake.classList.remove('hidden');
    btnCake.classList.add('glow-pulse');
  }, 2500);
}

// ============================================
// SCENE 5: Cake Entrance
// ============================================
function showCake() {
  btnCake.classList.add('hidden');

  // Show cake with slide-up animation
  cakeWrapper.classList.add('visible');

  // Show next button after cake appears
  setTimeout(function() {
    btnCandles.classList.remove('hidden');
    btnCandles.classList.add('glow-pulse');
  }, 2500);
}

// ============================================
// SCENE 6: Light Candles + Heart Balloon
// ============================================
function lightCandles() {
  btnCandles.classList.add('hidden');

  var flames = candlesRow.querySelectorAll('.flame');

  // Light each candle one by one
  flames.forEach(function(flame, i) {
    setTimeout(function() {
      flame.classList.add('lit');
      // Spawn fire particles
      spawnFireParticles(flame, 8);
    }, i * 600);
  });

  // Warm glow on cake
  setTimeout(function() {
    cakeWrapper.classList.add('glow');
  }, flames.length * 600);

  // Heart balloon rises
  setTimeout(function() {
    heartBalloon.classList.add('visible');
  }, flames.length * 600 + 500);

  // Show next button
  setTimeout(function() {
    btnMessage.classList.remove('hidden');
    btnMessage.classList.add('glow-pulse');
  }, flames.length * 600 + 3000);
}

function spawnFireParticles(flameEl, count) {
  var rect = flameEl.getBoundingClientRect();
  for (var i = 0; i < count; i++) {
    (function(idx) {
      setTimeout(function() {
        var particle = document.createElement('div');
        particle.classList.add('fire-particle');
        particle.style.cssText =
          'left:' + (rect.left + rand(-5, 15)) + 'px;' +
          'top:' + (rect.top + rand(-5, 5)) + 'px;' +
          '--drift:' + rand(-15, 15) + 'px;' +
          'background:' + pickRandom(['#ffd700', '#ff8c00', '#ff4500', '#ffcc00']) + ';';
        document.body.appendChild(particle);
        setTimeout(function() { particle.remove(); }, 1600);
      }, idx * 80);
    })(i);
  }
}

// ============================================
// SCENE 7: Birthday Message
// ============================================
function showMessage() {
  btnMessage.classList.add('hidden');

  // Show message card
  messageCard.classList.add('visible');

  // Reveal lines one by one
  var lines = messageCard.querySelectorAll('.msg-line');
  lines.forEach(function(line) {
    var delay = parseInt(line.dataset.delay, 10);
    setTimeout(function() {
      line.classList.add('show');
    }, delay + 800);
  });

  // Trigger grand finale after the last message
  var lastDelay = parseInt(lines[lines.length - 1].dataset.delay, 10);
  setTimeout(function() {
    triggerGrandFinale();
  }, lastDelay + 4000);
}

// ============================================
// GRAND FINALE
// ============================================
function triggerGrandFinale() {
  // Transition background
  bgOverlay.classList.add('celebration');

  // Hide message card slowly
  messageCard.style.transition = 'transform 1.5s ease, opacity 1.5s ease';
  messageCard.style.opacity = '0';
  setTimeout(function() {
    messageCard.classList.remove('visible');
    messageCard.style.opacity = '';
    messageCard.style.transition = '';
  }, 1600);

  // Fade cake and heart
  cakeWrapper.style.transition = 'bottom 2s ease, opacity 2s ease';
  cakeWrapper.style.opacity = '0.3';
  heartBalloon.style.transition = 'bottom 2s ease, opacity 2s ease';
  heartBalloon.style.opacity = '0.3';

  // Show finale scene
  var finaleScene = $('scene-finale');
  setTimeout(function() {
    finaleScene.classList.add('active');
  }, 1000);

  // Massive confetti blast
  launchConfetti(200);
  setTimeout(function() { launchConfetti(150); }, 1000);
  setTimeout(function() { launchConfetti(100); }, 2500);

  // Tons of balloons
  launchBalloons(40);
  setTimeout(function() { launchBalloons(30); }, 1500);

  // Fireworks
  launchFireworks(8);
  setTimeout(function() { launchFireworks(6); }, 2000);
  setTimeout(function() { launchFireworks(8); }, 4000);
  setTimeout(function() { launchFireworks(5); }, 6000);

  // Continuous fireworks
  var fireworkInterval = setInterval(function() {
    launchFireworks(randInt(2, 5));
  }, 3000);

  // Blink the decorative lights
  blinkLights();

  // Extra sparkles
  var extraSparkleInterval = setInterval(function() {
    for (var i = 0; i < 3; i++) {
      var sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.textContent = pickRandom(['✨', '⭐', '🌟', '💫', '🎉', '🎊', '❤️', '💖']);
      sparkle.style.cssText =
        'left:' + rand(5, 95) + '%;' +
        'top:' + rand(10, 85) + '%;' +
        '--duration:' + rand(1.5, 3) + 's;' +
        'font-size:' + rand(1, 2.5) + 'rem;';
      document.body.appendChild(sparkle);
      (function(el) {
        setTimeout(function() { el.remove(); }, 3500);
      })(sparkle);
    }
  }, 300);

  // Clean up some intervals after 30 seconds for performance
  setTimeout(function() {
    clearInterval(fireworkInterval);
    clearInterval(extraSparkleInterval);
  }, 30000);
}

// ============================================
// FIREWORKS
// ============================================
function launchFireworks(count) {
  for (var i = 0; i < count; i++) {
    (function(idx) {
      setTimeout(function() {
        createFirework(rand(10, 90), rand(10, 50));
      }, idx * 400);
    })(i);
  }
}

function createFirework(x, y) {
  var color = pickRandom(confettiColors);
  var particleCount = randInt(20, 40);
  var container = fireworksContainer;

  // Trail going up
  var trailCount = randInt(5, 10);
  for (var t = 0; t < trailCount; t++) {
    (function(tt) {
      var trail = document.createElement('div');
      trail.classList.add('firework-trail');
      trail.style.cssText =
        'left:' + x + '%;' +
        'top:' + (100 - y) + '%;' +
        '--duration:' + rand(0.3, 0.6) + 's;' +
        '--rise:-' + rand(30, 80) + 'px;' +
        'background:' + color + ';' +
        'box-shadow:0 0 4px ' + color + ';' +
        'animation-delay:' + (tt * 0.05) + 's;';
      container.appendChild(trail);
      setTimeout(function() { trail.remove(); }, 1000);
    })(t);
  }

  // Burst
  setTimeout(function() {
    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement('div');
      particle.classList.add('firework-particle');
      var angle = (i / particleCount) * Math.PI * 2;
      var distance = rand(40, 120);
      var tx = Math.cos(angle) * distance;
      var ty = Math.sin(angle) * distance;

      particle.style.cssText =
        'left:' + x + '%;' +
        'top:' + (100 - y) + '%;' +
        '--tx:' + tx + 'px;' +
        '--ty:' + ty + 'px;' +
        '--duration:' + rand(0.6, 1.2) + 's;' +
        'background:' + color + ';' +
        'box-shadow:0 0 6px ' + color + ',0 0 12px ' + color + '88;';
      container.appendChild(particle);
      (function(el) {
        setTimeout(function() { el.remove(); }, 1500);
      })(particle);
    }
  }, 350);
}

// ============================================
// BLINKING LIGHTS
// ============================================
function blinkLights() {
  var bulbs = document.querySelectorAll('.bulb-item');
  var blinkCount = 0;
  var maxBlinks = 20;

  var interval = setInterval(function() {
    if (blinkCount >= maxBlinks) {
      clearInterval(interval);
      bulbs.forEach(function(b) { b.classList.add('lit'); });
      return;
    }
    bulbs.forEach(function(bulb) {
      if (Math.random() > 0.5) {
        bulb.style.opacity = '0.3';
        setTimeout(function() {
          bulb.style.opacity = '1';
        }, 200);
      }
    });
    blinkCount++;
  }, 400);
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
var resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    if (lightsWire.classList.contains('visible')) {
      generateBulbs();
      setTimeout(function() {
        document.querySelectorAll('.bulb-item').forEach(function(b) { b.classList.add('lit'); });
      }, 100);
    }
  }, 300);
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('loaded');
});
