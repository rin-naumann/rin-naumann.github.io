/* ==========================================================
   1. VANTA.JS BACKGROUND
   VANTA.NET() attaches the animated effect to the element with
   id "vanta-bg". Every option below is safe to tweak:
     - color / color2   → line colors (try swapping in --accent-moss too)
     - backgroundColor  → should match --bg-void in style.css
     - points           → how many nodes (higher = denser, slower)
     - maxDistance      → how far apart nodes can still connect
     - spacing          → how spread out nodes are

   Other effects to try instead of NET: WAVES, HALO, RINGS, CELLS,
   TRUNK, TOPOLOGY. Swap the <script> tag in index.html to the
   matching vanta.*.min.js file, then change VANTA.NET to e.g.
   VANTA.WAVES here. Full docs: https://www.vantajs.com/
   ========================================================== */
VANTA.NET({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x9dd29b,           // sage green lines
  color2: 0x00ff00,          // bright green lines (blended with color)
  backgroundColor: 0x2f342f, // dark green background
  points: 10.00,             // how many nodes
  maxDistance: 20.00,        // how far apart nodes can still connect
  spacing: 15.00             // how spread out nodes are
});

/* ==========================================================
   2. TAB SWITCHING
   How it works:
   - Every button in .tabs has a data-tab="id" attribute.
   - Every content section has a matching id + class "tab-panel".
   - On click: remove "is-active" from all buttons/panels, then
     add it back only to the clicked button and its matching panel.

   TO ADD A NEW TAB YOURSELF:
   1. In index.html, add a new <button class="tab-btn" data-tab="mytab">
      inside <nav class="tabs">.
   2. Add a new <section id="mytab" class="tab-panel"> with your content.
   3. Done — this script automatically picks it up, no JS edits needed.
   ========================================================== */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-tab");

    tabButtons.forEach((btn) => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    });
    tabPanels.forEach((panel) => panel.classList.remove("is-active"));

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
    document.getElementById(targetId).classList.add("is-active");
  });
});

/* ==========================================================
   4. LIGHTBOX (illustration gallery + video)
   Clicking a thumbnail fills the hidden #lightbox overlay with
   either an image or a video and adds "is-open" (see style.css
   section 9, which is what actually makes it appear + darkens
   the page). It closes on: clicking the ✕, clicking the dark
   backdrop itself (NOT the media), or pressing Escape.

   TO USE ON A DIFFERENT IMAGE:
   Add the "gallery-card" (or "lightbox-card") class to any card,
   and give its <img> a data-full="path/to/bigger-image.jpg"
   attribute pointing at a higher-resolution version. Skipping
   data-full just falls back to the thumbnail's own src.

   TO USE ON A VIDEO INSTEAD (see the Animation Project card):
   1. Give the <article> the "lightbox-card" class, same as above.
   2. Add data-video="path/to/clip.mp4" to the thumbnail element.
      Its presence is what tells this script to open the video player
      instead of the image viewer — you don't need to touch this file
      to add more video cards.
   3. The thumbnail itself can be either:
      a) an <img> (a static poster frame) — clicking it plays the full
         video only inside the lightbox, or
      b) a <video autoplay muted loop playsinline> — this makes it
         preview/loop quietly right in the grid, AND still opens the
         full version (with sound, via the same data-video attribute)
         in the lightbox when clicked. This is what Animation Project
         uses.
   4. (Optional) Wrap the thumbnail in a <div class="thumb-wrap"> with
      a sibling <span class="play-badge">▶</span> or ⛶ right after it,
      for a hover hint — see style.css section 9.
   ========================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxVideo = document.getElementById("lightbox-video");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxCards = document.querySelectorAll(".gallery-card, .lightbox-card");

function openLightbox(card) {
  const thumb = card.querySelector(".card-thumb");
  const title = card.querySelector("h3")?.textContent.trim() || "";
  const videoSrc = thumb.dataset.video;

  if (videoSrc) {
    // VIDEO MODE: hide the image element, show + load + play the video
    lightboxImg.style.display = "none";
    lightboxVideo.style.display = "block";
    lightboxVideo.src = videoSrc;
    lightboxVideo.play();
  } else {
    // IMAGE MODE: hide the video element, show the image
    lightboxVideo.style.display = "none";
    lightboxImg.style.display = "block";
    lightboxImg.src = thumb.dataset.full || thumb.src;
    lightboxImg.alt = thumb.alt;
  }

  lightboxCaption.textContent = title;
  lightbox.classList.add("is-open");
  document.body.style.overflow = "hidden"; // stop background scrolling while open
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.body.style.overflow = "";

  // stop playback and unload the video so it doesn't keep running
  // (or downloading) silently behind the closed overlay
  lightboxVideo.pause();
  lightboxVideo.removeAttribute("src");
  lightboxVideo.load();
}

lightboxCards.forEach((card) => {
  card.addEventListener("click", () => openLightbox(card));
});

lightboxClose.addEventListener("click", closeLightbox);

// clicking the dark backdrop (but not the media/caption itself) closes it
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

// Escape key closes it too
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

/* ==========================================================
   5. FOOTER YEAR
   Keeps the copyright year current without editing HTML yearly.
   ========================================================== */
document.getElementById("year").textContent = new Date().getFullYear();