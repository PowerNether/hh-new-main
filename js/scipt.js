function nmTags() {
  let tagToggler = document.querySelector('.nm-filter__toggler') || null;
  let hiddenTags = Array.from(document.querySelectorAll('[data-nmfilter="hidden"]')) || null;

  if (tagToggler !== null && hiddenTags !== null) {
    tagToggler.addEventListener('click', function () {
      hiddenTags.forEach(tag => {
        if (tag.style.display === '') {
          tag.style.display = 'block';
        } else {
          tag.style.display = null;
        }
      })
    })
  }
}

nmTags()

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

        line.style.transform = `translateX(-${tabLeft}px)`;
      });
    });
  }
}

nmTabs();

function nmSliderPopular() {
  let slider = new Swiper(".nm-popular__slider", {
    spaceBetween: 32,
    slidesPerView: 5,
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
      slider.on('slideChange', function () {
        let bullet = document.querySelector(`.nm-popular__bullet[data-nmindex="${slider.realIndex}"]`)
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
      })
    }
  }
}

nmSliderPopular();
