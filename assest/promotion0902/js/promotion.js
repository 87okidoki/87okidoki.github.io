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

});
