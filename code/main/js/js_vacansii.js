document.addEventListener('DOMContentLoaded', function() {
  // Меню
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

  // Модальное окно для вакансий
  const modal = document.getElementById('vacancyModal');
  const closeBtn = document.querySelector('.close-modal');
  const vacancyBtns = document.querySelectorAll('.vacancy-btn');
  const vacancyForm = document.getElementById('vacancyForm');
  const selectedVacancyInput = document.getElementById('selectedVacancy');
  
  // Открытие модального окна при клике на кнопку "Откликнуться"
  if (vacancyBtns) {
    vacancyBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Получаем название вакансии из карточки
        const vacancyCard = this.closest('.vacancy-card');
        const vacancyTitle = vacancyCard.querySelector('.vacancy-title').textContent;
        
        // Устанавливаем название вакансии в скрытое поле
        selectedVacancyInput.value = vacancyTitle;
        
        // Показываем модальное окно
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
  }
  
  // Закрытие модального окна
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  
  // Закрытие при клике вне модального окна
  if (modal) {
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
  
  // Обработка формы отклика
   if (vacancyForm) {
    vacancyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formspreeUrl = 'https://formspree.io/f/xrbqrdyw';
      const formData = new FormData();
      
      formData.append('_subject', 'Отклик на вакансию');
      formData.append('_language', 'ru');
      formData.append('Вакансия', selectedVacancyInput.value);
      formData.append('ФИО', document.getElementById('fullName').value);
      formData.append('Телефон', document.getElementById('phone').value);
      formData.append('Email', document.getElementById('email').value);
      formData.append('Резюме', document.getElementById('resume').value);

      fetch(formspreeUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          alert('Спасибо за отклик! Мы свяжемся с вами.');
          modal.style.display = 'none';
          document.body.style.overflow = '';
          this.reset();
        } else {
          throw new Error('Ошибка отправки');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
      });
    });
  }
});