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

  function openFlowerModal(){
    if (!flowerModal) return;
    flowerModal.setAttribute('aria-hidden','false');
  }
  function closeFlowerModal(){
    if (!flowerModal) return;
    flowerModal.setAttribute('aria-hidden','true');
  }

  if (noteTrigger){
    noteTrigger.addEventListener('click', function(){
      openFlowerModal();
    });
    noteTrigger.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFlowerModal();
      }
    });
  }

  var frameCard = document.getElementById('frameCard');
  var galleryScreen = document.getElementById('galleryScreen');
  var returnButton = document.getElementById('returnButton');
  var galleryBoard = document.getElementById('galleryBoard');
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

  function renderGalleryCards(){
    if (!galleryBoard) return;
    galleryBoard.innerHTML = '';
    galleryImages.forEach(function(src, index){
      var card = document.createElement('div');
      card.className = 'gallery-card';
      var cardsPerRow = 3;
      var row = Math.floor(index / cardsPerRow);
      var baseLeft = 8 + (index % cardsPerRow) * 30;
      var jitterLeft = Math.random() * 20 - 10;
      var left = Math.max(4, Math.min(80, baseLeft + jitterLeft)) + '%';
      var baseTop = 8 + row * 28;
      var jitterTop = Math.random() * 18 - 9;
      var top = Math.max(4, Math.min(160, baseTop + jitterTop)) + '%';
      var rotate = (Math.random() * 24 - 12) + 'deg';
      card.style.left = left;
      card.style.top = top;
      card.style.setProperty('--card-rotate', rotate);
      card.style.zIndex = 10 + (index % 5);
      card.style.animationDelay = (Math.random() * 1.5) + 's';
      card.style.animationDuration = (5 + Math.random() * 4) + 's';
      var image = document.createElement('img');
      image.src = src;
      image.alt = 'gallery photo ' + (index + 1);
      image.className = 'gallery-photo';
      card.appendChild(image);
      galleryBoard.appendChild(card);
    });
  }

  function openGalleryScreen(){
    if (!galleryScreen) return;
    nextScreen.classList.remove('is-active');
    nextScreen.setAttribute('aria-hidden', 'true');
    galleryScreen.classList.add('is-active');
    galleryScreen.setAttribute('aria-hidden', 'false');
    renderGalleryCards();
  }
  function closeGalleryScreen(){
    if (!galleryScreen) return;
    galleryScreen.classList.remove('is-active');
    galleryScreen.setAttribute('aria-hidden', 'true');
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
