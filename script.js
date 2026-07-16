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
  backgroundColor: 0x2f342f,
  points: 16.00,
  maxDistance: 26.00,
  spacing: 15.00
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
   4. LIGHTBOX (illustration gallery)
   Clicking a gallery thumbnail fills the hidden #lightbox overlay
   with that image and adds "is-open" (see style.css section 9,
   which is what actually makes it appear + darkens the page).
   It closes on: clicking the ✕, clicking the dark backdrop itself
   (NOT the image), or pressing Escape.

   TO USE ON A DIFFERENT SET OF IMAGES:
   Just add the "gallery-card" class to any other card, and give its
   <img> a data-full="path/to/bigger-image.jpg" attribute pointing
   at a higher-resolution version. If you skip data-full, it falls
   back to the thumbnail's own src.
   ========================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const galleryCards = document.querySelectorAll(".gallery-card");

function openLightbox(card) {
  const img = card.querySelector(".card-thumb");
  const title = card.querySelector("h3")?.textContent.trim() || "";

  lightboxImg.src = img.dataset.full || img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = title;

  lightbox.classList.add("is-open");
  document.body.style.overflow = "hidden"; // stop background scrolling while open
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.body.style.overflow = "";
}

galleryCards.forEach((card) => {
  card.addEventListener("click", () => openLightbox(card));
});

lightboxClose.addEventListener("click", closeLightbox);

// clicking the dark backdrop (but not the image/caption itself) closes it
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