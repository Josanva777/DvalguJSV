// Espera a que todo el contenido de la página esté cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleccionamos los elementos clave
    const container = document.querySelector(".presentation-container");
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");
    
    // Elementos del contador
    const currentPageSpan = document.getElementById("current-page");
    const totalPagesSpan = document.getElementById("total-pages");
    
    // Elementos de Modal
    const hotspots = document.querySelectorAll(".hotspot");
    const modals = document.querySelectorAll(".modal-overlay");
    const closeButtons = document.querySelectorAll(".modal-close");
    
    const totalSlides = slides.length;
    let currentSlideIndex = 0; 
    
    // Configurar el total de páginas
    totalPagesSpan.textContent = totalSlides < 10 ? '0' + totalSlides : totalSlides;

    // --- Función para ir a una diapositiva específica ---
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) {
            return;
        }
        
        // Scroll instantáneo (funciona horizontal)
        slides[index].scrollIntoView({
            behavior: "auto", 
            inline: "start" 
        });
        
        currentSlideIndex = index;
    }

    // --- Función para actualizar el estado de los botones ---
    function updateButtons() {
        prevButton.disabled = (currentSlideIndex === 0);
        nextButton.disabled = (currentSlideIndex === totalSlides - 1);
    }
    
    // --- Función para actualizar el contador ---
    function updateCounter(index) {
        const pageNumber = index + 1;
        currentPageSpan.textContent = pageNumber < 10 ? '0' + pageNumber : pageNumber;
    }

    // --- Event Listeners para los botones de NAV ---
    prevButton.addEventListener("click", () => {
        goToSlide(currentSlideIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        goToSlide(currentSlideIndex + 1);
    });
    
    
    // --- IntersectionObserver para efectos y contador ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                entry.target.classList.add("active");
                const visibleSlideIndex = parseInt(entry.target.dataset.slideIndex, 10);
                currentSlideIndex = visibleSlideIndex;
                updateButtons();
                updateCounter(currentSlideIndex);
            } else {
                entry.target.classList.remove("active");
            }
        });
    }, { 
        root: container,
        threshold: 0.5 
    });

    slides.forEach(slide => {
        observer.observe(slide);
    });

    // --- LÓGICA DE MÚSICA ELIMINADA ---

    // --- Lógica de Modales ---
    hotspots.forEach(hotspot => {
        hotspot.addEventListener("click", () => {
            const modalId = hotspot.dataset.modalTarget;
            document.getElementById(modalId).classList.add("active");
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".modal-overlay").classList.remove("active");
        });
    });

    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    });

});
