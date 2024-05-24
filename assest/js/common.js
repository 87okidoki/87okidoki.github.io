$(function () {
    /* 메인배너*/
    const progressLine = document.querySelector('#mainVisualBanner .autoplay-progress svg')
    const mainVisualBanner = new Swiper('#mainVisualBanner', {
        loop: true,
        autoplay: {
            delay: 5500,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '#mainVisualBanner .swiper-button-next',
            prevEl: '#mainVisualBanner .swiper-button-prev'
        },
        scrollbar: {
            el: '#mainVisualBanner .swiper-scrollbar'
        },
        on: {
            autoplayTimeLeft(s, time, progress) {
                progressLine
                    .style
                    .setProperty("--progress", 1 - progress)
            }
        }

    });
    $("#mainVisualBanner .btn-pause").click(function () {
        if ($(this).hasClass("on")) {
            mainVisualBanner
                .autoplay
                .start();
        } else {
            mainVisualBanner
                .autoplay
                .stop();
        }
        $(this).toggleClass("on");
    })

    /* 이벤트 배너*/
    const mainEventBanner = new Swiper('#mainEventBanner', {
        loop: true,
        autoplay: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            watchOverflow: true
        }
    });

    /* 메인 팝업 배너*/
    const mainPopupBanner = new Swiper('#mainPopupBanner', {
        loop: true,
        autoplay: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            watchOverflow: true
        }
    });

    /* 그리드 리스트 스와이퍼*/
    const gridSwiper = new Swiper('#gridSwiper', {
        slidesPerView: 'auto',
        grid: {
            rows: 2
        },
        spaceBetween: 0
    });

    /* 썸네일 리스트 스와이퍼*/
    const thumbSwiper = new Swiper('#thumbSwiper', {
        slidesPerView: 'auto',
        pagination: {
            clickable: true
        }
    });

    /* 카테고리 버튼 스와이퍼*/
    const btnSwiper = new Swiper('#btnSwiper', {slidesPerView: 'auto'});

    // 스크롤시 해더 상단 고정
    window.addEventListener('scroll', function () {
        var header = document.getElementById('header');
        if (window.scrollY > 0) {
            header
                .classList
                .add('fixed');
        } else {
            header
                .classList
                .remove('fixed');
        }
    });

    // 스크롤 탑버튼
    window.addEventListener('scroll', function () {
        var scrollTop = document.getElementById('btnTopScroll');
        if (window.scrollY > 0) {
            scrollTop
                .classList
                .add('on');
        } else {
            scrollTop
                .classList
                .remove('on');
        }
    });
    $('.btn-top-scroll').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 300);
        return false;
    });

    /* pc 카테고리 메뉴 열림 닫힘*/
    $("#openPcCategorylayer").click(function () {
        $("#pcCategorylayerOverlay").removeClass("off");
        $("body").addClass("scroll-lock");
        $(".main-menu-layer-group").on("mousewheel", function (e) {
            var wheel = e.originalEvent.wheelDelta;

            if (wheel > 0) {
                $(".main-menu-layer-group .menu-footer").removeClass("line");

            } else {
                $(".main-menu-layer-group .menu-footer").addClass("line");
            }
        });
    });
    $("#closePcCategorylayerOverlay").click(function () {
        $("#pcCategorylayerOverlay").addClass("off");
        $("body").removeClass("scroll-lock");
    });

    /* 모바일 카테고리 메뉴 열림 닫힘*/
    $("#openMobileCategorylayer").click(function () {
        $("#mobileCategorylayerOverlay").removeClass("off");
        $("body").addClass("scroll-lock");
        $(".mo-menu-layer-group").on("scroll", function (e) {
            var scroll = e.originalEvent.scroll;
            if (scroll > 0) {
                $(".mo-menu-layer-group .mo-menu-footer").removeClass("line");

            } else {
                $(".mo-menu-layer-group .mo-menu-footer").addClass("line");
            }
        });

    });
    $("#closeMobileCategorylayerOverlay").click(function () {
        $("#mobileCategorylayerOverlay").addClass("off")
        $("body").removeClass("scroll-lock");
    });

    /* 스와이퍼 탭*/
    $(".btns-swiper-group .swiper-slide").click(function () {
        var idx = $(this).index();
        $(".btns-swiper-group .swiper-slide .btn-swiper-tab").removeClass("on");
        $(".btns-swiper-group .swiper-slide .btn-swiper-tab")
            .eq(idx)
            .addClass("on");
        $(".tab-swiper-content-section").hide();
        $(".tab-swiper-content-section")
            .eq(idx)
            .show();
    })

});
