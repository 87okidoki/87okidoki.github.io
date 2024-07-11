$(function () {
    jQuery.browser = {};
    (function () {
        jQuery.browser.msie = false;
        jQuery.browser.version = 0;
        if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
            jQuery.browser.msie = true;
            jQuery.browser.version = RegExp.$1;
        }
    })();

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
            prevEl: ".swiper-button-prev"
        }
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
            prevEl: ".grid-swiper-button-prev"
        }
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
            prevEl: ".swiper-button-prev"
        }
    });

    //추천 도서 버튼 
    const btnSwiper = new Swiper('.btns-swiper-group', {slidesPerView: 'auto'});

    // 페이지 스크롤 이벤트 리스너 추가
     const header = document.getElementById('header');

        if (header) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 0) {
                    header.classList.add('fixed');
                } else {
                    header.classList.remove('fixed');
                }
            });
        }

    // 스크롤 탑버튼 "맨 위로" 버튼 클릭 이벤트
    const scrollTopButton = $('#btnTopScroll');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 0) {
            scrollTopButton.addClass('on');
        } else {
            scrollTopButton.removeClass('on');
        }
    });

    scrollTopButton.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, '300');
    });

    /* pc 카테고리 메뉴 열림 닫힘*/
    $("#openPcCategorylayer").click(function () {
        $("#pcCategorylayerOverlay").removeClass("off");
        $("body").addClass("scroll-lock");

        $(".main-menu-layer-group").on("mousewheel", function (e) {
            const wheelDelta = e.originalEvent.wheelDelta;
            const $menuFooter = $(".main-menu-layer-group .menu-footer");

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
                const touch = e
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
            const touch = e
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
        const idx = $(this).index();

        $(".btns-swiper-group .swiper-slide .btn-swiper-tab").removeClass("active");
        $(".btns-swiper-group .swiper-slide .btn-swiper-tab")
            .eq(idx)
            .addClass("active");

        $(".tab-swiper-content-section").hide();
        $(".tab-swiper-content-section")
            .eq(idx)
            .show();
    });

    //캘린더 스와이퍼 
    const btnsFilterGroup = new Swiper('#btnsFilterGroup', {slidesPerView: 'auto'});

   //추천 도서 버튼 
   const btnCategorySwiper = new Swiper('.category-chip-box ', {slidesPerView: 'auto'});

    // 툴팁
    $('.btn-info').click(function(event) {
        event.stopPropagation();
        const $popup = $(this).siblings('.info-popup-group');
        $popup.toggleClass('off');

        // 다른 곳 클릭 시 팝업 닫기
        $(document).click(function(event) {
            if (!$(event.target).closest('.info-group').length) {
                $('.info-popup-group').addClass('off');
            }
        });
    });


    // flotingBottomSheet가 있는지 확인하고, 패딩 값을 조절하는 함수
    function adjustFooterPadding() {
        const bottomSheetExists = $("#flotingBottomSheet").length > 0; // 바텀 시트의 존재 여부 확인
        const paddingValue = bottomSheetExists
            ? $("#flotingBottomSheet").outerHeight(): 0; // 바텀 시트가 있을 경우 패딩 값 설정

        // 푸터에 패딩 값을 적용
        $(".footer-section").css("padding-bottom", paddingValue + 80 + "px");
          $("#btnTopScroll").css("bottom", paddingValue + 40 + "px");
    }

    // 페이지 로드 시 및 윈도우 리사이즈 시 패딩 값을 조절
    adjustFooterPadding();
    $(window).resize(function () {
        adjustFooterPadding();
    });

    //구매하기바텀시트 ui
    let startY,
        currentY,
        initialBottom,
        isDragging,
        isOpen = false;

    function toggleBottomSheet() {
        const bottomSheet = $('#bottomSheet');
        const bottomSheetHeight = bottomSheet.outerHeight();
        const footer = $('.footer-section');
        const topScroll = $('#btnTopScroll');

        if (isOpen) {
            $('#bottomSheet').css('bottom', '0');
            footer.css('padding-bottom', bottomSheetHeight + 80 + 'px');
            topScroll.css('bottom', bottomSheetHeight + 16 + 'px');
        } else {
            $('#bottomSheet').css('bottom', '-142px');
            footer.css('padding-bottom', 142 + 80 + 'px');
            topScroll.css('bottom', 182 + 16 + 'px');
        }
        isOpen = !isOpen;
    }

    $('#bottomSheetHandler').on('click', function () {
        toggleBottomSheet();
    });

    function startDrag(y) {
        startY = y;
        initialBottom = parseInt($('#bottomSheet').css('bottom'));
        isDragging = true;
    }

    function onDrag(y) {
        if (!isDragging) 
            return;
        
        currentY = y;
        const deltaY = startY - currentY;
        const newBottom = initialBottom + deltaY;

        // 제한 조건: 바텀시트가 완전히 화면 밖으로 나가지 않도록
        if (newBottom < -$('#bottomSheet').height()) {
            newBottom = -$('#bottomSheet').height();
        } else if (newBottom > 0) {
            newBottom = 0;
        }

        $('#bottomSheet').css('bottom', newBottom + 'px');
    }

    function endDrag() {
        isDragging = false;

        // 스냅 효과: 일정 거리 이상 드래그하면 열리고, 그렇지 않으면 닫힘
        if (parseInt($('#bottomSheet').css('bottom')) > -$('#bottomSheet').height() / 2) {
            $('#bottomSheet').css('bottom', '0');
        } else {
            $('#bottomSheet').css('bottom', '-142px');
        }
    }

    // 데스크톱 마우스 이벤트
    $('#bottomSheetHandler').on('mousedown', function (e) {
        startDrag(e.clientY);
    });

    $(document).on('mousemove', function (e) {
        onDrag(e.clientY);
    });

    $(document).on('mouseup', function () {
        if (isDragging) {
            endDrag();
        }
    });

  
    /* 상세페이지 미리보기 스와이퍼*/
    const bookPreview = new Swiper('#bookPreview', {
        freeMode: true,
        slidesPerView: 1,
        spaceBetween: 20,
        loop:false,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",

        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });

    $('.book-preview-slide-group > .img-book-preview > img').on('load', function () {
        const imgWidth = $(this).width(); // 이미지의 너비 가져오기
        $('.book-preview-slide-group > .swiper-pagination ').css('width', imgWidth + 'px'); // 페이지네이션 요소의 너비 설정
    });

    /* 상세페이지 앱스토어 팝업*/
    $('#appStore').click(function(event) {
        event.stopPropagation();
        $('#appStorePopup').toggle();
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('#appStore').length && !$(event.target).closest('#appStorePopup').length) {
            $('#appStorePopup').hide();
        }
    });



    /*tab Menu*/
    $(".btn-tab li").click(function () {
        const idx = $(this).index();
        $(".btn-tab li").removeClass("on");
        $(".btn-tab li").eq(idx).addClass("on");
        $(".tab-content-section").hide();
        $(".tab-content-section").eq(idx).show();
    });


    /*tabBtnSwiper*/
    const tabBtnSwiper = new Swiper('#tabBarGroup', {
        slidesPerView: 'auto',
        freeMode: true,
    });
    // PC 환경일 때만 탭 개수에 따라 클래스 적용
    if (window.innerWidth >= 768) { // 768px 이상일 때 PC 환경으로 간주
        const tabCount = $('.swiper-slide').length;
        if (tabCount <= 2) {
            $('#tabBarGroup .swiper-wrapper').addClass('fixed-width');
        } else {
            $('#tabBarGroup .swiper-wrapper').addClass('variable-width');
        }
    }


  /*detailGoodsSwiper*/
    const detailGoodsSwiper = new Swiper('#detailGoodsSwiper', {
        loop: false,
        autoplay: false,
        spaceBetween: 20,
        slidesPerView: 1,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            watchOverflow: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });



    

  /*tab-bar-group*/
    let sections = $('.detail-content-section')
    let tabNav = $('.tab-bar-group')

    if (tabNav && tabNav.length > 0) {
        let tabNavHeight = tabNav.outerHeight();
        let subHeader = $('.sub-header-section');
        let tabNavOffset = tabNav.offset().top;
        $(window).on('scroll', function () {
            const cur_pos = $(this).scrollTop();
            sections.each(function() {
            const top = $(this).offset().top - tabNavHeight,
                bottom = top + $(this).outerHeight();
            if (cur_pos >= top && cur_pos <= bottom) {
                tabNav.find('.btn-tab-menu').removeClass('on');
                sections.removeClass('on');
                $(this).addClass('on');
                tabNav.find('a[href="#'+$(this).attr('id')+'"]').addClass('on');
            }
            });
        });
            
        $(window).scroll(function () {
            if ($(window).scrollTop() >= tabNavOffset) {
                tabNav.addClass('sticky');
                subHeader.css('position', 'static');
            } else {
                tabNav.removeClass('sticky');
                subHeader.css('position', 'fixed');
            }
        });



        tabNav.find('.btn-tab-menu').on('click', function () {
            const $el = $(this), 
            id = $el.attr('href');
            $('html, body').animate({
            scrollTop: $(id).offset().top 
            }, 500);
            
            return false;
        });
    }


   /*btn-detail-more*/
    $('.btn-detail-more').click(function() {
        const section = $(this).closest('.detail-content-section');
        section.toggleClass('open');
        const icon = $(this).find('.icon');
        icon.toggleClass('rotate');
        
        // 버튼 텍스트를 "더보기"에서 "접기"로, 그리고 다시 "접기"에서 "더보기"로 변경합니다.
        if (section.hasClass('open')) {
          $(this).html('<span class="text">접기</span> <span class="icon-arrow-up rotate"></span>');
        } else {
          $(this).html('<span class="text">더보기</span>  <span class="icon-arrow-up"></span>');
        }
    });


    /*공유 하기*/
    $('#btnOpenShare').click(function() {
        $('#sharePopup').removeClass('off');
    });

    $('#btnClose').click(function() {
        $('#sharePopup').addClass('off');
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('.popup-container').length && !$(event.target).closest('#btnOpenShare').length) {
            $('#sharePopup').addClass('off');
        }
    });
    
    /*tab-text Menu*/
    $(".tab-text li").click(function () {
        const idx = $(this).index();
        $(".tab-text  li").removeClass("on");
        $(".tab-text li").eq(idx).addClass("on");
    });


  
    // 스와이퍼 슬라이드 클릭 이벤트 리스너 추가
    $(".btns-filter-group .swiper-slide").click(function () {
        const idx = $(this).index();
        $(".btns-filter-group .btn-filter").removeClass("on");
        $(".btns-filter-group .btn-filter").eq(idx).addClass("on");

    });

    
    //추천 도서 버튼 
    const searchkeyword = new Swiper('#searchkeyword', {slidesPerView: 'auto'});

});


