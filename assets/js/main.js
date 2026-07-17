    const slides = document.querySelector('.slides');
    const dotsContainer = document.getElementById('dots');
    let index = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let autoSlideInterval;

    function createDots() {
        const slideCount = slides.children.length;
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => showSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showSlide(index + 1);
        }, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function showSlide(n) {
        index = (n + slides.children.length) % slides.children.length;
        slides.style.transform = 'translateX(' + (-index * 100) + '%)';
        updateDots(index);
    }

    function updateDots(activeIndex) {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    }

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    window.onclick = function(event) {
        const mobileNav = document.getElementById('mobileNav');
        const header = document.getElementById('header');
        if (!header.contains(event.target) && mobileNav.style.display === 'flex') {
            mobileNav.style.display = 'none';
            document.body.style.overflow = ''; 
        }
    };

    function toggleMenu() {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav.style.display === 'flex') {
            mobileNav.style.display = 'none';
            document.body.style.overflow = ''; 
        } else {
            mobileNav.style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        }
    }
    
    
    createDots();
    showSlide(0);
    startAutoSlide();

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            showSlide(index + 1);
        } else if (event.key === 'ArrowLeft') {
            showSlide(index - 1);
        }
    });

    // Touch functionality
    function handleTouchStart(event) {
        isDragging = true;
        startX = event.touches[0].clientX;
        stopAutoSlide(); // Pause auto sliding on touch start
    }

    function handleTouchMove(event) {
        if (!isDragging) return;
        currentX = event.touches[0].clientX;
        const distance = startX - currentX;

        slides.style.transform = 'translateX(' + (-index * 100 - (distance / window.innerWidth * 100)) + '%)';
    }

    function handleTouchEnd(event) {
        if (!isDragging) return;
        isDragging = false;

        const distance = startX - event.changedTouches[0].clientX;
        if (distance > 50) {
            // Swipe left
            showSlide(index + 1);
        } else if (distance < -50) {
            // Swipe right
            showSlide(index - 1);
        } else {
            // Reset the position
            slides.style.transform = 'translateX(' + (-index * 100) + '%)';
        }

        startAutoSlide(); // Resume auto sliding
    }


    // Add touch event listeners
    const slider = document.querySelector('.slider');
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
    slider.addEventListener('touchend', handleTouchEnd);


    window.onscroll = function() {
        const header = document.getElementById('header');
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };


