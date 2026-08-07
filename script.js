(function(){
  "use strict";

  var CODE = "0807";
  var entered = "";

  var slots = document.querySelectorAll(".digit-slot");
  var keys = document.querySelectorAll(".key");
  var errorMsg = document.getElementById("errorMsg");
  var thoughtBubble = document.getElementById("thoughtBubble");
  var lockScreen = document.getElementById("lockScreen");
  var revealOverlay = document.getElementById("revealOverlay");
  var confettiLayer = document.getElementById("confettiLayer");
  var nextScreen = document.getElementById("nextScreen");

  /* ---------- hint bubble toggle ---------- */
  thoughtBubble.addEventListener("click", function(){
    var isOpen = thoughtBubble.classList.toggle("is-open");
    thoughtBubble.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  /* ---------- keypad ---------- */
  function renderSlots(){
    slots.forEach(function(slot, i){
      if (i < entered.length){
        slot.textContent = entered[i];
        slot.classList.add("filled");
      } else {
        slot.textContent = "";
        slot.classList.remove("filled");
      }
    });
  }

  function showError(){
    errorMsg.classList.add("show");
    slots.forEach(function(slot){ slot.classList.add("shake"); });
    setTimeout(function(){
      slots.forEach(function(slot){ slot.classList.remove("shake"); });
    }, 450);
    setTimeout(function(){
      entered = "";
      renderSlots();
      errorMsg.classList.remove("show");
    }, 700);
  }

  function checkCode(){
    if (entered === CODE){
      startReveal();
    } else {
      showError();
    }
  }

  keys.forEach(function(key){
    key.addEventListener("click", function(){
      var value = key.getAttribute("data-key");

      if (value === "clear"){
        entered = "";
        renderSlots();
        return;
      }
      if (value === "del"){
        entered = entered.slice(0, -1);
        renderSlots();
        return;
      }
      if (entered.length >= 4) return;

      entered += value;
      renderSlots();

      if (entered.length === 4){
        setTimeout(checkCode, 150);
      }
    });
  });

  /* also allow physical keyboard */
  document.addEventListener("keydown", function(e){
    if (revealOverlay.classList.contains("is-active")) return;
    if (/^[0-9]$/.test(e.key) && entered.length < 4){
      entered += e.key;
      renderSlots();
      if (entered.length === 4) setTimeout(checkCode, 150);
    } else if (e.key === "Backspace"){
      entered = entered.slice(0, -1);
      renderSlots();
    } else if (e.key === "Escape"){
      entered = "";
      renderSlots();
    }
  });

  /* ---------- confetti ---------- */
  function spawnConfetti(){
    var colors = ["#FFFFFF", "#FFD9E8", "#C9EAFA", "#FFF6C9", "#7FC8E8"];
    var count = 60;
    confettiLayer.innerHTML = "";
    for (var i = 0; i < count; i++){
      var piece = document.createElement("div");
      piece.className = "confetti-piece";
      var size = 6 + Math.random() * 8;
      piece.style.width = size + "px";
      piece.style.height = (size * 0.4) + "px";
      piece.style.left = (Math.random() * 100) + "%";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2.2 + Math.random() * 1.6) + "s";
      piece.style.animationDelay = (Math.random() * 0.6) + "s";
      confettiLayer.appendChild(piece);
    }
  }

  /* ---------- reveal sequence ---------- */
  function startReveal(){
    lockScreen.classList.add("is-leaving");

    setTimeout(function(){
      spawnConfetti();
      revealOverlay.classList.add("is-active");
      revealOverlay.setAttribute("aria-hidden", "false");
    }, 500);

    // move to "next page" placeholder after the birthday moment plays
    setTimeout(function(){
      lockScreen.style.display = "none";
      revealOverlay.classList.remove("is-active");
      nextScreen.classList.add("is-active");
      nextScreen.setAttribute("aria-hidden", "false");
    }, 3600);
  }

  renderSlots();
  
  // ---------- flower modal (opened from kitty image) ----------
  var noteTrigger = document.getElementById('noteTrigger');
  var flowerModal = document.getElementById('flowerModal');
  var flowerClose = document.getElementById('flowerClose');
  var happyBirthdayCtx = null;

  function openFlowerModal(){
    if (!flowerModal) return;
    flowerModal.setAttribute('aria-hidden','false');
  }
  function closeFlowerModal(){
    if (!flowerModal) return;
    flowerModal.setAttribute('aria-hidden','true');
    if (happyBirthdayCtx && happyBirthdayCtx.state !== 'closed'){
      happyBirthdayCtx.close();
      happyBirthdayCtx = null;
    }
  }

  if (noteTrigger){
    noteTrigger.addEventListener('click', function(){
      openFlowerModal();
      playHappyBirthdaySong();
    });
    noteTrigger.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFlowerModal();
        playHappyBirthdaySong();
      }
    });
  }

  var frameCard = document.getElementById('frameCard');
  var cakeTrigger = document.getElementById('cakeTrigger');
  var galleryScreen = document.getElementById('galleryScreen');
  var returnButton = document.getElementById('returnButton');
  var cakeScreen = document.getElementById('cakeScreen');
  var cakeReturnButton = document.getElementById('cakeReturnButton');
  var cakeVideo = document.getElementById('cakeVideo');
  var cakeMessage = document.getElementById('cakeMessage');
  var backgroundMusic = document.getElementById('backgroundMusic');
  var galleryBoard = document.getElementById('galleryBoard');
  var cakeMusic = 'musics/cake.mp3';
  var frameMusic = 'musics/katseye.mp3';
  var galleryMusic = frameMusic;
  var galleryImages = [
    'images/152505dc-450c-4c1c-998c-f616b7c3de90.jpg',
    'images/18be345b-b5cd-40d3-8f70-920111a06dcb.jpg',
    'images/212ae075-37e8-4cc2-b4a5-c2028959b0e6.jpg',
    'images/530676e9-df9b-4376-8cac-57698c22d9b0.jpg',
    'images/582e6069-a8af-4100-a651-9d08d1257174.jpg',
    'images/60c1ca7e-b4ea-42e0-822d-71d018b7e929.jpg',
    'images/67d2287d-4ebe-48a9-a6df-60462eab02a7.jpg',
    'images/6f60149b-9e32-40cc-82b6-a21226b82b68.jpg',
    'images/6ffdb910-528e-4a8a-b735-0b340126c8fd.jpg',
    'images/723474da-0123-429b-8bb0-b73c614a9389.jpg',
    'images/74dfff1f-cbfb-4d83-935d-a63ff819df08.jpg',
    'images/7c2d3e0b-90f7-434f-9d2a-eb5a26928daa.jpg',
    'images/9a50127a-1d41-4722-8a8d-7175aa5202d2.jpg',
    'images/ae6f072f-67a7-4cb7-870f-9c8938e7c94f.jpg',
    'images/ae89b263-32e8-4997-bc9d-a47e800e79f6.jpg',
    'images/c1513b11-3d6e-4fdd-b1f1-895a17772d54.jpg',
    'images/e9187d48-ae86-4ed9-b94a-37dad692f2e7.jpg',
    'images/e9677e60-afa5-4660-a272-ab980ae9c736.jpg',
    'images/eab8224a-6e22-454a-9448-4e2229d25ee4.jpg',
    'images/ebc456f0-e03e-45b0-ae88-b5dc610e8bbb.jpg',
    'images/fdfb942f-702e-45a0-ba9e-87941cf1057d.jpg'
  ];

  var cakeVideos = [
    'videos/4581293f-ef79-40f5-8fb6-bf2939921429.mp4',
    'videos/ea410663-d453-46f5-b89a-2d4f7a23815c.mp4'
  ];
  var cakeQuotes = [
    'Believe in yourself, even when things don\'t go as planned. Every challenge you overcome will make you stronger and wiser.',
    'Don\'t be afraid to dream big. Great achievements always begin with the courage to take the first step.',
    'Life won\'t always be easy, but every obstacle you face is preparing you for something greater. Keep going no matter what.',
    'Success doesn\'t happen overnight. Stay patient, work hard, and trust that your efforts will pay off in time.',
    'Never compare your journey to someone else\'s. Everyone has their own path, and your story will unfold at the right time.',
    'Don\'t let failure define you. Instead, let it teach you, motivate you, and help you become a better version of yourself.',
    'Always stay true to who you are. The right people will appreciate you for your genuine heart and authentic self.',
    'Keep learning, keep growing, and never stop improving. The more knowledge and experience you gain, the closer you\'ll get to your goals.',
    'There will be days when you feel like giving up, but remember why you started. Your future is worth fighting for.',
    'Choose kindness whenever you can. A simple act of kindness can make a difference in someone\'s life and yours.',
    'Celebrate every small victory. Even the smallest progress is proof that you\'re moving closer to your dreams.',
    'Be grateful for every opportunity that comes your way. Each experience, whether good or bad, has something valuable to teach you.',
    'Don\'t let fear make your decisions. Have the courage to step outside your comfort zone because that\'s where growth begins.',
    'Stay focused on your goals, but don\'t forget to enjoy the journey. The memories you make along the way are just as important as the destination.',
    'Believe that you are capable of amazing things. Your potential is greater than you realize, and your future is full of possibilities.',
    'Surround yourself with people who encourage you to grow, support your dreams, and inspire you to become your best self.',
    'Keep your faith, stay hopeful, and never lose sight of your dreams. Even the longest journeys begin with one determined step.',
    'Don\'t be discouraged by setbacks. Sometimes the hardest roads lead to the most beautiful destinations.',
    'Remember that success isn\'t just about achievements—it\'s also about becoming a kind, humble, and resilient person along the way.',
    'As you begin this new chapter of adulthood, never stop believing in yourself. Keep chasing your dreams, embrace every opportunity, and trust that your hard work will lead you to the future you\'ve always imagined.'
  ];

  function pickRandomItem(items){
    return items[Math.floor(Math.random() * items.length)];
  }

  function playHappyBirthdaySong(){
    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (happyBirthdayCtx && happyBirthdayCtx.state !== 'closed'){
      happyBirthdayCtx.close();
    }
    happyBirthdayCtx = new AudioCtx();
    var ctx = happyBirthdayCtx;
    var now = ctx.currentTime;
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.5, now + 0.05);
    gain.connect(ctx.destination);
    var osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.connect(gain);

    var notes = [
      392, 440, 392, 523, 494,
      392, 440, 392, 587, 523,
      392, 784, 659, 523, 494, 440,
      698, 698, 659, 523, 587, 523
    ];
    var durations = [0.35, 0.35, 0.7, 0.35, 0.75,
                     0.35, 0.35, 0.7, 0.35, 0.85,
                     0.35, 0.35, 0.35, 0.35, 0.75, 0.9,
                     0.35, 0.35, 0.35, 0.35, 0.75, 1.2];
    var time = now;
    osc.start(time);
    for (var i = 0; i < notes.length; i++){
      osc.frequency.setValueAtTime(notes[i], time);
      time += durations[i];
    }
    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
    osc.stop(time + 0.25);
    setTimeout(function(){ if (ctx.state !== 'closed') ctx.close(); happyBirthdayCtx = null; }, (time - now + 0.4) * 1000);
  }

  function renderGalleryCards(){
    if (!galleryBoard) return;
    galleryBoard.innerHTML = '';
    var boardRect = galleryBoard.getBoundingClientRect();
    var cardWidth = boardRect.width < 860 ? 160 : 200;
    var cardHeight = boardRect.width < 860 ? 210 : 260;
    var cardsPerRow = boardRect.width < 720 ? 2 : boardRect.width < 980 ? 3 : 4;
    var safeLeftMax = Math.max(0, 100 - (cardWidth / boardRect.width) * 100 - 4);
    var safeTopMax = Math.max(0, 100 - (cardHeight / boardRect.height) * 100 - 4);

    galleryImages.forEach(function(src, index){
      var card = document.createElement('div');
      card.className = 'gallery-card';
      var alpha = index / galleryImages.length;
      var left = 4 + Math.random() * (safeLeftMax - 4);
      var top = 4 + Math.random() * (safeTopMax - 4);
      // clamp positions to stay inside the board
      left = Math.max(2, Math.min(left, 96));
      top = Math.max(2, Math.min(top, 96));
      card.style.left = left + '%';
      card.style.top = top + '%';
      var rotate = (Math.random() * 24 - 12) + 'deg';
      card.style.setProperty('--card-rotate', rotate);
      // ensure a unique stacking order so cards don't all collapse under one image
      card.style.zIndex = 1000 + index;
      card.style.animationDelay = (Math.random() * 1.5) + 's';
      card.style.animationDuration = (5 + Math.random() * 3) + 's';
      var image = document.createElement('img');
      image.src = src;
      image.addEventListener('error', function(){
        console.warn('Gallery image failed to load, replacing with placeholder:', src);
        this.src = 'images/family.jpg';
      });
      image.alt = 'gallery photo ' + (index + 1);
      image.className = 'gallery-photo';
      card.appendChild(image);
      galleryBoard.appendChild(card);
    });
  }

  function playBackgroundMusic(src){
    if (!backgroundMusic) return;
    if (!backgroundMusic.src || backgroundMusic.src.indexOf(src) === -1){
      backgroundMusic.src = src;
      backgroundMusic.load();
    }
    backgroundMusic.volume = 0.8;
    backgroundMusic.play().catch(function(error){
      console.warn('Background music play prevented:', error);
    });
  }

  function openGalleryScreen(){
    if (!galleryScreen) return;
    nextScreen.classList.remove('is-active');
    nextScreen.setAttribute('aria-hidden', 'true');
    galleryScreen.classList.add('is-active');
    galleryScreen.setAttribute('aria-hidden', 'false');
    renderGalleryCards();
    playBackgroundMusic(galleryMusic);
  }
  function closeGalleryScreen(){
    if (!galleryScreen) return;
    galleryScreen.classList.remove('is-active');
    galleryScreen.setAttribute('aria-hidden', 'true');
    if (backgroundMusic){
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      backgroundMusic.src = '';
      backgroundMusic.load();
    }
    nextScreen.classList.add('is-active');
    nextScreen.setAttribute('aria-hidden', 'false');
  }

  function openCakeScreen(){
    if (!cakeScreen) return;
    nextScreen.classList.remove('is-active');
    nextScreen.setAttribute('aria-hidden', 'true');
    cakeScreen.classList.add('is-active');
    cakeScreen.setAttribute('aria-hidden', 'false');

    if (cakeVideo){
      cakeVideo.src = pickRandomItem(cakeVideos);
      cakeVideo.load();
      cakeVideo.play().catch(function(){});
    }
    if (backgroundMusic){
      playBackgroundMusic(cakeMusic);
    }
    if (cakeMessage){
      cakeMessage.textContent = pickRandomItem(cakeQuotes);
    }
  }

  function closeCakeScreen(){
    if (!cakeScreen) return;
    cakeScreen.classList.remove('is-active');
    cakeScreen.setAttribute('aria-hidden', 'true');
    if (backgroundMusic){
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      backgroundMusic.src = '';
      backgroundMusic.load();
    }
    nextScreen.classList.add('is-active');
    nextScreen.setAttribute('aria-hidden', 'false');
  }

  if (frameCard){
    frameCard.addEventListener('click', function(){
      openGalleryScreen();
    });
    frameCard.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGalleryScreen();
      }
    });
  }

  if (returnButton){
    returnButton.addEventListener('click', function(){
      closeGalleryScreen();
    });
  }

  if (cakeTrigger){
    cakeTrigger.addEventListener('click', function(){
      openCakeScreen();
    });
    cakeTrigger.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openCakeScreen();
      }
    });
  }

  if (cakeReturnButton){
    cakeReturnButton.addEventListener('click', function(){
      closeCakeScreen();
    });
  }

  if (flowerClose){
    flowerClose.addEventListener('click', function(){ closeFlowerModal(); });
  }
  // close modal on backdrop click
  if (flowerModal){
    flowerModal.addEventListener('click', function(e){
      if (e.target === flowerModal) closeFlowerModal();
    });
  }
})();
