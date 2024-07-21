$(function () {

  const $ = document.querySelector.bind(document);

  const sheet = $("#sheet");
  const sheetContents = sheet.querySelector(".contents");
  const draggableArea = sheet.querySelector(".draggable-area");
  const scrollTopButton = $("#btnTopScroll");
  const historyListBox = $("#historyListBox");
  const historyButton = $("#btnHistory");
  const footer = $(".footer-section");

  // Check if required elements exist
  if (!sheet || !sheetContents || !draggableArea || !scrollTopButton || !footer) {
    console.error("Required elements do not exist in the DOM.");
    return;
  }

  let sheetHeight; // in vh

  const setSheetHeight = (value) => { 
    sheetHeight = Math.max(0, Math.min(100, value));
    sheetContents.style.height = `${sheetHeight}vh`;

    if (scrollTopButton) {
      scrollTopButton.style.bottom = `${sheetHeight + 24}vh`;
    }

    if (historyButton) {
      historyButton.style.bottom = `${sheetHeight + 30}vh`;
    }

    if (footer) {
      footer.style.paddingBottom = `${sheetHeight + 24}vh`;
    }

    if (historyListBox) {
      historyListBox.style.bottom = `${sheetHeight + 36}vh`;
    }
  };

  const setIsSheetShown = (value) => {
    sheet.setAttribute("aria-hidden", String(!value));
  };

  const touchPosition = (event) => event.touches ? event.touches[0] : event;

  let dragPosition;

  const onDragStart = (event) => {
    dragPosition = touchPosition(event).pageY;
    sheetContents.classList.add("not-selectable");
    draggableArea.style.cursor = document.body.style.cursor = "grabbing";
  };

  const onDragMove = (event) => {
    if (dragPosition === undefined) return;

    const y = touchPosition(event).pageY;
    const deltaY = dragPosition - y;
    const deltaHeight = deltaY / window.innerHeight * 100;

    setSheetHeight(sheetHeight + deltaHeight);
    dragPosition = y;
  };

  const onDragEnd = () => {
    dragPosition = undefined;
    sheetContents.classList.remove("not-selectable");
    draggableArea.style.cursor = document.body.style.cursor = "";

    if (sheetHeight < 10) {
      setIsSheetShown(false);
    } else if (sheetHeight > 20) {
      setSheetHeight(33);
    } else {
      setSheetHeight(0);
    }
  };

  draggableArea.addEventListener("mousedown", onDragStart);
  draggableArea.addEventListener("touchstart", onDragStart);

  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("touchmove", onDragMove);

  window.addEventListener("mouseup", onDragEnd);
  window.addEventListener("touchend", onDragEnd);

});
