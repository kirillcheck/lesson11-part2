window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');

        }
    }

    hideTabContent(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = '2019-03-25';

    let getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector(' .hours '),
            minutes = timer.querySelector(' .minutes '),
            seconds = timer.querySelector(' .seconds '),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            if (t.hours < 10) {
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;

            }
            if (t.minutes < 10) {
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }

            if (t.seconds < 10) {
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }


            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);


    //modal 

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });




    let Info = document.querySelector('.info');

    Info.addEventListener('click', function (event) {
        let target = event.target;
        if (target.classList.contains('description-btn')) {
            // если цель по которой мы кликнули содержит класс description-btn 
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });


    //form

    let message = {
        loading: ' Загрузка... ',
        success: ' Спасибо! Скоро мы с вами свяжемся! ',
        failure: ' Что-то пошло не так... '
    };

    let form = document.querySelector(' .main-form'),
        inputForm = form.getElementsByTagName('input')[0],
        statusMessage = document.createElement('div'),
        inputFormEmail = document.getElementsByName('email')[0],
        inputFormNum = document.getElementsByName('phone')[0],
        formFooter = document.getElementById('form');
    statusMessage.classList.add('status');

    let ajaxRequest = () => {
        event.preventDefault();
        form.appendChild(statusMessage);

        let pattern = /[+0-9]/ig,
            inputNumber = +inputForm.value;
        if (pattern.test(inputNumber) && inputForm.value.length < 12) {

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', ' application/x-www-form-urlencoded ');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8 ');

            let formData = new FormData(form);

            let obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);

            request.send(json);

            request.addEventListener(' readystatechange ', function () {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            inputForm.value = '';

        } else {
            form.appendChild(statusMessage);
            statusMessage.textContent = `Введите цифры , ограничение до 12 цифр! Вы ввели : ${inputForm.value.length} цифр`;

            let showError = () => {
                statusMessage.textContent = '';
                inputForm.value = '';
            };

            setTimeout(showError, 3000);

        }

    }


    form.addEventListener('submit', function (event) {

        ajaxRequest();

    });







});