// Функция для проверки дат в форме трансфера
function setupTransferDateValidation() {
  const pickupInput = document.getElementById('transferPickup');
  const dropoffInput = document.getElementById('transferDropoff');

  if (pickupInput && dropoffInput) {
    pickupInput.addEventListener('change', function() {
      dropoffInput.min = this.value;
      if (new Date(dropoffInput.value) < new Date(this.value)) {
        dropoffInput.value = this.value;
      }
    });
  }
}

// Функция для проверки дат в форме парковки
function setupParkingDateValidation() {
  const startInput = document.getElementById('parkingStart');
  const endInput = document.getElementById('parkingEnd');

  if (startInput && endInput) {
    startInput.addEventListener('change', function() {
      endInput.min = this.value;
      if (new Date(endInput.value) < new Date(this.value)) {
        endInput.value = this.value;
      }
    });
  }
}

// Функция для загрузки описаний услуг из XML
function loadServicesDescriptions() {
  fetch('xml/services.xml')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(xmlString => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
      
      // Проверка на ошибки парсинга XML
      if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
        throw new Error('Error parsing XML');
      }
      
      // Обновляем описания для каждой услуги
      updateServiceDescription(xmlDoc, 'transfer', '.transfer-service p');
      updateServiceDescription(xmlDoc, 'restaurant', '.restaurant-service p');
      updateServiceDescription(xmlDoc, 'wifi', '.wifi-service p');
      updateServiceDescription(xmlDoc, 'parking', '.parking-service p');
    })
    .catch(error => {
      console.error('Ошибка загрузки XML:', error);
      // Можно добавить fallback-логику здесь
    });
}

function updateServiceDescription(xmlDoc, serviceId, selector) {
  const descriptionElement = xmlDoc.querySelector(`service[id="${serviceId}"] description`);
  if (descriptionElement) {
    const htmlElement = document.querySelector(selector);
    if (htmlElement) {
      htmlElement.textContent = descriptionElement.textContent;
    }
  }
}

// Мобильное меню
function setupMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-list');
  
  if (!menuBtn || !navList) {
    console.error('Не найдены элементы мобильного меню');
    return;
  }

  menuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    navList.classList.toggle('active');
    
    if (navList.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  });
  
  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function() {
      menuBtn.classList.remove('active');
      navList.classList.remove('active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    });
  });
  
  document.addEventListener('click', function(e) {
    if (!navList.contains(e.target) && !menuBtn.contains(e.target)) {
      menuBtn.classList.remove('active');
      navList.classList.remove('active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  });
}

// Модальные окна
function setupModals() {
  const transferBtn = document.querySelector('.transfer-service .service-btn');
  const tableBtn = document.querySelector('.restaurant-service .service-btn');
  const parkingBtn = document.querySelector('.parking-service .service-btn');

  const transferModal = document.getElementById('transferModal');
  const tableModal = document.getElementById('tableModal');
  const parkingModal = document.getElementById('parkingModal');

  const closeButtons = document.querySelectorAll('.close-modal');

  function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.classList.add('active'), 10);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  if (transferBtn && transferModal) {
    transferBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(transferModal);
    });
  }

  if (tableBtn && tableModal) {
    tableBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(tableModal);
    });
  }

  if (parkingBtn && parkingModal) {
    parkingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(parkingModal);
    });
  }

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal')));
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) closeModal(e.target);
  });
}

// Обработка форм
function setupForms() {
  const transferForm = document.getElementById('transferForm');
  const tableForm = document.getElementById('tableForm');
  const parkingForm = document.getElementById('parkingForm');

  function sendFormspreeForm(formType, formData, modal, formElement) {
    const formspreeUrl = 'https://formspree.io/f/xrbqrdyw';
    
    const data = new FormData();
    data.append('_subject', `Новая заявка: ${formType}`);
    data.append('_language', 'ru');
    
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    fetch(formspreeUrl, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        alert('Запрос отправлен! Мы свяжемся с вами.');
        closeModal(modal);
        formElement.reset();
      } else {
        throw new Error('Ошибка отправки');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
    });
  }

  if (transferForm) {
    transferForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const pickupDate = new Date(document.getElementById('transferPickup').value);
      const dropoffDate = new Date(document.getElementById('transferDropoff').value);
      
      if (dropoffDate < pickupDate) {
        alert('Дата отъезда не может быть раньше даты встречи!');
        return;
      }
      
      const formData = {
        'ФИО': this.querySelector('#transferName').value,
        'Телефон': this.querySelector('#transferPhone').value,
        'Email': this.querySelector('#transferEmail').value,
        'Надпись_на_табличке': this.querySelector('#transferSign').value,
        'Дата_и_время_встречи': this.querySelector('#transferPickup').value,
        'Дата_и_время_отъезда': this.querySelector('#transferDropoff').value
      };
      sendFormspreeForm('Трансфер', formData, transferModal, this);
    });
  }

  if (tableForm) {
    tableForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = {
        'ФИО': this.querySelector('#tableName').value,
        'Телефон': this.querySelector('#tablePhone').value,
        'Зал': this.querySelector('#tableHall').value,
        'Дата_и_время': this.querySelector('#tableDate').value
      };
      sendFormspreeForm('Бронирование стола', formData, tableModal, this);
    });
  }

  if (parkingForm) {
    parkingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const startDate = new Date(document.getElementById('parkingStart').value);
      const endDate = new Date(document.getElementById('parkingEnd').value);
      
      if (endDate < startDate) {
        alert('Дата окончания не может быть раньше даты начала!');
        return;
      }
      
      const formData = {
        'ФИО': this.querySelector('#parkingName').value,
        'Телефон': this.querySelector('#parkingPhone').value,
        'Дата_начала': this.querySelector('#parkingStart').value,
        'Дата_окончания': this.querySelector('#parkingEnd').value
      };
      sendFormspreeForm('Парковка', formData, parkingModal, this);
    });
  }
}

// Основной обработчик загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
  setupTransferDateValidation();
  setupParkingDateValidation();
  setupMobileMenu();
  setupModals();
  setupForms();
  loadServicesDescriptions(); // Загружаем описания из XML
});