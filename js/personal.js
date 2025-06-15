
(function($) {
  "use strict";

  function initializePage() {
    $(".page__content").find(".hero__image").imagesLoaded({ background: true }, function () {
      $(".portfolio-wrap").imagesLoaded(function () {
        $(".portfolio-wrap").masonry({ itemSelector: ".portfolio-item", transitionDuration: 0 });
      });
      $(".blog-wrap").imagesLoaded(function () {
        $(".blog-wrap").masonry({ itemSelector: ".blog-post", transitionDuration: 0 });
      });
      $("body").removeClass("loading");
      $("body").removeClass("menu--open");
    });

    $(".active-link").removeClass("active-link");
    $('a[href="' + pageUrl + '"]').addClass("active-link");

    Waypoint.destroyAll();

    var galleryCount = 0;
    $(".gallery").each(function () {
      var gallery = $(this),
          galleryId = "gallery-" + ++galleryCount,
          columns = gallery.attr("data-columns");

      gallery.attr("id", galleryId);
      gallery.append('<div class="gallery__wrap"></div>');
      gallery.children("img").each(function () {
        $(this).appendTo("#" + galleryId + " .gallery__wrap");
      });

      gallery.find(".gallery__wrap img").each(function () {
        var src = $(this).attr("src");
        $(this).wrapAll('<div class="gallery__item"><a href="' + src + '" class="gallery__item__link"></a></div>');
      });

      gallery.imagesLoaded(function () {
        if (columns === "1") {
          gallery.addClass("gallery--carousel");
          gallery.children(".gallery__wrap").addClass("owl-carousel").owlCarousel({
            items: 1,
            loop: true,
            mouseDrag: false,
            touchDrag: true,
            pullDrag: false,
            dots: true,
            autoplay: false,
            autoplayTimeout: 6000,
            autoHeight: true,
            animateOut: "fadeOut"
          });

          new Waypoint({
            element: document.getElementById(galleryId),
            handler: function (direction) {
              gallery.children(".gallery__wrap").trigger(direction === "down" ? "stop.owl.autoplay" : "play.owl.autoplay");
            },
            offset: "-100%"
          });

          new Waypoint({
            element: document.getElementById(galleryId),
            handler: function (direction) {
              gallery.children(".gallery__wrap").trigger(direction === "down" ? "play.owl.autoplay" : "stop.owl.autoplay");
            },
            offset: "100%"
          });

        } else {
          gallery.addClass("gallery--grid");
          gallery.children(".gallery__wrap").masonry({ itemSelector: ".gallery__item", transitionDuration: 0 });
          gallery.find(".gallery__item__link").fluidbox({ loader: true });
        }

        gallery.addClass("gallery--on");
      });
    });

    $(".single p > img").each(function () {
      var parent = $(this).parent("p");
      $(this).insertAfter(parent).wrapAll('<div class="image-wrap"></div>');
      parent.remove();
    });

    $(".single iframe").each(function () {
      if ($(this).attr("src").includes("youtube") || $(this).attr("src").includes("vimeo")) {
        var width = $(this).attr("width"),
            ratio = $(this).attr("height") / width * 100;
        $(this).wrapAll('<div class="video-wrap"><div class="video" style="padding-bottom:' + ratio + '%;"></div></div>');
      }
    });

    $(".single table").each(function () {
      $(this).wrapAll('<div class="table-wrap"></div>');
    });

    // Function to render expandable alumni list
// Load alumni.yml and render
fetch('/assets/data/alumni.yml')
  .then(response => response.text())
  .then(yamlText => {
    const alumniData = jsyaml.load(yamlText);
    renderAlumniList(alumniData);
  })
  .catch(err => console.error('Error loading alumni.yml:', err));
    function renderAlumniList(alumniData) {
      const container = document.createElement('div');
      container.classList.add('alumni-section');

      const title = document.createElement('h2');
      title.textContent = 'Alumni';
      container.appendChild(title);

      const list = document.createElement('ul');
      list.classList.add('alumni-list');

      alumniData.forEach(person => {
        const item = document.createElement('li');
        let content = person.name || '';

        if (person.dates) {
          content += ' (' + person.dates + ')';
        }

        if (person.email) {
          content += ' — <a href="mailto:' + person.email + '">' + person.email + '</a>';
        }

        if (person.website) {
          content += ' — <a href="' + person.website + '" target="_blank">Website</a>';
        }

        item.innerHTML = content;
        list.appendChild(item);
      });

      container.appendChild(list);
      document.querySelector('.page__content').appendChild(container);
    }

    fetch('/assets/data/alumni.yml')
      .then(response => response.text())
      .then(yamlText => {
        const alumniData = jsyaml.load(yamlText);
        renderAlumniList(alumniData);
      })
      .catch(err => console.error('Error loading alumni.yml:', err));
  }

  var pageUrl = $("body").attr("data-page-url"),
      pageTitle = document.title,
      HistoryAPI = window.History;

  HistoryAPI.Adapter.bind(window, "statechange", function () {
    var State = HistoryAPI.getState();
    $("body").addClass("loading");
    $(".page-loader").load(State.hash + " .page__content", function () {
      $("body, html").animate({ scrollTop: 0 }, 300);
      setTimeout(function () {
        $(".page .page__content").remove();
        $(".page-loader .page__content").appendTo(".page");
        $("body").attr("data-page-url", window.location.pathname);
        pageUrl = $("body").attr("data-page-url");
        pageTitle = $(".page__content").attr("data-page-title");
        document.title = pageTitle;
        initializePage();
      }, 400);
    });
  });

  if ($("body").hasClass("ajax-loading")) {
    $(document).on("click", "a", function (e) {
      var href = $(this).attr("href");
      if (!$(this).hasClass("js-no-ajax") && !href.includes("#") && !href.startsWith("mailto:") && !href.startsWith("tel:") && !$(this).is(".gallery__item__link")) {
        e.preventDefault();
        if (href.startsWith("http")) {
          window.open(href, "_blank");
        } else {
          pageUrl = href;
          HistoryAPI.pushState(null, pageTitle, href);
        }
      }
    });
  }

  initializePage();

  $(document).on("click", ".js-menu-toggle", function () {
    $("body").toggleClass("menu--open");
  });

  $(document).on("click", ".menu__list__item__link", function () {
    if ($(".menu").hasClass("menu--open")) {
      $(".menu").removeClass("menu--open");
    }
  });

  $(document).on("click", ".post", function () {
    var href = $(this).find(".post__title a").attr("href");
    if ($("body").hasClass("ajax-loading")) {
      pageUrl = href;
      HistoryAPI.pushState(null, pageTitle, href);
    } else {
      window.location = href;
    }
  });

  $(document).on("submit", "#contact-form", function (e) {
    $(".contact-form__item--error").removeClass("contact-form__item--error");
    var email = $('.contact-form__input[name="email"]'),
        name = $('.contact-form__input[name="name"]'),
        message = $('.contact-form__textarea[name="message"]'),
        gotcha = $(".contact-form__gotcha");

    if (!email.val()) email.closest(".contact-form__item").addClass("contact-form__item--error");
    if (!name.val()) name.closest(".contact-form__item").addClass("contact-form__item--error");
    if (!message.val()) message.closest(".contact-form__item").addClass("contact-form__item--error");

    if (!email.val() || !name.val() || !message.val() || gotcha.val().length !== 0) {
      e.preventDefault();
    }
  });

})(jQuery);
