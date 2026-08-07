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
