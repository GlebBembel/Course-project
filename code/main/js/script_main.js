const menuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navList.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.rooms-slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentSlide = 0;
    const slideCount = slides.length;
  
    function initSlider() {
      showSlide(currentSlide);
      
      let autoSlide = setInterval(nextSlide, 5000);
      
      slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
      slider.addEventListener('mouseleave', () => autoSlide = setInterval(nextSlide, 5000));
    }
  
    function showSlide(index) {
      if (index >= slideCount) currentSlide = 0;
      if (index < 0) currentSlide = slideCount - 1;
      
      slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
      });
      
      dots.forEach(dot => dot.classList.remove('active'));
      
      slides[currentSlide].classList.add('active');
      setTimeout(() => {
        slides[currentSlide].style.opacity = '1';
      }, 10);
      
      dots[currentSlide].classList.add('active');
    }
  
    function nextSlide() {
      currentSlide++;
      if (currentSlide >= slideCount) currentSlide = 0;
      showSlide(currentSlide);
    }
  
    function prevSlide() {
      currentSlide--;
      if (currentSlide < 0) currentSlide = slideCount - 1;
      showSlide(currentSlide);
    }
  
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  
    initSlider();
  });

document.addEventListener('DOMContentLoaded', function() {
    const wellnessCards = document.querySelectorAll('.wellness-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    wellnessCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease-out';
      observer.observe(card);
    });
  });

function setAsMain(newSrc) {
    const mainImg = document.getElementById('current-main');
    const oldSrc = mainImg.src;
    
    mainImg.classList.add('new-photo');
    mainImg.src = newSrc;
    
    document.querySelectorAll('.thumb').forEach(thumb => {
      thumb.classList.remove('active');
      if (thumb.querySelector('img').src.includes(newSrc.replace('-thumb', ''))) {
        thumb.classList.add('active');
      }
    });
    
    setTimeout(() => {
      mainImg.classList.remove('new-photo');
    }, 500);
  }
  
  function changeMainPhoto(element) {
    const thumbs = document.querySelectorAll('.thumb');
    const randomIndex = Math.floor(Math.random() * thumbs.length);
    thumbs[randomIndex].click();
  }

document.addEventListener('DOMContentLoaded', function() {
    const reviews = document.querySelectorAll('.reviews-slider .review');
    const dots = document.querySelectorAll('.reviews-slider .dot');
    const prevBtn = document.querySelector('.reviews-slider .slider-prev');
    const nextBtn = document.querySelector('.reviews-slider .slider-next');
    let currentIndex = 0;
    let autoSlideInterval;
  
    function showReview(index) {
      reviews.forEach(review => review.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      reviews[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }
  
    function nextReview() {
      let newIndex = (currentIndex + 1) % reviews.length;
      showReview(newIndex);
    }
  
    function prevReview() {
      let newIndex = (currentIndex - 1 + reviews.length) % reviews.length;
      showReview(newIndex);
    }
  
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextReview, 5000);
    }
  
    function initSlider() {
      showReview(0);
      startAutoSlide();
      
      nextBtn.addEventListener('click', nextReview);
      prevBtn.addEventListener('click', prevReview);
      
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showReview(index));
      });
      
      const slider = document.querySelector('.reviews-slider');
      slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
      slider.addEventListener('mouseleave', startAutoSlide);
    }
  
    initSlider();
  });


  document.addEventListener('DOMContentLoaded', function() {
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
  });