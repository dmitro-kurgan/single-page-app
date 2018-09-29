function onLoadContent () {
    let list = document.querySelectorAll('.field__list li'),
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
    for (let i = 0; i < list.length; i++) {
        list[i].onclick = clickBtn; 
        if (list[i].children[0].classList.contains('active')) showBtnNext();
    }
    function clickBtn (event) {
        stats.style.display = "flex";
        setTimeout(function () {
            stats.style.opacity = 1;
        }, 100);
        for (let i = 0; i < list.length; i++) {
            list[i].children[0].classList.remove('active');
        }
        let btn = event.target;
        if (btn.className !== "active") {
            btn.classList.add('active');
            let stats = btn.getAttribute('data-stats'),
                name = btn.getAttribute('data-name');
            statsNum.innerHTML = `${stats}%`;
            statsTxt.innerHTML = name;
        }
        showBtnNext();
    }
    function showBtnNext () {
        btnNext.style.display = "block";
        setTimeout(function () {
            btnNext.style.opacity = 1;
        }, 100);
    }

    // FORM VALIDATION
    if (form) {
        form.onchange = function () {
            checkForm();
        }

        //RADIO BUTTONS
        for (let i = 0; i < radio.length; i++) {
            radio[i].onclick = clickRadio;
            if (radio[i].querySelector('input').checked) {
                radio[i].classList.add('active');
            } else {
                radio[i].classList.remove('active');
            }
        }
        function clickRadio () {
            for (let i = 0; i < radio.length; i++) {
                radio[i].classList.remove('active');
            }
            if (this.className !== "active") this.classList.add('active');
        }

        //CHECKBOX
        if (checkbox.querySelector('input').checked) checkbox.classList.add('active');
        checkbox.onclick = function () {
            if (this.querySelector('input').checked) {
                checkbox.classList.add('active');
            } else {
                checkbox.classList.remove('active');
            }
        }
        
        ///NAME FIELD
        user.onkeyup = function () {
            if (!this.value == "") {
                this.classList.remove('invalid');
                this.removeAttribute('placeholder');
            }
            checkForm();
        }

        //EMAIL FIELD
        email.onkeyup = function () {
            if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.value)) {
                this.classList.remove('invalid');
                this.removeAttribute('placeholder');
            }
            checkForm();
        }
    
        //PASSWORD FIELD
        pwd.onkeyup = function () {
            if (/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/.test(this.value)) {
                this.classList.remove('invalid');
                this.removeAttribute('placeholder');
            }
            checkForm();
        }
 
        //CHECK FORM
        function checkForm () {
            let checkRadio = false,
                checkName = user.value,
                checkEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email.value),
                checkPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/.test(pwd.value),
                checkCheckbox = checkbox.querySelector('input').checked;
            for (let i = 0; i < radio.length; i++) {
                if (radio[i].classList.contains('active')) checkRadio = true;
            }
            if (checkRadio == true && checkName !== '' && checkEmail && checkPassword && checkCheckbox)  {
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
            }
        }
    }
}