$(function ($) {
  const $sheet = $("#sheet");
  const $handlerBar = $sheet.find(".handler-area");
 
  $handlerBar.on("click", function () {
    $sheet.toggleClass("on");
    adjustFooterPadding();
  });

  $(document).on("click", function (event) {
    if (!$(event.target).closest("#sheet").length && $sheet.hasClass("on")) {
      $sheet.removeClass("on");
      adjustFooterPadding();
    }
  });
  adjustFooterPadding();
});

function adjustFooterPadding() {
  const $sheet = $("#sheet");
  const $footer = $(".footer-section");
  const $floatingBtns = $("#floatingBtns");
  const $floatingBanner = $("#floatingBanner");

  const sheetHeight = $sheet.outerHeight();
  if ($sheet.css("display") === "block") {
    $footer.css("padding-bottom", sheetHeight + "px");
    $floatingBtns.css("bottom", sheetHeight + "px");
    $floatingBanner.css("bottom", sheetHeight + "px");
  } else {
    $footer.css("padding-bottom", "");
    $floatingBtns.css("bottom", "");
    $floatingBanner.css("bottom", "");
  }
}