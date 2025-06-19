document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех каруселей
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        initCarousel(carousel);
    });

    function initCarousel(carousel) {
        const content = carousel.querySelector('.carousel-content');
        const items = content.querySelectorAll('.friend-card, .friend-photo, .friend-video');
        const dotsContainer = carousel.nextElementSibling;
        let currentIndex = 0;
        
        // Создаем точки-индикаторы
        items.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToItem(index));
            dotsContainer.appendChild(dot);
        });
        
        // Кнопки навигации
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        
        // Обработчики кликов
        prevBtn.addEventListener('click', function() {
            moveItem(-1);
            resetTimer(); // Сброс таймера при ручном переключении
        });
        
        nextBtn.addEventListener('click', function() {
            moveItem(1);
            resetTimer(); // Сброс таймера при ручном переключении
        });
        
        function showItem(index) {
            // Плавное исчезновение текущего элемента
            items[currentIndex].style.opacity = '0';
            items[currentIndex].style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                items.forEach(item => {
                    item.classList.remove('active');
                    item.style.opacity = ''; // Сброс прозрачности
                    item.style.transition = ''; // Сброс transition
                });
                
                items[index].classList.add('active');
                currentIndex = index;
                
                // Обновляем точки
                dotsContainer.querySelectorAll('.dot').forEach(dot => {
                    dot.classList.remove('active');
                });
                dotsContainer.children[index].classList.add('active');
            }, 300);
        }
        
        function moveItem(direction) {
            const newIndex = (currentIndex + direction + items.length) % items.length;
            showItem(newIndex);
        }
        
        function goToItem(index) {
            if (index !== currentIndex) {
                showItem(index);
                resetTimer(); // Сброс таймера при клике на точку
            }
        }
        
        // Функции для таймера (оставлены, но не используются)
        let carouselTimer;
        
        function startTimer() {
            // Не запускаем авто-прокрутку
        }
        
        function resetTimer() {
            clearInterval(carouselTimer);
            // Не перезапускаем авто-прокрутку
        }
        
        // Показываем первый элемент
        showItem(0);
    }
});