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
            nextEl: "#thumbSwiper .swiper-button-next",
            prevEl: "#thumbSwiper .swiper-button-prev"
        }
    });

    //추천 도서 버튼
    const btnSwiper = new Swiper('.btns-swiper-group', {slidesPerView: 'auto'});

    // 페이지 스크롤 이벤트 리스너 추가
    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', function () {
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

    
    
    // 메인 메뉴
    let isMenuVisible = false; // 상태를 추적하는 변수

    // 뷰포트 크기를 확인하고 'off' 클래스를 적용/제거하는 함수
    function handleViewportSize() {
        if (window.innerWidth <= 926) {
            $("body").removeClass("scroll-lock"); // 작은 화면에서는 스크롤 잠금을 해제
            $("#pcCategorylayerOverlay").addClass("off");
            $("body").removeClass("scroll-lock"); // 작은 화면에서는 스크롤 잠금을 해제
            $('.btn-menu .icon').removeClass('on');
            isMenuVisible = false;
            $(".main-menu-layer-group").off("wheel", handleScroll);
        }
        else {
            $("#mobileCategorylayerOverlay").addClass("off"); // 큰 화면에서는 모바일 카테고리 레이어 오버레이 숨김
        }
    }

    // 메뉴를 토글하는 함수
    function toggleMenu() {
        isMenuVisible = !isMenuVisible; // 상태 반전

        if (isMenuVisible) {
            $("#pcCategorylayerOverlay").removeClass("off");
            $("body").addClass("scroll-lock");
            $('.btn-menu .icon').addClass('on');
            $(".main-menu-layer-group").on("wheel", handleScroll);
        } else {
            $("#pcCategorylayerOverlay").addClass("off");
            $("body").removeClass("scroll-lock");
            $('.btn-menu .icon').removeClass('on');
            $(".main-menu-layer-group").off("wheel", handleScroll);
        }
    }

    // 문서가 준비되면 초기화 및 이벤트 리스너 추가
    $(document).ready(function() {
        handleViewportSize(); // 페이지 로드 시 초기화

        $("#togglePcCategorylayer").click(toggleMenu);

        $(".main-menu-layer-group .bg").click(function () {
            if (isMenuVisible) {
                $("#pcCategorylayerOverlay").addClass("off");
                $("body").removeClass("scroll-lock");
                $('.btn-menu .icon').removeClass('on');
                isMenuVisible = false;
                $(".main-menu-layer-group").off("wheel", handleScroll);
            }
        });

        // 창 크기 변경 시 뷰포트 크기 확인
        $(window).resize(handleViewportSize);
    });

    function handleScroll(event) {
        // 스크롤 핸들링 로직을 여기에 추가
    }

    /* 모바일 카테고리 메뉴 열림 닫힘*/
    $("#openMobileCategorylayer").click(function () {
        // 모바일 카테고리 레이어 오버레이를 보이게 함
        $("#mobileCategorylayerOverlay").removeClass("off");
        
        // 본문 스크롤 잠금
        $("body").addClass("scroll-lock");
        
        // 모바일 메뉴 레이어의 커스텀 스크롤 처리
        $(".mo-menu-layer-group").on("wheel mousewheel touchmove", function (e) {
            var wheel;
            if (e.type === "wheel" || e.type === "mousewheel") {
                // wheel/mousewheel 이벤트에 대한 스크롤 양 결정
                wheel = e.originalEvent.wheelDelta || -e.originalEvent.deltaY;
            } else if (e.type === "touchmove") {
                // touchmove 이벤트에 대한 수직 스크롤 거리 계산
                const touch = e.originalEvent.touches[0];
                wheel = touch.clientY - (this.lastY || touch.clientY);
                this.lastY = touch.clientY;
            }
        });

        // 터치 시작 시 초기 터치 위치 저장
        $(".mo-menu-layer-group").on("touchstart", function (e) {
            const touch = e.originalEvent.touches[0];
            this.lastY = touch.clientY;
        });
    });

    $("#closeMobileCategorylayerOverlay").click(function () {
        $("#mobileCategorylayerOverlay").addClass("off")
        $("body").removeClass("scroll-lock");
    });

    //M/InitialTap
    $('#btnChange').click(function () {
        var $btnChange = $(this);
        if ($btnChange.text().includes('가나다순')) {
            $btnChange.html('ABC순 <i class="icon"><span class="blind">변경</span></i>');
        } else if ($btnChange.text().includes('ABC순')) {
            $btnChange.html('123순 <i class="icon"><span class="blind">변경</span></i>');
        } else {
            $btnChange.html('가나다순 <i class="icon"><span class="blind">변경</span></i>');
        }
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

    // gnb 메뉴
    const subTabNav = $(".btn-tab-line-area a"); // 서브 탭 앵커 태그
    const mainTabNav = $(".btn-tab-menu-area a"); // 메인 탭 앵커 태그
    const tabNavLi = $('.btn-tab-menu-area li'); // 메인 탭 리스트

    // 서브 탭 클릭 이벤트 핸들러
    subTabNav.on("click", function (e) {
        e.preventDefault();
        const target = $(this).attr("href");

        // 해당 서브 탭 활성화
        $(target)
            .addClass("on")
            .siblings('.on')
            .removeClass("on");
        $(this)
            .closest('li')
            .addClass("on")
            .siblings()
            .removeClass("on");
    });

    // 메인 탭 클릭 이벤트 핸들러
    mainTabNav.on("click", function (e) {
        e.preventDefault();
        const target = $(this).attr("href");

        // 해당 메인 탭 활성화
        $(target)
            .addClass("on")
            .siblings('.on')
            .removeClass("on");
        $(this)
            .closest('li')
            .addClass("on")
            .siblings()
            .removeClass("on");

        // 서브 탭 유지 또는 첫 번째 서브 탭 활성화
        const subTabActive = $(target).find('.btn-tab-line-area li.on');
        if (!subTabActive.length) {
            $(target)
                .find('.btn-tab-line-area li:first-child a')
                .trigger('click');
        } else {
            subTabActive
                .find('a')
                .trigger('click');
        }
    });

    // 페이지 로드 시 첫 번째 탭 활성화
    const mainTabActive = tabNavLi.filter('.on');
    if (!mainTabActive.length) {
        tabNavLi
            .first()
            .find('a')
            .trigger('click');
    } else {
        mainTabActive
            .find('a')
            .trigger('click');
    }

    $('.header-section .btn-menu-more').click(function () {
        const $parent = $(this).closest('.menu-link-item');
        $('.menu-link-item')
            .not($parent)
            .removeClass('on');
        if ($parent.find('.menu-link-depth2-list').length) {
            $parent.toggleClass('on');
        }
    });

    //모바일 메뉴
    $('.header-section .mo-menu-depth1').on('click', function () {
        $('.mo-menu-link-group').removeClass('on'); 
        $(this)
            .closest('.mo-menu-link-group')
            .toggleClass('on');
    });

    //메인 메뉴 토글 버튼
    $('.header-section .main-menu-layer-group .btn-toggle-text').click(function () {
        $('.main-menu-layer-group .btn-toggle-text').removeClass('on');
        $(this).toggleClass('on');
    });

    // 스와이퍼 슬라이드 클릭 이벤트 리스너 추가
    $(".publisher-swiper-group .swiper-slide").click(function () {

        $(".publisher-swiper-group .swiper-slide .btn-toggle-text").removeClass("on");
        $(this)
            .find(".btn-toggle-text")
            .toggleClass('on');
    });

    //캘린더 스와이퍼
    const btnsFilterGroup = new Swiper('#btnsFilterGroup', {slidesPerView: 'auto'});

    //추천 도서 버튼
    const btnCategorySwiper = new Swiper(
        '.category-chip-box ',
        {slidesPerView: 'auto'}
    );

    // 툴팁
    $('.btn-info').click(function (event) {
        event.stopPropagation();
        const $popup = $(this).siblings('.info-popup-group');
        $popup.toggleClass('off');

        // 다른 곳 클릭 시 팝업 닫기
        $(document).click(function (event) {
            if (!$(event.target).closest('.info-group').length) {
                $('.info-popup-group').addClass('off');
            }
        });
    });

    // flotingBottomSheet가 있는지 확인하고, 패딩 값을 조절하는 함수
    function flotingBottomSheet() {
        const bottomSheetExists = $("#flotingBottomSheet").length > 0; // 바텀 시트의 존재 여부 확인
        const paddingValue = bottomSheetExists ? $("#flotingBottomSheet").outerHeight(): 48; // 바텀 시트가 있을 경우 패딩 값 설정
        const bottomValue = bottomSheetExists ? $("#flotingBottomSheet").outerHeight(): 60; 
        $(".footer-section").css("padding-bottom", paddingValue  + "px");
        $("#floatingBtns").css("bottom", bottomValue + "px");
    }

    // 페이지 로드 시 및 윈도우 리사이즈 시 패딩 값을 조절
    flotingBottomSheet();
    $(window).resize(function () {
        flotingBottomSheet();
    });

    /* 상세페이지 미리보기 스와이퍼*/
    const bookPreview = new Swiper('#bookPreview', {
        freeMode: true,
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction"
        },
        navigation: {
            nextEl: "#bookPreview .swiper-button-next",
            prevEl: "#bookPreview .swiper-button-prev"
        }
    });

    $('.book-preview-slide-group > .img-book-preview > img').on(
        'load',
        function () {
            const imgWidth = $(this).width(); // 이미지의 너비 가져오기
            $('.book-preview-slide-group > .swiper-pagination ').css(
                'width',
                imgWidth + 'px'
            ); // 페이지네이션 요소의 너비 설정
        }
    );

    /* 상세페이지 앱스토어 팝업*/
    $('#appStore').click(function (event) {
        event.stopPropagation();
        $('#appStorePopup').toggle();
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('#appStore').length && !$(event.target).closest('#appStorePopup').length) {
            $('#appStorePopup').hide();
        }
    });

    /*tab Menu*/
    $(".btn-tab li").click(function () {
        const idx = $(this).index();
        $(".btn-tab li").removeClass("on");
        $(".btn-tab li")
            .eq(idx)
            .addClass("on");
        $(".tab-content-section").hide();
        $(".tab-content-section")
            .eq(idx)
            .show();
    });

    /* Initialize Swiper */
    const tabBtnSwiper = new Swiper('#tabBarGroup', {
        slidesPerView: 'auto',
        freeMode: true
    });

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
            nextEl: "#detailGoodsSwiper .swiper-button-next",
            prevEl: "#detailGoodsSwiper .swiper-button-prev"
        }
    });

    /*tab-bar-group*/
    let sections = $('.detail-content-section');
    let tabNav = $('.tab-bar-group');
    let subHeader = $('.sub-header-section');

    if (tabNav.length > 0) {
        let tabNavHeight = tabNav.outerHeight();
        let tabNavOffset = tabNav.offset().top - tabNavHeight + 1;

        function updateSectionOffsets() {
            sections.each(function () {
                let $this = $(this);
                $this.data('offset-top', $this.offset().top - tabNavHeight);
                $this.data('bottom', $this.data('offset-top') + $this.outerHeight());
            });
        }

        function handleScroll() {
            if ($('body').hasClass('scroll-lock')) {
                return;
            }

            const scrollTopPosition = $(window).scrollTop();

            sections.each(function () {
                const $this = $(this);
                const top = $this.data('offset-top');
                const bottom = $this.data('bottom');

                if (scrollTopPosition >= top && scrollTopPosition <= bottom) {
                    tabNav.find('.btn-tab-menu').removeClass('on');
                    sections.removeClass('on');
                    $this.addClass('on');
                    tabNav.find('a[href="#' + $this.attr('id') + '"]').addClass('on');
                }
            });

            if (scrollTopPosition > tabNavOffset) {
                subHeader.css({
                    'visibility': 'hidden',
                    'transform': 'translateY(-100%)'
                });
                tabNav.addClass('sticky');
            } else {
                tabNav.removeClass('sticky');
                subHeader.css({
                    'visibility': 'visible',
                    'transform': 'translateY(0)'
                });
            }
        }

        function debounce(func, wait) {
            let timeout;
            return function () {
                clearTimeout(timeout);
                timeout = setTimeout(func, wait);
            };
        }

        // 초기 설정
        updateSectionOffsets();
        $(window).on('scroll', handleScroll);

        // 디바운스를 사용하여 리사이즈 시 업데이트
        $(window).on('resize', debounce(function () {
            tabNavHeight = tabNav.outerHeight();
            tabNavOffset = tabNav.offset().top - tabNavHeight + 1;
            updateSectionOffsets();
        }, 100));

        // 탭 메뉴 클릭 이벤트
        tabNav.find('.btn-tab-menu').on('click', function (e) {
            e.preventDefault();
            const targetId = $(this).attr('href');
            const $target = $(targetId);

            if ($target.length) {
                $('html, body').animate({
                    scrollTop: $target.offset().top - tabNavHeight + 1
                }, 500);
            }
        });

        // 'scroll-lock' 클래스 변경 감시
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'class') {
                    if ($('body').hasClass('scroll-lock')) {
                        subHeader.css({
                            'visibility': '',
                            'transform': ''
                        });
                    }
                }
            });
        });

        observer.observe(document.body, {
            attributes: true
        });
    }
    /*상세페이지 수정*/
    function checkContentHeight() {
            $('.detail-content-section').each(function () {
                const $detailContent = $(this).find('.detail-content');
                if ($detailContent.length) {
                    const contentHeight = $detailContent[0].scrollHeight;
                    const thresholdHeight = window.innerWidth < 768 ? 100 : 158; // 반응형 높이 조정
                    if (contentHeight > thresholdHeight) {
                        $(this).find('.btn-area').addClass('show');
                    } else {
                        $(this).find('.btn-area').removeClass('show');
                    }
                }
            });
        }

        function toggleDetailContent() {
            $('.btn-detail-more').click(function () {
                const $section = $(this).closest('.detail-content-section');
                $section.toggleClass('open');
                const $icon = $(this).find('.icon');
                $icon.toggleClass('rotate');

                const isOpen = $section.hasClass('open');
                const buttonText = isOpen ? '접기' : '더보기';
                $(this).html(`<span class="text">${buttonText}</span> <span class="icon-arrow-up ${isOpen ? 'rotate' : ''}"></span>`);

                // 섹션이 열리고 난 후 오프셋 값을 다시 계산
                updateSectionOffsets();
            });
        }
    // 초기 실행 및 화면 크기 변경 시 재실행
    checkContentHeight();
    toggleDetailContent();
    $(window).resize(checkContentHeight);


    /*공유 하기*/
    $('#btnOpenShare').click(function () {
        $('#sharePopup').removeClass('off');
    });

    $('#btnClose').click(function () {
        $('#sharePopup').addClass('off');
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.popup-container').length && !$(event.target).closest('#btnOpenShare').length) {
            $('#sharePopup').addClass('off');
        }
    });

    /*tab-text Menu*/
    $(".tab-text li").click(function () {
        const idx = $(this).index();
        $(".tab-text  li").removeClass("on");
        $(".tab-text li")
            .eq(idx)
            .addClass("on");
    });

    // 스와이퍼 슬라이드 클릭 이벤트 리스너 추가
    $(".btns-filter-group .swiper-slide").click(function () {
        const idx = $(this).index();
        $(".btns-filter-group .btn-filter").removeClass("on");
        $(".btns-filter-group .btn-filter")
            .eq(idx).addClass("on");
    });

    //추천 도서 버튼
    const searchkeyword = new Swiper('#searchkeyword', {slidesPerView: 'auto'});

    //벳지 스와이프
    const badgeSwiper = new Swiper('#badgeSwiper', {
        slidesPerView: 'auto',
        spaceBetween: 8
    });

    //푸터 스와이프
    const footerSwiper = new Swiper('#footerSwiper', {slidesPerView: 'auto'});

    //미북 스페셜 pc
    const specialThumbSwiper = new Swiper('#specialThumbSwiper', {
        loop: true,
        slidesPerView: "auto",
        freeMode: true,
        spaceBetween: 24,
        autoplay: {
            delay: 3000
        },
        navigation: {
            nextEl: "#specialThumbSwiper .swiper-button-next",
            prevEl: "#specialThumbSwiper .swiper-button-prev"
        }
    });

    //미북 스페셜 모바일
    const specialMobileThumbSwiper = new Swiper('#specialMobileThumbSwiper', {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1.3,
        centeredSlides: true,
        breakpoints: {
            360: {
                slidesPerView: 1.4,
                spaceBetween: 20
            },
            420: {
                slidesPerView: 1.8,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2.2,
                spaceBetween: 20
            }
        }
    });

    //모바일 메뉴
    const textSwiper = new Swiper('#textSwiper', { slidesPerView: 'auto' });


});
