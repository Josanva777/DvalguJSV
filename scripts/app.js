// SISTEMA DE PRESENTACIÓN FUTURISTA - CERO51
// Desarrollado por JSV

class FuturisticPresentation {
  constructor() {
    this.currentSlideIndex = 0;
    this.totalSlides = 0;
    this.isTransitioning = false;
    this.particlesArray = [];
    this.loadingProgress = 0;

    this.init();
  }

  async init() {
    // Mostrar loader y simular carga
    await this.showLoader();

    // Inicializar elementos
    this.initializeElements();

    // Configurar sistemas
    this.setupParticles();
    this.setupEventListeners();
    this.setupKeyboardControls();
    this.setupProgressIndicators();
    this.setupTimelineNavigation();
    this.setupIntersectionObserver();
    this.setupModals();

    // Configuración inicial
    this.updateInterface();
    this.preloadImages();

    // Ocultar loader
    this.hideLoader();

    console.log("🚀 Presentación futurista CERO51 iniciada");
  }

  initializeElements() {
    // Elementos principales
    this.container = document.querySelector(".presentation-container");
    this.slides = document.querySelectorAll(".slide");
    this.prevButton = document.getElementById("prev-btn");
    this.nextButton = document.getElementById("next-btn");

    // Elementos de interfaz
    this.currentPageSpan = document.getElementById("current-page");
    this.totalPagesSpan = document.getElementById("total-pages");
    this.progressDots = document.getElementById("progress-dots");
    this.timelineDots = document.getElementById("timeline-dots");
    this.particlesContainer = document.getElementById("particles");

    // Elementos de modal
    this.hotspots = document.querySelectorAll(".hotspot");
    this.modals = document.querySelectorAll(".modal-overlay");
    this.closeButtons = document.querySelectorAll(".modal-close");

    // NOTA: Se actualizará a 10 slides
    this.totalSlides = this.slides.length; 
    this.totalPagesSpan.textContent =
      this.totalSlides < 10 ? "0" + this.totalSlides : this.totalSlides;
  }

  // === SISTEMA DE LOADING ===
  async showLoader() {
    const loader = document.getElementById("loader");
    const progressFill = document.getElementById("progress-fill");

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        this.loadingProgress += Math.random() * 15;

        if (this.loadingProgress >= 100) {
          this.loadingProgress = 100;
          progressFill.style.width = "100%";

          setTimeout(() => {
            clearInterval(interval);
            resolve();
          }, 500);
        } else {
          progressFill.style.width = this.loadingProgress + "%";
        }
      }, 100);
    });
  }

  hideLoader() {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  }

  // === SISTEMA DE PARTÍCULAS OPTIMIZADO ===
  setupParticles() {
    this.createParticles();
  }

  createParticles() {
    const particleCount = 25; // Reducido para mejor performance

    for (let i = 0; i < particleCount; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Propiedades optimizadas
    const size = Math.random() * 3 + 1;
    const startX = Math.random() * window.innerWidth;
    const animationDuration = Math.random() * 8 + 8; // Más rápido
    const opacity = Math.random() * 0.3 + 0.1; // Menos opacidad

    particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${startX}px;
                opacity: ${opacity};
                animation-duration: ${animationDuration}s;
                animation-delay: ${Math.random() * 3}s;
            `;

    this.particlesContainer.appendChild(particle);
    this.particlesArray.push(particle);

    // Recrear partícula cuando termine la animación
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
        this.createParticle();
      }
    }, (animationDuration + 1) * 1000);
  }

  // === NAVEGACIÓN OPTIMIZADA ===
  goToSlide(index, direction = "auto") {
    if (index < 0 || index >= this.totalSlides || this.isTransitioning) {
      return;
    }

    this.isTransitioning = true;

    // Scroll suave y rápido
    this.slides[index].scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });

    // Resetear estado más rápido
    setTimeout(() => {
      this.isTransitioning = false;
    }, 200);

    this.currentSlideIndex = index;
    this.updateInterface();
  }

  // === CONTROLES DE TECLADO ===
  setupKeyboardControls() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          this.nextSlide();
          break;
        case "ArrowLeft":
          e.preventDefault();
          this.prevSlide();
          break;
        case "Escape":
          e.preventDefault();
          this.closeAllModals();
          break;
        case "Home":
          e.preventDefault();
          this.goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          this.goToSlide(this.totalSlides - 1);
          break;
        default:
          // Números para ir a slide específico
          if (e.key >= "1" && e.key <= "9") {
            const slideIndex = parseInt(e.key) - 1;
            if (slideIndex < this.totalSlides) {
              this.goToSlide(slideIndex);
            }
          }
      }
    });
  }

  nextSlide() {
    if (this.currentSlideIndex < this.totalSlides - 1) {
      this.goToSlide(this.currentSlideIndex + 1, "next");
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.goToSlide(this.currentSlideIndex - 1, "prev");
    }
  }

  // === INDICADORES DE PROGRESO ===
  setupProgressIndicators() {
    // Crear dots de progreso
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = "progress-dot";
      dot.addEventListener("click", () => this.goToSlide(i));
      this.progressDots.appendChild(dot);
    }
  }

  // === TIMELINE NAVIGATION ===
  setupTimelineNavigation() {
    // NOMBRES AJUSTADOS para 10 slides: Concepto y Mujeres se movieron.
    const slideNames = [
      "Portada",
      "Concepto",
      "Mujeres",
      "Prendas",
      "Etiqueta",
      "Empaque", // Contiene los Hotspots
      "Montaje",
      "Proveedores",
      "Estrategia",
      "Redes",
    ];

    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = "timeline-dot";
      dot.dataset.slide = slideNames[i] || `Slide ${i + 1}`;
      dot.addEventListener("click", () => this.goToSlide(i));
      this.timelineDots.appendChild(dot);
    }
  }

  // === ACTUALIZACIÓN DE INTERFAZ ===
  updateInterface() {
    // Actualizar contador
    const pageNumber = this.currentSlideIndex + 1;
    this.currentPageSpan.textContent =
      pageNumber < 10 ? "0" + pageNumber : pageNumber;

    // Actualizar botones
    this.prevButton.disabled = this.currentSlideIndex === 0;
    this.nextButton.disabled = this.currentSlideIndex === this.totalSlides - 1;

    // Actualizar dots de progreso
    const progressDots = this.progressDots.querySelectorAll(".progress-dot");
    progressDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlideIndex);
    });

    // Actualizar timeline
    const timelineDots = this.timelineDots.querySelectorAll(".timeline-dot");
    timelineDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlideIndex);
    });
  }

  // === EVENT LISTENERS ===
  setupEventListeners() {
    this.prevButton.addEventListener("click", () => this.prevSlide());
    this.nextButton.addEventListener("click", () => this.nextSlide());

    // Gestos táctiles mejorados
    let startX = 0;
    let startY = 0;

    this.container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    this.container.addEventListener("touchend", (e) => {
      if (!startX || !startY) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const diffX = startX - endX;
      const diffY = startY - endY;

      // Solo procesar si el movimiento horizontal es mayor que el vertical
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) {
          // Mínimo 50px de deslizamiento
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }
      }

      startX = 0;
      startY = 0;
    });
  }

  // === INTERSECTION OBSERVER OPTIMIZADO ===
  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            entry.target.classList.add("active");
            const visibleSlideIndex = parseInt(
              entry.target.dataset.slideIndex,
              10
            );
            this.currentSlideIndex = visibleSlideIndex;
            this.updateInterface();
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      {
        root: this.container,
        threshold: 0.5,
      }
    );

    this.slides.forEach((slide) => {
      observer.observe(slide);
    });
  }

  // === SISTEMA DE MODALES OPTIMIZADO ===
  setupModals() {
    this.hotspots.forEach((hotspot) => {
      hotspot.addEventListener("click", (e) => {
        e.stopPropagation();
        const modalId = hotspot.dataset.modalTarget;
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add("active");
        }
      });
    });

    this.closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".modal-overlay").classList.remove("active");
      });
    });

    this.modals.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });
    });
  }

  closeAllModals() {
    this.modals.forEach((modal) => {
      modal.classList.remove("active");
    });
  }

  // === PRELOAD DE IMÁGENES ===
  preloadImages() {
    // Preload de todas las imágenes usadas como fondo
    const imageUrls = [
      "../assets/images/PORTADA.jpg",
      "../assets/images/CONCEPTO.jpg",
      "../assets/images/MUJERES.jpg",
      "../assets/images/PRENDAS-GIF.gif",
      "../assets/images/ETIQUETA.jpg",
      "../assets/images/EMPAQUE.jpg",
      "../assets/images/MONTAJETUBOS.jpg",
      "../assets/images/PROVEEDORES.jpg",
      "../assets/images/ESTRATEGIA.jpg",
      "../assets/images/REDES.jpg",
    ];

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  // === OPTIMIZACIÓN DE PERFORMANCE ===
  optimizePerformance() {
    // Throttle para eventos costosos
    const throttle = (func, limit) => {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    // Throttle para resize
    window.addEventListener(
      "resize",
      throttle(() => {
        this.updateInterface();
      }, 250)
    );

    // Optimizar particles en móviles
    if (window.innerWidth < 768) {
      this.particlesArray.forEach((particle) => {
        if (particle.parentNode) {
          particle.style.display = "none";
        }
      });
    }
  }
}

// === INICIALIZACIÓN ===
document.addEventListener("DOMContentLoaded", () => {
  new FuturisticPresentation();
});