
// Мобильное меню
const menuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navList.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (menuBtn && navList) { // Проверка, что элементы существуют
      menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Блокировка прокрутки страницы
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
      });
      
      // Закрытие меню при клике на ссылку
      document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function() {
          menuBtn.classList.remove('active');
          navList.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  });

  // Обработка модального окна бронирования
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');
    const roomTypeInput = document.getElementById('roomType');
    
    // Обработчики для кнопок "Забронировать"
    document.querySelectorAll('.book-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const roomCard = this.closest('.room-card');
        const roomTitle = roomCard.querySelector('h3').textContent;
        
        roomTypeInput.value = roomTitle;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
      });
    });
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });
    
    // Закрытие при клике вне окна
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
    
    // Обработка формы
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Здесь можно добавить AJAX-запрос для отправки данных
      const formData = {
        fullName: this.querySelector('#fullName').value,
        phone: this.querySelector('#phone').value,
        email: this.querySelector('#email').value,
        roomType: this.querySelector('#roomType').value
      };
      
      console.log('Данные бронирования:', formData);
      
      // Закрываем модальное окно после отправки
      modal.style.display = 'none';
      document.body.style.overflow = '';
      
      // Очищаем форму
      this.reset();
      
      // Показываем уведомление об успешном бронировании
      alert('Спасибо! Ваша заявка на бронирование принята. Мы свяжемся с вами в ближайшее время.');
    });
  });

  function closeModal() {
    modal.classList.add('closing');
    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.remove('closing');
      document.body.style.overflow = '';
    }, 300);
  }

   const bookingForm = document.getElementById('bookingForm');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formspreeUrl = 'https://formspree.io/f/xrbqrdyw';
      
      // Собираем данные формы
      const formData = new FormData();
      formData.append('ФИО', document.getElementById('fullName').value);
      formData.append('Телефон', document.getElementById('phone').value);
      formData.append('Email', document.getElementById('email').value);
      formData.append('Тип номера', document.getElementById('roomType').value);
      formData.append('Форма', 'Бронирование номера');

      // Отправка через Formspree
      fetch(formspreeUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          alert('Бронирование отправлено! Мы свяжемся с вами для подтверждения.');
          closeModal(document.getElementById('bookingModal'));
          bookingForm.reset();
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

  // Обработка кнопок бронирования
  const bookButtons = document.querySelectorAll('.book-btn');
  bookButtons.forEach(button => {
    button.addEventListener('click', function() {
      const roomType = this.closest('.room-card').querySelector('h3').textContent;
      document.getElementById('roomType').value = roomType;
      openModal(document.getElementById('bookingModal'));
    });
  });
