$(function () {
    /* 메인배너*/
    const progressLine = document.querySelector(
        '#mainVisualBanner .autoplay-progress svg'
    )
    const mainVisualBanner = new Swiper('#mainVisualBanner', {
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 6000,
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
        spaceBetween: 26,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            watchOverflow: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    /* 메인 팝업 배너*/
    const mainPopupBanner = new Swiper('#mainPopupBanner', {
        loop: true,
        autoplay: false,
              spaceBetween: 20,
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
        spaceBetween: 0,
        navigation: {
            nextEl: ".grid-swiper-button-next",
            prevEl: ".grid-swiper-button-prev",
        },
    
    });

    /* 썸네일 리스트 스와이퍼*/
    const thumbSwiper = new Swiper('#thumbSwiper', {
        slidesPerView: 'auto',
        freeMode: true,
        pagination: {
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    /* 카테고리 버튼 스와이퍼*/

    // const btnSwiper = new Swiper('.btns-swiper-group', {
    //     slidesPerView: 'auto',
    //     preventClicks: true,
    //     preventClicksPropagation: false,
    //     observer: true,
    //     observeParents: true,
    // });

    // const $snbSwiperItem = $('.btns-swiper-group .swiper-wrapper .swiper-slide a');
    // $snbSwiperItem.click(function() {
    //     const target = $(this).parent();
    //     $snbSwiperItem.parent().removeClass('on');
    //     target.addClass('on');
    //     muCenter(target);
    // });

    // function muCenter(target) {
    //     const snbwrap = $('.btns-swiper-group .swiper-wrapper');
    //     const targetPos = target.position();
    //     const box = $('.btns-swiper-group');
    //     const boxHalf = box.width() / 2;
    //     let pos;
    //     let listWidth = 0;

    //     snbwrap.find('.swiper-slide').each(function() {
    //         listWidth += $(this).outerWidth();
    //     });

    //     const selectTargetPos = targetPos.left + target.outerWidth() / 2;
    //     if (selectTargetPos <= boxHalf) { // left
    //         pos = 0;
    //     } else if ((listWidth - selectTargetPos) <= boxHalf) { // right
    //         pos = listWidth - box.width();
    //     } else {
    //         pos = selectTargetPos - boxHalf;
    //     }

    //     setTimeout(function() {
    //         snbwrap.css({
    //             "transform": "translate3d(" + (pos * -1) + "px, 0, 0)",
    //             "transition-duration": "500ms"
    //         });
    //     }, 200);
    // }
    const btnSwiper = new Swiper('.btns-swiper-group', {slidesPerView: 'auto'});

    // 페이지 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', function () {
        var header = document.getElementById('header');

        // 스크롤 위치가 0보다 크면 'fixed' 클래스 추가, 아니면 제거
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
        var scrollTopButton = document.getElementById('btnTopScroll');

        if (window.scrollY > 0) {
            scrollTopButton
                .classList
                .add('on');
        } else {
            scrollTopButton
                .classList
                .remove('on');
        }
    });
    // "맨 위로" 버튼 클릭 이벤트
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
            var wheelDelta = e.originalEvent.wheelDelta;
            var $menuFooter = $(".main-menu-layer-group .menu-footer");

            if (wheelDelta > 0) {
                $menuFooter.removeClass("line");
            } else {
                $menuFooter.addClass("line");
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
        $(".mo-menu-layer-group").on("wheel mousewheel touchmove", function (e) {
            var wheel;
            if (e.type === "wheel" || e.type === "mousewheel") {
                // wheelDelta for mousewheel event (older browsers), deltaY for wheel event
                // (modern browsers)
                wheel = e.originalEvent.wheelDelta || -e.originalEvent.deltaY;
            } else if (e.type === "touchmove") {
                var touch = e
                    .originalEvent
                    .touches[0];
                wheel = touch.clientY - (this.lastY || touch.clientY);
                this.lastY = touch.clientY;
            }

            if (wheel > 0) {
                $(".mo-menu-layer-group .mo-menu-footer").removeClass("line");
            } else {
                $(".mo-menu-layer-group .mo-menu-footer").addClass("line");
            }
        });

        // 초기 터치 위치를 저장하는 코드 추가
        $(".mo-menu-layer-group").on("touchstart", function (e) {
            var touch = e
                .originalEvent
                .touches[0];
            this.lastY = touch.clientY;
        });
    });

    $("#closeMobileCategorylayerOverlay").click(function () {
        $("#mobileCategorylayerOverlay").addClass("off")
        $("body").removeClass("scroll-lock");
    });

    // 스와이퍼 슬라이드 클릭 이벤트 리스너 추가
    $(".btns-swiper-group .swiper-slide").click(function () {
        var idx = $(this).index();

        $(".btns-swiper-group .swiper-slide .btn-swiper-tab").removeClass("active");
        $(".btns-swiper-group .swiper-slide .btn-swiper-tab")
            .eq(idx)
            .addClass("active");

        $(".tab-swiper-content-section").hide();
        $(".tab-swiper-content-section")
            .eq(idx)
            .show();
    });
});
