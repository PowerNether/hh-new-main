function nlTabs() {
  let parent = document.querySelector(".nl-tabs") || null;

  if (parent !== null) {
    let activeEl = parent.querySelector(".header-nl-tabs__item.active") || null;
    let activeElText = parent.querySelector(".header-nl-tabs__item.active span") || null;
    let activeElLeft = activeEl.offsetLeft;
    let activeElWidth = activeElText.offsetWidth;

    let toggler = parent.querySelector(".nl-tabs__toggler") || null;

    toggler.style.width = activeElWidth + "px";
    toggler.style.left = activeElLeft + "px";

    let itemTab = activeEl.getAttribute("data-nmtabs");
    let tab = parent.querySelector(`[data-nmtab='${itemTab}']`);
    let tabHeight = tab.offsetHeight;
    let line = parent.querySelector(".nl-tabs__wrapper");
    line.style.height = tabHeight + "px";

    let items = parent.querySelectorAll(".header-nl-tabs__item") || null;
    let first = true;

    Array.from(items).forEach((item) => {
      item.addEventListener("click", function () {
        Array.from(items).forEach((item) => {
          item.classList.remove("active");
        });

        let itemTab = item.getAttribute("data-nmtabs");

        item.classList.add("active");

        let activeEl = parent.querySelector(".header-nl-tabs__item.active") || null;
        let activeElText = parent.querySelector(".header-nl-tabs__item.active span") || null;

        activeElLeft = activeEl.offsetLeft;
        activeElWidth = activeElText.offsetWidth;

        toggler.style.width = activeElWidth + "px";
        toggler.style.left = activeElLeft + "px";

        let tab = parent.querySelector(`[data-nmtab='${itemTab}']`);
        let tabHeight = tab.offsetHeight;
        let tabLeft = tab.offsetLeft;
        let line = parent.querySelector(".nl-tabs__wrapper");

        if (first) {
          tabLeft = tabLeft - 24;
        }
        line.style.transform = `translateX(-${tabLeft}px)`;
        line.style.height = tabHeight + "px";
        first = false;
      });
    });
  }
}
nlTabs();

function nlTags() {
  let togglers = Array.from(document.querySelectorAll(".nl-tabs__more")) || null;

  if (togglers !== null) {
    togglers.forEach((toggler) => {
      toggler.addEventListener("click", function () {
        let line = document.querySelector(".nl-tabs__wrapper");
        let hiddenTags = Array.from(this.parentNode.querySelectorAll(".nl-tabs__tag[data-nltag]")) || null;

        this.classList.toggle("active");

        hiddenTags.forEach((tag) => {
          if (tag.getAttribute("data-nltag") === "hidden") {
            tag.setAttribute("data-nltag", null);
            line.style.height = null;
          } else {
            tag.setAttribute("data-nltag", "hidden");
            line.style.height = this.parentNode.offsetHeight + "px";
          }
        });
      });
    });
  }
}
nlTags();
