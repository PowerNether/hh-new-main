function nmTags() {
  let tagToggler = document.querySelector(".nm-filter__toggler") || null;
  let hiddenTags = Array.from(document.querySelectorAll('[data-nmfilter="hidden"]')) || null;

  if (tagToggler !== null && hiddenTags !== null) {
    tagToggler.addEventListener("click", function () {
      hiddenTags.forEach((tag) => {
        if (tag.style.display === "") {
          tag.style.display = "block";
        } else {
          tag.style.display = null;
        }
      });
    });
  }
}
nmTags();

function nmTabs() {
  let parent = document.querySelector(".nm-journal") || null;

  if (parent !== null) {
    let activeEl = parent.querySelector(".header-nm-journal__item.active") || null;
    let activeElWidth = activeEl.scrollWidth;
    let activeElLeft = activeEl.offsetLeft;

    let toggler = parent.querySelector(".nm-journal__toggler") || null;

    toggler.style.width = activeElWidth + "px";
    toggler.style.left = activeElLeft + "px";

    let items = parent.querySelectorAll(".header-nm-journal__item") || null;
    let first = true

    Array.from(items).forEach((item) => {
      item.addEventListener("click", function () {
        Array.from(items).forEach((item) => {
          item.classList.remove("active");
        });

        let itemTab = item.getAttribute("data-nmtabs");

        item.classList.add("active");

        let activeEl = parent.querySelector(".header-nm-journal__item.active") || null;

        activeElWidth = activeEl.scrollWidth;
        activeElLeft = activeEl.offsetLeft;

        toggler.style.width = activeElWidth + "px";
        toggler.style.left = activeElLeft + "px";

        let tab = parent.querySelector(`[data-nmtab='${itemTab}']`);
        let tabLeft = tab.offsetLeft;
        let line = parent.querySelector(".body-nm-journal__wrapper");

        if (first) {
          tabLeft = tabLeft - 24;
        }
        line.style.transform = `translateX(-${tabLeft}px)`;
        first = false;
      });
    });
  }
}
nmTabs();

function nmSliderExclusive() {
  let slider = new Swiper(".city .nm-exclusive__slider", {
    simulateTouch: false,
    spaceBetween: 32,
    slidesPerView: 1,
    scrollbar: {
      el: '.city .swiper-scrollbar',
      draggable: true,
    },
    navigation: {
      prevEl: ".city .nm-exclusive__prev",
      nextEl: ".city .nm-exclusive__next",
      disabledClass: "disabled",
    },
    breakpoints: {
      667: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      }
    }
  });
  let slidersInner = Array.from(document.querySelectorAll('.city .slide-nm-exclusive__inner')) || null;

  if (slidersInner !== null) {
    slidersInner.forEach(slider => {
      new Swiper(slider, {
        pagination: {
          el: ".city .inner-nm-exclusive__pagination",
          clickable: true,
        },
      })
    })
  }
}
function nmSliderExclusiveCountryside() {
  let slider = new Swiper(".countryside .nm-exclusive__slider", {
    simulateTouch: false,
    spaceBetween: 32,
    slidesPerView: 1,
    scrollbar: {
      el: '.countryside .swiper-scrollbar',
      draggable: true,
    },
    navigation: {
      prevEl: ".countryside .nm-exclusive__prev",
      nextEl: ".countryside .nm-exclusive__next",
      disabledClass: "disabled",
    },
    breakpoints: {
      667: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      }
    }
  });
  let slidersInner = Array.from(document.querySelectorAll('.countryside .slide-nm-exclusive__inner')) || null;

  if (slidersInner !== null) {
    slidersInner.forEach(slider => {
      new Swiper(slider, {
        pagination: {
          el: ".countryside .inner-nm-exclusive__pagination",
          clickable: true,
        },
      })
    })
  }
}
function nmSliderPopular() {
  let slider = new Swiper(".nm-popular__slider", {
    spaceBetween: 32,
    slidesPerView: 1,
    pagination: {
      el: ".nm-popular__pagination",
      clickable: true,
      bulletClass: "nm-popular__bullet",
      bulletActiveClass: "active",
      renderBullet: function (index) {
        return '<span class="nm-popular__bullet" data-nmindex="' + index + '"></span>';
      },
    },
    navigation: {
      prevEl: ".nm-popular__prev",
      nextEl: ".nm-popular__next",
      disabledClass: "disabled",
    },
    breakpoints: {
      567: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 5,
      }
    }
  });

  let pagination = document.querySelector(".nm-popular__pagination") || null;
  let line = document.createElement("div");
  line.classList.add("pagination-nm-popular__line");

  if (pagination !== null) {
    pagination.appendChild(line);

    // При смене перетаскиванием
    let prevBullet = pagination.querySelector(".nm-popular__bullet.active");
    let prevIndex = prevBullet.getAttribute("data-nmindex");
    if (slider !== null) {
      slider.on("slideChange", function () {
        let bullet = document.querySelector(`.nm-popular__bullet[data-nmindex="${slider.realIndex}"]`);
        let index = bullet.getAttribute("data-nmindex");

        if (prevIndex < index) {
          let endX = bullet.offsetLeft + bullet.offsetWidth;
          let parentWidth = pagination.offsetWidth;

          line.style.right = parentWidth - endX + "px";

          setTimeout(function () {
            line.style.left = bullet.offsetLeft + "px";
          }, 350);
        }
        if (prevIndex > index) {
          let endX = bullet.offsetLeft;
          let parentWidth = pagination.offsetWidth;

          line.style.left = endX + "px";

          setTimeout(function () {
            line.style.right = parentWidth - endX - bullet.offsetWidth + "px";
          }, 350);
        }
        prevBullet = pagination.querySelector(".nm-popular__bullet.active");
        prevIndex = prevBullet.getAttribute("data-nmindex");
      });
    }
  }
}
function nmSliderAuthor() {
  let slider = new Swiper(".nm-author__slider", {
    spaceBetween: 32,
    slidesPerView: 1,
    pagination: {
      el: ".nm-author__pagination",
      clickable: true,
      bulletClass: "nm-author__bullet",
      bulletActiveClass: "active",
      renderBullet: function (index) {
        return '<span class="nm-author__bullet" data-nmindex="' + index + '"></span>';
      },
    },
    navigation: {
      prevEl: ".nm-author__prev",
      nextEl: ".nm-author__next",
      disabledClass: "disabled",
    },
    breakpoints: {
      767: {
        slidesPerView: 2,
      }
    }
  });

  let pagination = document.querySelector(".nm-author__pagination") || null;
  let line = document.createElement("div");
  line.classList.add("pagination-nm-author__line");

  if (pagination !== null) {
    pagination.appendChild(line);

    // При смене перетаскиванием
    let prevBullet = pagination.querySelector(".nm-author__bullet.active");
    let prevIndex = prevBullet.getAttribute("data-nmindex");
    if (slider !== null) {
      slider.on("slideChange", function () {
        let bullet = document.querySelector(`.nm-author__bullet[data-nmindex="${slider.realIndex}"]`);
        let index = bullet.getAttribute("data-nmindex");

        if (prevIndex < index) {
          let endX = bullet.offsetLeft + bullet.offsetWidth;
          let parentWidth = pagination.offsetWidth;

          line.style.right = parentWidth - endX + "px";

          setTimeout(function () {
            line.style.left = bullet.offsetLeft + "px";
          }, 350);
        }
        if (prevIndex > index) {
          let endX = bullet.offsetLeft;
          let parentWidth = pagination.offsetWidth;

          line.style.left = endX + "px";

          setTimeout(function () {
            line.style.right = parentWidth - endX - bullet.offsetWidth + "px";
          }, 350);
        }
        prevBullet = pagination.querySelector(".nm-author__bullet.active");
        prevIndex = prevBullet.getAttribute("data-nmindex");
      });
    }
  }
}
function nmSliderYoutube() {
  let slider = new Swiper(".nm-youtube__slider", {
    spaceBetween: 32,
    slidesPerView: 1,
    pagination: {
      el: ".nm-youtube__pagination",
      clickable: true,
      bulletClass: "nm-youtube__bullet",
      bulletActiveClass: "active",
      renderBullet: function (index) {
        return '<span class="nm-youtube__bullet" data-nmindex="' + index + '"></span>';
      },
    },
    navigation: {
      prevEl: ".nm-youtube__prev",
      nextEl: ".nm-youtube__next",
      disabledClass: "disabled",
    },
    breakpoints: {
      567: {
        slidesPerView: 2,
      }
    }
  });

  let pagination = document.querySelector(".nm-youtube__pagination") || null;
  let line = document.createElement("div");
  line.classList.add("pagination-nm-youtube__line");

  if (pagination !== null) {
    pagination.appendChild(line);

    // При смене перетаскиванием
    let prevBullet = pagination.querySelector(".nm-youtube__bullet.active");
    let prevIndex = prevBullet.getAttribute("data-nmindex");
    if (slider !== null) {
      slider.on("slideChange", function () {
        let bullet = document.querySelector(`.nm-youtube__bullet[data-nmindex="${slider.realIndex}"]`);
        let index = bullet.getAttribute("data-nmindex");

        if (prevIndex < index) {
          let endX = bullet.offsetLeft + bullet.offsetWidth;
          let parentWidth = pagination.offsetWidth;

          line.style.right = parentWidth - endX + "px";

          setTimeout(function () {
            line.style.left = bullet.offsetLeft + "px";
          }, 350);
        }
        if (prevIndex > index) {
          let endX = bullet.offsetLeft;
          let parentWidth = pagination.offsetWidth;

          line.style.left = endX + "px";

          setTimeout(function () {
            line.style.right = parentWidth - endX - bullet.offsetWidth + "px";
          }, 350);
        }
        prevBullet = pagination.querySelector(".nm-youtube__bullet.active");
        prevIndex = prevBullet.getAttribute("data-nmindex");
      });
    }
  }
}
nmSliderExclusiveCountryside();
nmSliderExclusive();
nmSliderPopular();
nmSliderAuthor();
nmSliderYoutube();
