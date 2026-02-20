const WHATSAPP_NUMBER = "552200000000";
const SLIDER_IMAGES = ['/imagem1.jpg', '/imagem2.jpg'];
let currentSlideIndex = 0;
let sliderInterval;

AOS.init({
    duration: 600,
    once: true,
    offset: 50,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
});

function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, '_blank');
}

function updateSliderUI() {
    const imageElement = document.getElementById('heroSliderImage');
    
    imageElement.style.opacity = '0';
    
    setTimeout(() => {
        imageElement.src = SLIDER_IMAGES[currentSlideIndex];
        imageElement.style.opacity = '1';
    }, 250);

    const dot0 = document.getElementById('dot0');
    const dot1 = document.getElementById('dot1');

    if (currentSlideIndex === 0) {
        dot0.className = "w-3 h-3 rounded-full bg-primary cursor-pointer hover:bg-primaryHover active:bg-primaryActive transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary";
        dot1.className = "w-3 h-3 rounded-full bg-slate-300 cursor-pointer hover:bg-slate-400 active:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary";
    } else {
        dot0.className = "w-3 h-3 rounded-full bg-slate-300 cursor-pointer hover:bg-slate-400 active:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary";
        dot1.className = "w-3 h-3 rounded-full bg-primary cursor-pointer hover:bg-primaryHover active:bg-primaryActive transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary";
    }
}

function setSlide(index) {
    currentSlideIndex = index;
    updateSliderUI();
    resetSliderInterval();
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % SLIDER_IMAGES.length;
    updateSliderUI();
}

function resetSliderInterval() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, 4000);
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const cidade = document.getElementById('cidade').value;
    const telefone = document.getElementById('telefone').value;
    
    const text = `Olá! Meu nome é ${nome}. Moro em ${cidade || 'Casimiro de Abreu'} e meu telefone é ${telefone}. Tenho interesse na Gicin SK-8 por R$ 4.990,00.`;
    openWhatsApp(text);
});

document.addEventListener('DOMContentLoaded', () => {
    resetSliderInterval();

    const viewer = document.getElementById('bike-viewer');
    const fallback = document.getElementById('fallback-3d');
    
    viewer.addEventListener('error', () => {
        fallback.classList.remove('hidden');
        fallback.classList.add('flex');
    }, { once: true });
    
    viewer.addEventListener('load', () => {
        fallback.classList.add('hidden');
        fallback.classList.remove('flex');
    });
});