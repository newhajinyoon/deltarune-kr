// vendor

$.fancybox.defaults.buttons = ['close'];
$.fancybox.defaults.infobar = false;
dayjs.extend(window.dayjs_plugin_relativeTime)


// the good stuff

var side_image = 0;
var cool_gifs = ['cash1.gif', 'cash2.gif', 'cash3.gif', 'cash1.gif', 'email1.gif', 'email2.gif', 'email3.gif', 'free1.gif', 'free2.gif', 'free3.gif', 'free4.gif', 'free5.gif', 'freemoney.gif', 'thanks1.gif', 'thanks2.gif', 'thanks3.gif', 'cool.gif', 'new.gif'];

function createOrUpdateMarquee() {
  var marquee = $("#marquee_container .marquee").first();
  if (marquee.length > 0) {
    // Marquee exists, nothing to do
  } else {
    // Fresh reload, create marquee
    $("#marquee_container").append("<div class='text-center d-block yellow w-100 pt-1' style='font-size: 24px'></div>");
  }
}

function shuffleGifs() {
  var containers = $('.gif-container').length;
  $('.gif-container').html('');
  for (var gifs = 0; gifs < containers; gifs++) {
    addGifToContainer($('.gif-container').eq(gifs));
    addGifToContainer($('.gif-container').eq(gifs));
  }
  for (var sprinkles = 0; sprinkles < containers; sprinkles++) {
    addGifToContainer($('.gif-container').eq(getRandomInt(0, containers)));
  }
}

function addGifToContainer(container) {
  var random_gif = '/assets/images/coolgifs/' + cool_gifs[getRandomInt(0, cool_gifs.length)];
  var random_top = getRandomInt(0, 80);
  var random_left = getRandomInt(0, 50);
  var random_rotation = getRandomInt(-20, 20);
  container.append("<img src='" + random_gif + "' style='top: " + random_top + "%; left: " + random_left + "%; transform: rotate(" + random_rotation + "deg);' aria-hidden='true' />");
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffleBanners() {
  $('#random_banner .banner').addClass('hidden');
  $('#random_banner .banner').eq(getRandomInt(0, $('#random_banner .banner').length)).removeClass('hidden');
}

function shuffleSides() {
  $('.big-money img').addClass('hidden');
  side_image += 1;
  if (side_image >= $('#big_money img').length) {
    side_image = 0;
  }
  $('#big_money img').eq(side_image).removeClass('hidden');
  $('#big_money_flip img').eq(side_image).removeClass('hidden');
}

$(document).ready(function() {
  createOrUpdateMarquee();
  shuffleGifs();
  shuffleBanners();
  shuffleSides();
});

// Lazyload video on modal open
$(document).on('show.bs.modal', '.modal', function() {
  if ($(this).find('.video source').length == 0 && $(this).data('webm') !== null && $(this).data('mp4') !== null) {
    $(this).find(".video").append("<source src='" + $(this).data('webm') + "' type='video/webm'>");
    $(this).find(".video").append("<source src='" + $(this).data('mp4') + "' type='video/mp4'>");
  }
});
