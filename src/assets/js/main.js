document.addEventListener('DOMContentLoaded', function () {

  /* -- SEARCH  -- */
  const searchBoxArray = document.querySelectorAll('.search__container');
  if (searchBoxArray && searchBoxArray.length > 0) {
    searchBoxArray.forEach(searchBox => {
      const search = searchBox.querySelector('.search');
      const searchBtn = searchBox.querySelector('.search__button');
      const input = search.querySelector('input');

      input.addEventListener('focus', () => {
        search.classList.add('open');
      })

      input.addEventListener('blur', () => {
        search.classList.remove('open');
        search.classList.remove('active');
      })

      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          search.classList.add('active');
        })
      }
    })
  }
  /* -- END SEARCH  -- */


  /* -- AUTOMATIC CONTENT -- */
  const textAreas = document.querySelectorAll('.text');
  if (textAreas && textAreas.length > 0) {
    textAreas.forEach(text => {
      const autocontentSection = text.querySelector('.autocontent');

      if (autocontentSection) {
        const jsScrollBlockList = text.querySelectorAll('h2, h3');

        if (jsScrollBlockList.length > 0) {
          for (let i = 0; i < jsScrollBlockList.length; i += 1) {
            const jsScrollBlock = jsScrollBlockList[i];
            const titleBlock = jsScrollBlock.textContent;
            const articleNavigationItem = document.createElement('li');
            const articleNavigationLink = document.createElement('a');
            if (jsScrollBlock.tagName == 'H1') {
              articleNavigationItem.classList.add('title-h1');
            }
            if (jsScrollBlock.tagName == 'H2') {
              articleNavigationItem.classList.add('title-h2');
            }
            jsScrollBlock.setAttribute('id', i)
            articleNavigationLink.setAttribute('href', '#' + i);
            articleNavigationLink.textContent = ' ' + titleBlock;
            articleNavigationItem.append(articleNavigationLink);
            autocontentSection.querySelector('.autocontent__list ul').append(articleNavigationItem);
          }
        } else {
          autocontentSection.remove();
        }
      }
    })
  }
  /* -- END AUTOMATIC CONTENT   -- */


  document.querySelectorAll('a[href^="#"').forEach(link => {

    link.addEventListener('click', function (e) {
      e.preventDefault();

      let href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const topOffset = 180;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });


  /* -- HEADER   -- */
  ['load', 'resize'].forEach((event) => {
    window.addEventListener(event, function () {
      const header = document.querySelector('.header__row.mobile');
      const headerAll = document.querySelector('.header');
      let headerHeight = header.clientHeight;
      let headerAllHeight = headerAll.clientHeight;
      const main = document.querySelector('.page');
      window.addEventListener('scroll', e => {
        //if (window.innerWidth > 1570) {
        if (window.scrollY + 115 > headerAllHeight && !headerAll.classList.contains('active')) {
          if (!headerAll.classList.contains('fixed')) {
            headerAll.classList.add('fixed');
          }
          main.style.marginTop = headerHeight + 'px';
          //main.style.marginBottom = '-' + headerHeight + 'px';
        } else {
          headerAll.classList.remove('fixed');
          main.removeAttribute("style");
        }
        //} else {
        //headerAll.classList.remove('fixed');
        //main.removeAttribute("style");
        //}
      })
    })
  })
  /* -- END HEADER   -- */


  /* -- MENU MOBILE  -- */
  const burgerMenuArr = document.querySelectorAll('.menu_btn');
  if (burgerMenuArr && burgerMenuArr.length > 0) {
    const header = document.querySelector('.header');
    const headerMobile = header.querySelector('.header__row.mobile');

    if (header && headerMobile) {
      burgerMenuArr.forEach(burgerMenu => {
        burgerMenu.addEventListener("click", () => {
          if (header.classList.contains('active')) {
            headerMobile.classList.remove("active");
            header.classList.remove("active");
          } else {
            headerMobile.classList.add("active");
            header.classList.add("active");
            let height = header.offsetHeight;
            // headerMobile.style.height = 'calc(100vh - ' + height + 'px)';
          }
          // header.querySelector('.ham').classList.toggle("active");
          document.querySelector('html').classList.toggle('burger-lock');
        });
      })
    }
  }

  const hideItems = document.querySelectorAll('.hide-items');
  if (hideItems.length > 0) {
    hideItems.forEach((elem) => {
      const hideItem = elem.querySelectorAll('.hide-item');
      const hideTitles = elem.querySelectorAll('.hide-item__title');
      const hideContents = elem.querySelectorAll('.hide-item__height');
      hideItem.forEach((item) => {
        let title = item.querySelector('.hide-item__title');
        let content = item.querySelector('.hide-item__height');
        title.addEventListener('click', () => {
          if (title.classList.contains('active')) {
            title.classList.remove('active');
            content.classList.remove('active');
            content.removeAttribute('style');
          }
          else {
            hideTitles.forEach((element) => {
              element.classList.remove('active');
            })
            hideContents.forEach((element) => {
              element.classList.remove('active');
              element.removeAttribute("style");
            })
            let height = content.querySelector('.hide-item__content').offsetHeight;
            title.classList.add('active');
            content.classList.add('active');
            content.style.height = height + 24 + 'px';
          }
        })
      })
    })
  }
  /* -- END MENU MOBILE  -- */



  /* -- PAGINATION  -- */
  function hiddenItems(tabContent) {
    elements = Array.from(tabContent.children);
    hiddenElements = elements.filter(element => {
      return element.classList.contains("hide");
    })
    return hiddenElements;
  }

  function HiddenElementsInit(tabContent, paginationNumber, btnMore) {
    elements = tabContent.children;
    if (elements.length > paginationNumber) {
      for (let i = elements.length - 1; i >= paginationNumber; i--) {
        elements[i].classList.add("hide");
      }
      btnMore.classList.add("active");
    }
  }

  function tabsShowMore(paginationNumber, btnMore) {
    tabContent = document.querySelector(".pag-list.pag-active");
    hiddenElements = hiddenItems(tabContent);
    for (let i = 0; i < hiddenElements.length; i++) {
      hiddenElements[i].classList.remove("hide");
    }
    btnMore.classList.remove("active");
  }

  const showMoreBtn = document.querySelector(".btn_more");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", (evt) => {
      tabsShowMore(8, showMoreBtn);
    })
  }
  const tabContents = document.querySelectorAll(".pag-list");
  if (tabContents && tabContents.length > 0) {
    tabContents.forEach(content => {
      HiddenElementsInit(content, 8, showMoreBtn);
    })
  }
  /* -- END PAGINATION  -- */



  /* -- CATEGORIES  -- */
  function categoriesSwitch(mainContainer = document, categoriesArray, categoriesContentArray, itemSelectorActive, contentSelectorActive, pagination = false) {
    if (categoriesArray.length > 0 && categoriesContentArray.length > 0) {
      categoriesArray[0].classList.add("active");
      categoriesContentArray[0].classList.add("active");
      if (pagination) categoriesContentArray[0].querySelector('.pag-list').classList.add('pag-active');
      if (window.innerWidth <= 800) {
        categoriesContentArray[0].style.maxHeight = categoriesContentArray[0].scrollHeight + 40 + "px";
      }
      for (let i = 0; i < categoriesContentArray.length; i++) {
        categoriesContentArray[i].style.order = i * 2 + 1;
        categoriesArray[i].style.order = i * 2;
        categoriesArray[i].addEventListener('click', () => {
          mainContainer.querySelectorAll(itemSelectorActive).forEach(activeBtn => {
            activeBtn.classList.remove('active');
          })
          mainContainer.querySelectorAll(contentSelectorActive).forEach(activeContent => {
            activeContent.classList.remove('active');
            if (pagination) {
              activeContent.classList.remove("pag-active");
              activeContent.querySelector('.pag-list').classList.remove('pag-active');
            }
          })
          categoriesArray[i].classList.add('active');
          categoriesContentArray[i].classList.add("active");
          if (pagination) {
            categoriesContentArray[i].querySelector('.pag-list').classList.add('pag-active');

            tabContents.forEach(content => {
              HiddenElementsInit(content, 8, showMoreBtn);
            })
          }
        })
      }
    }
  }
  /* -- END CATEGORIES  -- */


  /* -- GRAB LIST  -- */
  function grabListListeners(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.1;
      container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchend', () => {
      isDown = false;
    });

    container.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });
  }
  /* -- END GRAB LIST  -- */


  /* -- TABS  -- */
  function tabs(containerItemSelector, titleArray, contentArray) {
    for (let i = 0; i < titleArray.length; i++) {
      titleArray[i].addEventListener("click", () => {
        const item = titleArray[i].closest(containerItemSelector);
        if (item) item.classList.toggle("active");
        titleArray[i].classList.toggle("active");
        if (contentArray[i].style.maxHeight) {
          contentArray[i].removeAttribute("style");
        } else {
          contentArray[i].style.maxHeight = "1500px";
        }
      })
    };
  }
  /* -- END TABS  -- */


  /* -- FAQ  -- */
  const faq = document.querySelector('.faq');
  if (faq) {
    const titleArray = faq.querySelectorAll('.faq__top-container');
    const contentArray = faq.querySelectorAll('.faq__bottom-container');

    if (titleArray && contentArray) {
      tabs('.faq__item', titleArray, contentArray);
    }
  }
  /* -- END FAQ  -- */


  /* -- PRICE -- */
  const price = document.querySelector('.price');
  if (price) {
    const titleArray = price.querySelectorAll('.price__categories__top');
    const contentArray = price.querySelectorAll('.price__categories__bottom');

    if (titleArray && contentArray) {
      tabs('.price__categories', titleArray, contentArray);
    }

    const categories = price.querySelectorAll('.price__category');
    const listTitle = price.querySelector('.price__categories__top');
    const categoriesContent = price.querySelectorAll(".price__list");

    listTitle.textContent = categories[0].textContent;

    categories.forEach(category => {
      category.addEventListener('click', evt => {
        const categoryTitle = evt.target.textContent;
        listTitle.textContent = categoryTitle;
      })
    })

    categoriesSwitch(price, categories, categoriesContent, ".price__category.active", ".price__list.active");
  }
  /* -- END PRICE -- */
  

  /* -- SLIDERS  -- */

  //Slider Metodics
  metodicSwiper = document.querySelector(".metodic");
  if (metodicSwiper) {
    metodicSwiperCheck = new Swiper(metodicSwiper.querySelector('.metodic__list'), {
      direction: 'horizontal',
      slidesPerView: 1.02,
      grabCursor: true,
      spaceBetween: 8,
      breakpoints: {
        800: {
          slidesPerView: 2,
          spaceBetween: 12
        },
        1300: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      }
    });
  }

  //Slider Conditions
  conditionSwiper = document.querySelector(".condition");
  if (conditionSwiper) {
    conditionSwiperCheck = new Swiper(conditionSwiper.querySelector('.condition__slider'), {
      direction: 'horizontal',
      slidesPerView: 1.02,
      grabCursor: true,
      spaceBetween: 10,
      breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        1400: {
          slidesPerView: 4.05,
          spaceBetween: 20
        }
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      navigation: {
        nextEl: conditionSwiper.querySelector('.slider-sl__next'),
        prevEl: conditionSwiper.querySelector('.slider-sl__prev'),
      },
    });
  }

  /* -- END SLIDERS  -- */


  /* -- POPUPS  -- */
  function popupClose(popupActive) {
    popupActive.classList.remove('open');
    setTimeout(() => {
      popupActive.classList.contains("open") || popupActive.classList.remove("active");
    }, 400);
    document.body.classList.remove('lock');
    document.querySelector('html').style.paddingRight = 0;
    document.querySelector('html').classList.remove('lock');
    document.querySelector('header').removeAttribute('style');
  }
  const popupOpenBtns = document.querySelectorAll('.popup-btn');
  const popups = document.querySelectorAll('.popup');
  const closePopupBtns = document.querySelectorAll('.close-popup');
  closePopupBtns.forEach(function (el) {
    el.addEventListener('click', function (e) {
      popupClose(e.target.closest('.popup'));
    });
  });
  if (popups.length > 0) {
    popups.forEach(function (popup) {
      popupClose(popup);
      popup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {

          popupClose(e.target.closest('.popup'));
        }
      });
    });
  }
  popupOpenBtns.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const path = e.currentTarget.dataset.path;
      const currentPopup = document.querySelector(`[data-target="${path}"]`);
      if (currentPopup) {
        currentPopup.classList.add('active');
        setTimeout(() => {
          currentPopup.classList.add("open");
        }, 10);
        if (currentPopup.getAttribute("data-target") == 'popup-change') {
          let currentItem = el.closest('.change-item');
          let originalTop = currentPopup.querySelector('.original-title');
          let title = currentItem.querySelector('.change-title');
          let subtitle = currentItem.querySelector('.change-subtitle');
          if (title && subtitle) {
            var newTitle = title.innerHTML + ' ' + subtitle.innerHTML;
          } else if (title) {
            var newTitle = title.innerHTML;
          } else {
            var newTitle = subtitle.innerHTML;
          }
          if (el.classList.contains('change-doctor')) {
            newTitle = 'Записаться на приём к врачу: ' + newTitle;
          }
          originalTop.innerHTML = newTitle;
        };
        // scrollWidthFunc();
        document.querySelector('html').classList.add('lock');
      }
    });
  });
  /* -- END POPUPS  -- */


  /*POLICY-PLASHKA*/
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  const cookiePolicy = document.querySelector('.cookie-policy');
  if (cookiePolicy) {
    if (getCookie('cookie-policyz') != "en") {
      cookiePolicy.classList.add('active');
      document.cookie = "cookie-policyz=dis";
      const btnsContainer = cookiePolicy.querySelector('.bottom-info__action');
      if (btnsContainer) {
        const btnsArr = btnsContainer.querySelectorAll('button');
        btnsArr.forEach(button => {
          button.addEventListener('click', evt => {
            cookiePolicy.classList.remove('active');
            setTimeout(() => {
              cookiePolicy.style.display = "none";
            }, 3000);
            document.cookie = "cookie-policyz=en";
          })
        })
      }
    } else if (getCookie('cookie-policyz') == "en") {
      cookiePolicy.style.display = "none";
    }
  }
  /* -- END POLICY-PLASHKA -- */


  /* -- POPUP CALCULATOR -- */
  const popupCalculator = document.querySelector('.popup_calculator');

  if (popupCalculator) {
    const serviceTitle = popupCalculator.querySelectorAll('.chose__top-container');
    const serviceContent = popupCalculator.querySelectorAll(".chose__bottom-container");

    if (serviceTitle && serviceContent) {
      tabs('.popup__chose-container', serviceTitle, serviceContent);
    }

    const item = popupCalculator.querySelector('.popup__chose-container');
    const categories = item.querySelectorAll('.chose__item');
    const listTitle = item.querySelector('.chose__subtitle');

    listTitle.textContent = categories[0].textContent;

    categories.forEach(category => {
      category.addEventListener('click', evt => {
        const categoryTitle = evt.target.textContent;
        listTitle.textContent = categoryTitle;
      })
    })
  }
  /* -- END POPUP CALCULATOR -- */


  /* -- TOTOP -- */
  const btnTop = document.querySelector('#toTop');
  if (btnTop) {
    document.addEventListener('scroll', evt => {
      if (window.scrollY > window.innerHeight) {
        if (!btnTop.classList.contains('active')) {
          btnTop.classList.add('active');
          setTimeout(() => {
            btnTop.style.opacity = 1;
          }, 0)
        }
      } else {
        if (btnTop.classList.contains('active')) {
          btnTop.style.opacity = 0;
          setTimeout(() => {
            btnTop.classList.remove('active');
          }, 0)
        }
      }
    })
    btnTop.addEventListener('click', evt => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })
  }
  /* -- END TOTOP -- */


  /* -- OBSERVER -- */
  const observer = new IntersectionObserver((entries) => {
    let animationDelay = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("animation-group")) {
          animationDelay = animationDelay + 100
        } else {
          animationDelay = 0;
        }
        setTimeout(() => {
          entry.target.classList.add("animated")
        }, animationDelay);
        observer.unobserve(entry.target)
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '50px',
  });

  const animatedItems = document.querySelectorAll(".to_animate")

  if (animatedItems.length > 0) {
    animatedItems.forEach(item => {
      observer.observe(item)
    })
  }
  /* -- END OBSERVER -- */


  //view photos fancybox
  Fancybox.bind("[data-fancybox]");

});

