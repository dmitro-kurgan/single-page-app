'use strict';

function onLoadContent() {
    var list = document.querySelectorAll('.field__list li'),
        btnNext = document.querySelector('.btn--continue'),
        stats = document.getElementById('stats'),
        statsInner = document.getElementById('statsInner'),
        statsNum = document.getElementById('statsNum'),
        statsTxt = document.getElementById('statsTxt'),
        form = document.querySelector('form'),
        radio = document.querySelectorAll('.form__radio'),
        checkbox = document.querySelector('.form__checkbox'),
        user = document.getElementById('name'),
        email = document.getElementById('email'),
        pwd = document.getElementById('password'),
        submit = document.getElementById('submit');

    //SELECT ANSWER ON THE BUTTONS LIST SCREEN
    for (var i = 0; i < list.length; i++) {
        list[i].onclick = clickBtn;
        if (list[i].children[0].classList.contains('active')) showBtnNext();
    }
    function clickBtn(event) {
        stats.style.display = "flex";
        setTimeout(function () {
            stats.style.opacity = 1;
        }, 100);
        for (var _i = 0; _i < list.length; _i++) {
            list[_i].children[0].classList.remove('active');
        }
        var btn = event.target;
        if (btn.className !== "active") {
            btn.classList.add('active');
            var _stats = btn.getAttribute('data-stats'),
                name = btn.getAttribute('data-name');
            statsNum.innerHTML = _stats + '%';
            statsTxt.innerHTML = name;
        }
        showBtnNext();
    }
    function showBtnNext() {
        btnNext.style.display = "block";
        setTimeout(function () {
            btnNext.style.opacity = 1;
        }, 100);
    }

    // FORM VALIDATION
    if (form) {
        var clickRadio = function clickRadio() {
            for (var _i3 = 0; _i3 < radio.length; _i3++) {
                radio[_i3].classList.remove('active');
            }
            if (this.className !== "active") this.classList.add('active');
        };

        //CHECKBOX


        //CHECK FORM
        var checkForm = function checkForm() {
            var checkRadio = false,
                checkName = user.value,
                checkEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email.value),
                checkPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/.test(pwd.value),
                checkCheckbox = checkbox.querySelector('input').checked;
            for (var _i4 = 0; _i4 < radio.length; _i4++) {
                if (radio[_i4].classList.contains('active')) checkRadio = true;
            }
            if (checkRadio == true && checkName !== '' && checkEmail && checkPassword && checkCheckbox) {
                submit.classList.remove('btn--disabled');
            } else {
                submit.classList.add('btn--disabled');
            }
            submit.onclick = function () {
                if (user.value == '') {
                    user.classList.add('invalid');
                    user.setAttribute('placeholder', 'Введите свое имя');
                }
                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email.value)) {
                    email.classList.add('invalid');
                    email.value = '';
                    email.setAttribute('placeholder', 'Неверный формат email');
                }
                if (!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/.test(pwd.value)) {
                    pwd.classList.add('invalid');
                    pwd.value = '';
                    pwd.setAttribute('placeholder', 'Придумайте новый пароль');
                }
            };
        };

        form.onchange = function () {
            checkForm();
        };

        //RADIO BUTTONS
        for (var _i2 = 0; _i2 < radio.length; _i2++) {
            radio[_i2].onclick = clickRadio;
            if (radio[_i2].querySelector('input').checked) {
                radio[_i2].classList.add('active');
            } else {
                radio[_i2].classList.remove('active');
            }
        }
        if (checkbox.querySelector('input').checked) checkbox.classList.add('active');
        checkbox.onclick = function () {
            if (this.querySelector('input').checked) {
                checkbox.classList.add('active');
            } else {
                checkbox.classList.remove('active');
            }
        };

        ///NAME FIELD
        user.onkeyup = function () {
            if (!this.value == "") {
                this.classList.remove('invalid');
                this.removeAttribute('placeholder');
            }
            checkForm();
        };

        //EMAIL FIELD
        email.onkeyup = function () {
            if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.value)) {
                this.classList.remove('invalid');
                this.removeAttribute('placeholder');
            }
            checkForm();
        };

        //PASSWORD FIELD
        pwd.onkeyup = function () {
            if (/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/.test(this.value)) {
                this.classList.remove('invalid');
                this.removeAttribute('placeholder');
            }
            checkForm();
        };
    }
}