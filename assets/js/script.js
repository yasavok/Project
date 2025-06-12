// Данные о преподавателях
const teachers = {
    1: {
        name: "Стрижов Олег Викторович",
        photo: "teacher1.jpg"
    },
    2: {
        name: "Ивахненко Дмитрий Владимирович",
        photo: "teacher2.jpg"
    },
    3: {
        name: "Жадан Андрей Владимирович",
        photo: "teacher3.jpg"
    },
    4: {
        name: "Цылина Елена Вячеславовна",
        photo: "teacher4.jpg"
    }
};

// Список существующих групп
const validGroups = ['13', '23', '33', '43', '14', '24', '34', '41', '11', '21', '31', '12', '22', '32'];

// Функция показа уведомления
function showNotification(message) {
    // Удаляем предыдущее уведомление, если оно есть
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-icon">!</div>
        <div class="notification-message">${message}</div>
    `;
    
    // Добавляем уведомление на страницу
    document.body.appendChild(notification);
    
    // Добавляем эффект появления
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Добавляем возможность закрыть уведомление по клику
    notification.addEventListener('click', () => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 800); // Ждем завершения анимации исчезновения
    });
    
    // Автоматически скрываем через 4 секунды
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            notification.classList.add('hide');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 800); // Ждем завершения анимации исчезновения
        }
    }, 4000);
}

// Функция поиска группы
function searchGroup() {
    const groupInput = document.getElementById('groupSearch');
    const groupNumber = groupInput.value.trim();
    
    if (groupNumber) {
        // Сохраняем номер группы в localStorage
        localStorage.setItem('selectedGroup', groupNumber);
        // Перенаправляем на страницу расписания
        window.location.href = 'pages/schedule.html';
    }
}

// Функция отображения информации о преподавателе
function showTeacher(teacherId) {
    const teacherInfo = document.querySelector('.teacher-info');
    const teacherCard = teacherInfo.querySelector('.teacher-card');
    const teacher = teachers[teacherId];
    
    if (teacher) {
        // Скрываем все карточки преподавателей
        document.querySelectorAll('.teacher-info').forEach(info => {
            info.classList.remove('active');
        });

        // Обновляем информацию о преподавателе
        teacherCard.innerHTML = `
            <img src="../assets/images/${teacher.photo}" alt="${teacher.name}">
            <h3>${teacher.name}</h3>
        `;

        // Показываем карточку
        teacherInfo.classList.add('active');

        // Добавляем обработчик для кнопки закрытия
        const closeButton = teacherInfo.querySelector('.close-button');
        if (closeButton) {
            closeButton.onclick = function(e) {
                e.stopPropagation();
                closeTeacherInfo();
            };
        }

        // Добавляем обработчик клика вне карточки
        teacherInfo.addEventListener('click', function(e) {
            if (e.target === this) {
                closeTeacherInfo();
            }
        });
    }
}

// Функция закрытия информации о преподавателе
function closeTeacherInfo() {
    const teacherInfo = document.querySelector('.teacher-info');
    if (teacherInfo) {
        teacherInfo.classList.remove('active');
    }
}

// Функция для анимации при наведении на логотип
function animateLogo() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.transform = 'scale(1.1)';
        logo.style.filter = 'drop-shadow(0 0 20px rgba(108, 99, 255, 0.7))';
    }
}

// Функция для возврата логотипа в исходное состояние
function resetLogo() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.transform = 'scale(1)';
        logo.style.filter = 'drop-shadow(0 0 10px rgba(108, 99, 255, 0.5))';
    }
}

// Обработка загрузки страницы
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const groupNumber = urlParams.get('group');
    
    if (groupNumber) {
        document.getElementById('groupNumber').textContent = groupNumber;
    }
    
    // Добавляем обработчики событий для логотипа
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseover', animateLogo);
        logo.addEventListener('mouseout', resetLogo);
    }
    
    // Обработка нажатия Enter в поле поиска
    const searchInput = document.getElementById('groupSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchGroup();
            }
        });
        
        // Добавляем эффект фокуса
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }
    
    // Добавляем анимацию для кнопок
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}; 