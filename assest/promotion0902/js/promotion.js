$(function () {
    const textSwiper = new Swiper('.tabs-promo', { slidesPerView: 'auto' });

    $(".tabs-promo .swiper-slide").click(function () {
        const idx = $(this).index();

        $(".tabs-promo .swiper-slide .tab-promo").removeClass("active");
        $(".tabs-promo .swiper-slide .tab-promo")
            .eq(idx)
            .addClass("active");

        $(".tab-promo-content-section").hide();
        $(".tab-promo-content-section")
            .eq(idx)
            .show();
    });

    /*tab Menu*/
    $(".tab-promo-black").click(function () {
        const idx = $(this).index();
        $(".tab-promo-black").removeClass("active");
        $(".tab-promo-black")
            .eq(idx)
            .addClass("active");
        $(".tab-promo-content").hide();
        $(".tab-promo-content")
            .eq(idx)
            .show();
    });

    const promotionBookSwiper = new Swiper('#promotionBookSwiper', {
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,     
        autoHeight: true,
        autoplay: {
            delay: 3000
        },
        navigation: {
            nextEl: "#promotionBookSwiper .swiper-button-next",
            prevEl: "#promotionBookSwiper .swiper-button-prev"
        }
    });
});
