document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню (оставляем ваш существующий код)
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (menuBtn && navList) {
      menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
      });
      
      document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function() {
          menuBtn.classList.remove('active');
          navList.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  
    // Инициализация всех слайдеров на странице
    function initSliders() {
      const sliders = document.querySelectorAll('.slider-container');
      
      sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const dots = slider.querySelectorAll('.dot');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        
        let currentIndex = 0;
        let slideInterval;
  
        // Функция показа слайда
        function showSlide(index) {
          // Проверка на выход за границы
          if (index >= slides.length) currentIndex = 0;
          if (index < 0) currentIndex = slides.length - 1;
          
          // Скрываем все слайды
          slides.forEach(slide => slide.classList.remove('active'));
          dots.forEach(dot => dot.classList.remove('active'));
          
          // Показываем текущий слайд
          slides[currentIndex].classList.add('active');
          dots[currentIndex].classList.add('active');
        }
  
        // Следующий слайд
        function nextSlide() {
          currentIndex++;
          if (currentIndex >= slides.length) currentIndex = 0;
          showSlide(currentIndex);
        }
  
        // Предыдущий слайд
        function prevSlide() {
          currentIndex--;
          if (currentIndex < 0) currentIndex = slides.length - 1;
          showSlide(currentIndex);
        }
  
        // Обработчики событий
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
        // Обработчики для точек
        dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
          });
        });
  
        // Автопрокрутка
        function startAutoSlide() {
          slideInterval = setInterval(nextSlide, 3000);
        }
        
        // Остановка автопрокрутки при наведении
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startAutoSlide);
  
        // Инициализация
        showSlide(currentIndex);
        startAutoSlide();
      });
    }
  
    // Запускаем инициализацию слайдеров
    initSliders();
  });