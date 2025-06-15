
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

})(jQuery);
