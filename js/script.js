jQuery(function($) {
// Search
var $searchWrap = $('#search-form-wrap'),
isSearchAnim = false,
searchAnimDuration = 200;

var startSearchAnim = function(){
isSearchAnim = true;
};

var stopSearchAnim = function(callback){
setTimeout(function(){
  isSearchAnim = false;
  callback && callback();
}, searchAnimDuration);
};

$('.nav-search-btn').on('click', function(){
if (isSearchAnim) return;

startSearchAnim();
$searchWrap.addClass('on');
stopSearchAnim(function(){
  $('.search-form-input').focus();
});
});

$('.search-form-input').on('blur', function(){
startSearchAnim();
$searchWrap.removeClass('on');
stopSearchAnim();
});

// Share
$('body').on('click', function(){
$('.article-share-box.on').removeClass('on');
}).on('click', '.article-share-link', function(e){
e.stopPropagation();

var $this = $(this),
  url = $this.attr('data-url'),
  encodedUrl = encodeURIComponent(url),
  id = 'article-share-box-' + $this.attr('data-id'),
  title = $this.attr('data-title'),
  offset = $this.offset();

if ($('#' + id).length){
  var box = $('#' + id);

  if (box.hasClass('on')){
    box.removeClass('on');
    return;
  }
} else {
  var html = [
    '<div id="' + id + '" class="article-share-box">',
      '<input class="article-share-input" value="' + url + '">',
      '<div class="article-share-links">',
        '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"><span class="fa fa-twitter"></span></a>',
        '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"><span class="fa fa-facebook"></span></a>',
        '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"><span class="fa fa-pinterest"></span></a>',
        '<a href="https://www.linkedin.com/shareArticle?mini=true&url=' + encodedUrl + '" class="article-share-linkedin" target="_blank" title="LinkedIn"><span class="fa fa-linkedin"></span></a>',
      '</div>',
    '</div>'
  ].join('');

  var box = $(html);

  $('body').append(box);
}

$('.article-share-box.on').hide();

box.css({
  top: offset.top + 25,
  left: offset.left
}).addClass('on');
}).on('click', '.article-share-box', function(e){
e.stopPropagation();
}).on('click', '.article-share-box-input', function(){
$(this).select();
}).on('click', '.article-share-box-link', function(e){
e.preventDefault();
e.stopPropagation();

window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
});

// Caption
$('.article-entry').each(function(i){
$(this).find('img').each(function(){
  if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a')) return;

  var alt = this.alt;

  if (alt) $(this).after('<span class="caption">' + alt + '</span>');

  $(this).wrap('<a href="' + this.src + '" data-fancybox=\"gallery\" data-caption="' + alt + '"></a>')
});

$(this).find('.fancybox').each(function(){
  $(this).attr('rel', 'article' + i);
});
});

if ($.fancybox){
$('.fancybox').fancybox();
}

// Mobile nav
var $container = $('#container'),
isMobileNavAnim = false,
mobileNavAnimDuration = 200;

var startMobileNavAnim = function(){
isMobileNavAnim = true;
};

var stopMobileNavAnim = function(){
setTimeout(function(){
  isMobileNavAnim = false;
}, mobileNavAnimDuration);
}

$('#main-nav-toggle').on('click', function(){
if (isMobileNavAnim) return;

startMobileNavAnim();
$container.toggleClass('mobile-nav-on');
stopMobileNavAnim();
});

$('#wrap').on('click', function(){
if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

$container.removeClass('mobile-nav-on');
});



  var html = $('html');
  var viewport = $(window);

/* ==========================================================================
   Menu
   ========================================================================== */

  function menu() {
    html.toggleClass('menu-active');
  };

  $('#menu').on({
    'click': function() {
      menu();
    }
  });

  $('.nav-menu').on({
    'click': function() {
      menu();
    }
  });

  $('.nav-close').on({
    'click': function() {
      menu();
    }
  });

  viewport.on({
    'resize': function() {
      html.removeClass('menu-active');
    },
    'orientationchange': function() {
      html.removeClass('menu-active');
    }
  });

/* ==========================================================================
   Parallax cover
   ========================================================================== */

  var cover = $('.cover');
  var coverPosition = 0;

  function prlx() {
    if (cover.length >= 1) {
      var windowPosition = viewport.scrollTop();
      (windowPosition > 0) ? coverPosition = Math.floor(windowPosition * 0.25): coverPosition = 0;
      cover.css({
        '-webkit-transform': 'translate3d(0, ' + coverPosition + 'px, 0)',
        'transform': 'translate3d(0, ' + coverPosition + 'px, 0)'
      });
      (viewport.scrollTop() < cover.height()) ? html.addClass('cover-active'): html.removeClass('cover-active');
    }
  }
  prlx();

  viewport.on({
    'scroll': function() {
      prlx();
    },
    'resize': function() {
      prlx();
    },
    'orientationchange': function() {
      prlx();
    }
  });

/* ==========================================================================
   Gallery
   ========================================================================== */

  function gallery() {
    'use strict';
    var images = document.querySelectorAll('.kg-gallery-image img');
    images.forEach(function(image) {
      var container = image.closest('.kg-gallery-image');
      var width = image.attributes.width.value;
      var height = image.attributes.height.value;
      var ratio = width / height;
      container.style.flex = ratio + ' 1 0%';
    });
  }
  gallery();


/* ==========================================================================
   Theme
   ========================================================================== */

  function theme() {
    'use strict';
    var toggle = $('.js-theme');
    var toggleText = toggle.find('.theme-text');

    function system() {
      html.removeClass(['theme-dark', 'theme-light']);
      localStorage.removeItem('attila_theme');
      toggleText.text(toggle.attr('data-system'));
    }

    function dark() {
      html.removeClass('theme-light').addClass('theme-dark');
      localStorage.setItem('attila_theme', 'dark');
      toggleText.text(toggle.attr('data-dark'));
    }

    function light() {
      html.removeClass('theme-dark').addClass('theme-light');
      localStorage.setItem('attila_theme', 'light');
      toggleText.text(toggle.attr('data-light'));
    }

    switch (localStorage.getItem('attila_theme')) {
      case 'dark':
        dark();
      break;
      case 'light':
        light();
      break;
      default:
        system();
      break;
    }

    toggle.on('click', function (e) {
      e.preventDefault();

      if (!html.hasClass('theme-dark') && !html.hasClass('theme-light')) {
        dark();
      } else if (html.hasClass('theme-dark')) {
        light();
      } else {
        system();
      }
    });
  }
  theme();
});




