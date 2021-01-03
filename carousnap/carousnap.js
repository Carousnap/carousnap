let isScroll = true;

window.addEventListener("load", function () {
  const carousel = document.querySelectorAll(".carouSnap");

  carousel.forEach((crs) => {
    crs.addEventListener("load", renderCarousel());

    const dataWidth = crs.getAttribute("data-width");
    const dataHeight = crs.getAttribute("data-height");
    if (dataWidth || dataHeight) {
      if (dataHeight != null || dataWidth != null) {
        if (dataWidth == null) {
          crs.style.setProperty("--height", dataHeight);
        } else if (dataHeight == null) {
          crs.style.setProperty("--maxWidth", dataWidth);
        } else {
          crs.style.setProperty("--height", dataHeight);
          crs.style.setProperty("--maxWidth", dataWidth);
        }
      }
    }

    function renderCarousel() {
      const numSlide = crs.children[0];
      const btnSlide = crs.children[1];
      const photos = crs.children[2];
      const indicator = crs.children[3];

      function loadCarousel() {
        if (photos.childElementCount > 10 || photos.childElementCount < 1) {
          crs.innerHTML =
            "<p class='ErrorPhoto' style='margin:0 auto;width:100%;text-align:center;margin-top:20%;margin-bottom:20%;color:#797979;-webkit-text-stroke: red;'><b>Minimum</b> 1 Photo <u>or</u> <br/><b>Maximum</b> 10 Photos</p>";
        } else {
          const scroll = Math.round(photos.scrollLeft);
          const styleElement = getComputedStyle(crs);
          const scrollWidth = parseInt(styleElement.width, 10);

          const num = document.createElement("p");
          num.setAttribute("class", "num");
          numSlide.appendChild(num);

          num.innerHTML =
            Math.round(scroll / scrollWidth + 1) +
            " / " +
            photos.childElementCount;

          function setAttr(element, values) {
            for (var key in values) {
              element.setAttribute(key, values[key]);
            }
          }

          let ul = document.createElement("ul");
          for (i = 0; i < photos.childElementCount; i++) {
            let li = document.createElement("li");
            li.setAttribute("data-target", i + 1);
            ul.appendChild(li);
          }
          indicator.appendChild(ul);

          const btnNext = document.createElement("button");
          const btnPrev = document.createElement("button");

          setAttr(btnNext, {
            type: "button",
            class: "btn-slide-next",
          });
          setAttr(btnPrev, {
            type: "button",
            class: "btn-slide-prev",
          });

          btnNext.innerHTML = "&rarr;";
          btnPrev.innerHTML = "&larr;";
          btnSlide.appendChild(btnPrev);
          btnSlide.appendChild(btnNext);

          const num_active = Math.round(scroll / scrollWidth + 1);

          const ul_elem = ul.childElementCount;
          for (j = 0; j <= ul_elem; j++) {
            if (j + 1 == num_active) {
              let li_element = ul.children;
              li_element[j].setAttribute("class", "active");
            }
          }

          ul.style.width = photos.childElementCount * 10 + "%";
        }
      }

      if (
        numSlide.className != "numbSlide" ||
        btnSlide.className != "bnSlide" ||
        photos.className != "photoCollect" ||
        indicator.className != "indCat"
      ) {
        crs.innerHTML =
          "<p class='ErrorCarousel' style='margin:0 auto;width:100%;text-align:center;margin-top:30%;margin-bottom:30%;color:#797979;-webkit-text-stroke: red;'>Some Elements was <b>Missing!</b></p>";
      } else {
        loadCarousel();
      }
    }
  });
});

window.addEventListener("wheel", function (e) {
  if (e.target.parentElement.className == "photoCollect") {
    isScroll = true;
    let photos = e.target.parentElement.parentElement.children[2];

    photos.addEventListener("scroll", function (e) {
      const photos = e.target.childElementCount;
      const numSlide = e.target.parentElement.children[0].children[0];
      const li_elem = e.target.parentElement.children[3].children[0].children;
      const total_li_elem =
        e.target.parentElement.children[3].children[0].childElementCount;

      const value = e.target.scrollLeft;
      const crs = e.target.parentElement;
      const styleElement = getComputedStyle(crs);
      const scrollWidth = parseInt(styleElement.width, 10);
      const currentSlide = Math.round(value / scrollWidth + 1);
      if (isScroll) {
        numSlide.innerHTML = currentSlide + " / " + photos;

        for (ec = 0; ec < total_li_elem; ec++) {
          let sl = li_elem[ec];
          sl.removeAttribute("class");
          if (ec + 1 == currentSlide) {
            sl.setAttribute("class", "active");
          }
        }
      }
    });
  }
});

window.addEventListener("touchstart", function (e) {
  if (e.target.parentElement.className == "photoCollect") {
    isScroll = true;

    const photos = e.target.parentElement.parentElement.children[2];
    photos.addEventListener("scroll", function (e) {
      const photos = e.target.childElementCount;
      const numSlide = e.target.parentElement.children[0].children[0];
      const li_elem = e.target.parentElement.children[3].children[0].children;
      const total_li_elem =
        e.target.parentElement.children[3].children[0].childElementCount;

      const value = e.target.scrollLeft;
      const crs = e.target.parentElement;
      const styleElement = getComputedStyle(crs);
      const scrollWidth = parseInt(styleElement.width, 10);
      const currentSlide = Math.round(value / scrollWidth + 1);
      if (isScroll) {
        numSlide.innerHTML = currentSlide + " / " + photos;

        for (ec = 0; ec < total_li_elem; ec++) {
          let sl = li_elem[ec];
          sl.removeAttribute("class");
          if (ec + 1 == currentSlide) {
            sl.setAttribute("class", "active");
          }
        }
      }
    });
  }
});

window.addEventListener("click", function (e) {
  if (
    e.target.className == "btn-slide-prev" &&
    e.target.parentElement.className == "bnSlide"
  ) {
    isScroll = false;

    const photos = e.target.parentElement.parentElement.children[2];
    const numSlide =
      e.target.parentElement.parentElement.children[0].children[0];
    const li_elem =
      e.target.parentElement.parentElement.children[3].children[0].children;
    const total_li_elem =
      e.target.parentElement.parentElement.children[3].children[0]
        .childElementCount;

    const scrLeft = photos.scrollLeft;
    const styleElement = getComputedStyle(photos);
    const scrollWidth = parseInt(styleElement.width, 10);
    const value = scrLeft - scrollWidth;

    const currentSlide = Math.round(value / scrollWidth + 1);

    if (value >= 0) {
      numSlide.innerHTML = currentSlide + " / " + photos.childElementCount;

      for (ec = 0; ec < total_li_elem; ec++) {
        let sl = li_elem[ec];
        sl.removeAttribute("class");
        if (ec + 1 == currentSlide) {
          sl.setAttribute("class", "active");
        }
      }

      photos.scrollTo(value, 0);
    }
  }

  if (
    e.target.className == "btn-slide-next" &&
    e.target.parentElement.className == "bnSlide"
  ) {
    isScroll = false;

    const photos = e.target.parentElement.parentElement.children[2];
    const numSlide =
      e.target.parentElement.parentElement.children[0].children[0];
    const li_elem =
      e.target.parentElement.parentElement.children[3].children[0].children;
    const total_li_elem =
      e.target.parentElement.parentElement.children[3].children[0]
        .childElementCount;

    const scrLeft = Math.floor(photos.scrollLeft);
    const styleElement = getComputedStyle(photos);
    const scrollWidth = parseFloat(styleElement.width, 10);
    const value = Math.floor(scrLeft + Math.floor(scrollWidth));

    const currentSlide = Math.round(value / scrollWidth + 1);

    const scrollMax = photos.childElementCount * scrollWidth - scrollWidth;

    if (value <= scrollMax) {
      numSlide.innerHTML = currentSlide + " / " + photos.childElementCount;

      for (ec = 0; ec < total_li_elem; ec++) {
        let sl = li_elem[ec];
        sl.removeAttribute("class");
        if (ec + 1 == currentSlide) {
          sl.setAttribute("class", "active");
        }
      }

      photos.scrollTo(value, 0);
    }
  }

  if (
    e.target.tagName == "LI" &&
    e.target.parentElement.parentElement.className == "indCat"
  ) {
    isScroll = false;
    const indiCat = e.target.parentElement.parentElement;

    const value = e.target.getAttribute("data-target");
    const li_elem = indiCat.children[0].children;
    const total_li_elem = indiCat.children[0].childElementCount;

    for (ec = 0; ec < total_li_elem; ec++) {
      let sl = li_elem[ec];
      sl.removeAttribute("class");
      if (ec + 1 == value) {
        sl.setAttribute("class", "active");
      }
    }

    const photos = indiCat.parentElement.children[2];
    const crs = photos.parentElement;
    const numSlide = indiCat.parentElement.children[0].children[0];
    const styleElement = getComputedStyle(crs);
    const scrollWidth = parseInt(styleElement.width, 10);
    photos.scrollLeft = value * scrollWidth - scrollWidth;
    numSlide.innerHTML = value + " / " + photos.childElementCount;
  }
});
