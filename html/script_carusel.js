const carouselContainer = document.querySelector(".carousel-container");
const slides = Array.from(document.querySelectorAll(".carousel-slide"));

// Рассчитываем точную ширину слайда с учетом margin
const slideStyle = window.getComputedStyle(slides[0]);
const slideMargin = parseInt(slideStyle.marginRight);
const slideWidth = slides[0].offsetWidth + slideMargin;

// Клонирование слайдов для бесконечности
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = "first-clone";
lastClone.id = "last-clone";

carouselContainer.insertBefore(lastClone, slides[0]);
carouselContainer.appendChild(firstClone);

const allSlides = document.querySelectorAll(".carousel-slide");
let currentPosition = 1; // Начинаем с первого оригинального слайда

// Корректировка начальной позиции
function initializeCarousel() {
    carouselContainer.style.transition = "none";
    // Добавляем начальное смещение -15px через calc()
    carouselContainer.style.transform = `translateX(calc(-${currentPosition * slideWidth}px - 15px))`;
    setTimeout(() => {
        carouselContainer.style.transition = "transform 0.5s ease-in-out";
    }, 50);
}

initializeCarousel();

// Функция перемещения
function moveToSlide(index) {
    currentPosition = index;
    carouselContainer.style.transform = `translateX(calc(-${currentPosition * slideWidth}px - 15px))`;
}

// Обработчики кнопок
document.getElementById("next-button").addEventListener("click", () => {
    if (currentPosition >= allSlides.length - 1) return;
    currentPosition++;
    moveToSlide(currentPosition);
    resetInterval();
});

document.getElementById("prev-button").addEventListener("click", () => {
    if (currentPosition <= 0) return;
    currentPosition--;
    moveToSlide(currentPosition);
    resetInterval();
});

// Обработка бесконечности
carouselContainer.addEventListener("transitionend", () => {
    if (allSlides[currentPosition].id === "first-clone") {
        carouselContainer.style.transition = "none";
        currentPosition = 1;
        carouselContainer.style.transform = `translateX(calc(-${currentPosition * slideWidth}px - 15px))`;
        setTimeout(() => {
            carouselContainer.style.transition = "transform 0.5s ease-in-out";
        }, 50);
    }
    
    if (allSlides[currentPosition].id === "last-clone") {
        carouselContainer.style.transition = "none";
        currentPosition = allSlides.length - 2;
        carouselContainer.style.transform = `translateX(calc(-${currentPosition * slideWidth}px - 15px))`;
        setTimeout(() => {
            carouselContainer.style.transition = "transform 0.5s ease-in-out";
        }, 50);
    }
});

// Автопрокрутка
let autoSlideInterval = setInterval(() => {
    if (currentPosition >= allSlides.length - 1) return;
    currentPosition++;
    moveToSlide(currentPosition);
}, 5000);

function resetInterval() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        if (currentPosition >= allSlides.length - 1) return;
        currentPosition++;
        moveToSlide(currentPosition);
    }, 5000);
}

// Пауза при наведении
carouselContainer.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
carouselContainer.addEventListener("mouseleave", resetInterval);