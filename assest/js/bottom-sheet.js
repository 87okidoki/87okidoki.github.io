$(function($) {
  const $sheet = $('#sheet');
  const $handlerBar = $sheet.find('.handler-bar');
  const $footer = $('.footer-section');
  const $floatingBtns = $('#floatingBtns');
  const $historyListBox = $('#historyListBox');

  function adjustFooterPadding() {
    const sheetHeight = $sheet.outerHeight();
    $footer.css('padding-bottom', sheetHeight + 'px');
    $floatingBtns.css('bottom', sheetHeight + 'px');
  }

  $handlerBar.on('click', function() {
    $sheet.toggleClass('on');
    adjustFooterPadding();
  });

  $(document).on('click', function(event) {
    if (!$(event.target).closest('#sheet').length && $sheet.hasClass('on')) {
      $sheet.removeClass('on');
      adjustFooterPadding();
    }
  });
  adjustFooterPadding();
});