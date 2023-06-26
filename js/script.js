//Header
const header = document.querySelector('.js-header');
const headerHeight = document.querySelector('.js-header').clientHeight;

document.onscroll = function () {
    const scroll = window.scrollY;
    if (scroll > headerHeight + 320) { //scroll < document.body.clientHeight - 1200  убрать шапку внизу у футера, чтобы не повторялись
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
}

// Меню бургер
const iconMenu = document.querySelector('.header__burger');
const menuBody = document.querySelector('.header__menu');
const menuLink = document.querySelectorAll('.header__menu-link');
const iconPhone = document.querySelector('header .header__phone');

if (iconMenu) {
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
        iconPhone.classList.toggle('hide');
    });
}
        // Закрывает меню бургер при клике на ссылку
if (menuLink.length > 0) {
    menuLink.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.targer;
        if (iconMenu.classList.contains('active')) {
            document.body.classList.remove('lock');
            iconMenu.classList.remove('active');
            menuBody.classList.remove('active');
            iconPhone.classList.remove('hide');
        }
    }
}

// Anchors
const anchors = document.querySelectorAll('.js-anchorLink a');

anchors.forEach(anc => {
    anc.addEventListener("click", function(event) {
        event.preventDefault();

        const id = anc.getAttribute('href');
        const elem = document.querySelector(id);

        window.scroll({
            top: elem.offsetTop - 104,
            behavior: 'smooth'
        });
    });
});

//Swiper
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.3,
    spaceBetween: 20,
      // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
    },
    breakpoints: {
        993: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        425: {
            slidesPerView: 2.3,
            spaceBetween: 40,
        },
    },
});


//prompt
const promptBtn = document.querySelector('.info__item-prompt');
const promptBody = document.querySelector('.info-prompt');

promptBtn.addEventListener('click', function() {
    promptBody.classList.toggle('show');
});

//popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body'); // для блокирования скролла
const lockPadding = document.querySelectorAll('.lock-padding'); 

let unlock = true; // для реализации, чтобы небыло двойных нажатий

const timeout = 800; // должна быть равна времени анимации в css

if (popupLinks.length > 0) {
    for(let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault(); // блокируем дефолтную работу ссылки (переход)
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup')); // ближайший родитель с классом .popup
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    // body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});



// TABS
const tabsBtns = document.querySelectorAll('.popup__tabs button');
const tabsItems = document.querySelectorAll('.popup__tabs-content .popup__item');
const select = document.querySelector('.popup__select');
const selectItems = document.querySelectorAll('.popup__select .popup__select-option');

// функция скрывает табы и убирает active у кнопок
function hideTabs() {
    tabsItems.forEach(item => item.classList.add('hide'));
    tabsBtns.forEach(item => item.classList.remove('activetab'));
}
// функция показывает переданный номер таба и делает соответствующую ему кнопку активной.
function showTab(index) {
    tabsItems[index].classList.remove('hide');
    tabsBtns[index].classList.add('activetab');
}

hideTabs();
showTab(0);

tabsBtns.forEach((btn, index) => btn.addEventListener("click", () => {
    hideTabs();
    showTab(index);
    select.value = tabsBtns[index].innerText;
}));

select.onchange = () => {
    hideTabs();
    tabsItems[select.options.selectedIndex].classList.remove('hide');
    tabsBtns.forEach(item => item.classList.remove('activetab'));
    tabsBtns[select.options.selectedIndex].classList.add('activetab');
}