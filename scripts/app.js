// Espera a que todo el contenido de la página esté cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleccionamos los elementos clave
    const container = document.querySelector(".presentation-container");
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");
    
    const totalSlides = slides.length;
    let currentSlideIndex = 0; // Empezamos en la diapositiva 0

    // --- Función para ir a una diapositiva específica ---
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) {
            return; // No hacer nada si el índice está fuera de rango
        }
        
        // Usamos scrollIntoView para movernos suavemente a la diapositiva
        slides[index].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        
        currentSlideIndex = index;
        updateButtons();
    }

    // --- Función para actualizar el estado de los botones ---
    function updateButtons() {
        // Deshabilitar "anterior" si estamos en la primera diapositiva
        prevButton.disabled = (currentSlideIndex === 0);
        
        // Deshabilitar "siguiente" si estamos en la última diapositiva
        nextButton.disabled = (currentSlideIndex === totalSlides - 1);
    }

    // --- Event Listeners para los botones ---
    prevButton.addEventListener("click", () => {
        goToSlide(currentSlideIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        goToSlide(currentSlideIndex + 1);
    });
    
    // --- Actualizar el índice actual basado en el scroll (para sincronizar) ---
    // Usamos un IntersectionObserver para detectar qué slide está visible
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Obtenemos el índice del slide visible
                const visibleSlideIndex = parseInt(entry.target.dataset.slideIndex, 10);
                currentSlideIndex = visibleSlideIndex;
                updateButtons();
            }
        });
    }, { 
        root: container, // Observa dentro del contenedor
        threshold: 0.6 // El slide debe estar al menos 60% visible
    });

    // Observar cada diapositiva
    slides.forEach(slide => {
        observer.observe(slide);
    });

    // Inicializar los botones al cargar la página
    updateButtons();
});