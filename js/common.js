$(document).ready(function() {
// console.log('Umbokc');

////Цели для Яндекс.Метрики и Google Analytics
	$(".count_element").on("click", (function() {
		ga("send", "event", "goal", "goal");
		yaCounterXXXXXXXX.reachGoal("goal");
		return true;
	}));

////Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#form").submit(function(e) {
		e.preventDefault;
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
	});

//// переменные
	var menu_selector = "nav.head"; 
	var menu_elements = menu_selector + " ul li a"; 
	window.onresize = function(event) {};
	window.onscroll = function(event) {
		// onScrollActivateMenu();
	};


//// Отмена нажатия на ссылку
	$('a.u-not-a').click(function(e){ e.preventDefault(); return false;});

//// фиксируется меню при прокрутке
	var options = {offset:document.getElementsByTagName('nav')[0].offsetTop}
	var menu_top = new Headhesive(menu_selector, options);

//// прокрутка до якоря
	$(menu_elements).bind("click", function(e){

		$(menu_elements + ".active").removeClass("active");
		$(this).addClass("active");

		var hash = '#' + $(this).attr("href");

		$('html, body').stop().animate({
			scrollTop: $(hash).offset().top
		}, 500, function(){
			window.location.hash = hash;
		});

		e.preventDefault();
		return false;
	});

//// активный эелемент меню при прокрутке
	function onScrollActivateMenu(){
		var scroll_top = $(document).scrollTop();
		$(menu_elements).each(function(){
			var hash = $(this).attr("href");
			var target = document.getElementById(hash);
			if (target.offsetTop <= scroll_top && (target.offsetTop + target.offsetHeight) > scroll_top) {
				$(this).addClass("active");
			} else {
				$(this).removeClass("active");
			}
		});
	}


// //// video bg
// 	scaleVideoContainer();

// 	initBannerVideoSize('.video-container .poster img');
// 	initBannerVideoSize('.video-container .filter');
// 	initBannerVideoSize('.video-container video');

// 	window.onresize =  function() {
// 		scaleVideoContainer();
// 		scaleBannerVideoSize('.video-container .poster img');
// 		scaleBannerVideoSize('.video-container .filter');
// 		scaleBannerVideoSize('.video-container video');
// 	};

// 	function scaleVideoContainer() {
// 		var height = $(window).height() + 5;
// 		var unitHeight = parseInt(height) + 'px';
// 		$('.homepage-hero-module').css('height',unitHeight);
// 	}
// 	function initBannerVideoSize(element){

// 		$(element).each(function(){
// 			$(this).data('height', $(this).height());
// 			$(this).data('width', $(this).width());
// 		});

// 		scaleBannerVideoSize(element);
// 	}
// 	function scaleBannerVideoSize(element){

// 		var windowWidth = $(window).width(),
// 		windowHeight = $(window).height() + 5,
// 		videoWidth,
// 		videoHeight;

// 		$(element).each(function(){
// 			var videoAspectRatio = $(this).data('height')/$(this).data('width');

// 			$(this).width(windowWidth);

// 			if(windowWidth < 1000){
// 				videoHeight = windowHeight;
// 				videoWidth = videoHeight / videoAspectRatio;
// 				$(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

// 				$(this).width(videoWidth).height(videoHeight);
// 			}

// 			$('.homepage-hero-module .video-container video').addClass('fadeIn animated');

// 		});
// 	}
// //// player
// 	var controls = {
// 		video: $("video.u-bg-video"),
// 		playpause: $(".u-bg-video-pp"),
// 		togglePlayback: function() {
// 			(video.paused) ?(video.play(), editPaysePlay(true)) :(video.pause(), editPaysePlay(false));
// 		}          
// 	};

// 	var video = controls.video[0];
// 	// нажатие на кнопку пуск/пауза
// 	controls.playpause.click(function(){
// 		controls.togglePlayback();
// 	});

// 	// video.addEventListener("canplay", function() {
// 	// 	video.play();
// 	// 	editPaysePlay(true);
// 	// }, false);

// 	var editPaysePlay = function(what){
// 		controls.playpause.removeClass('fa-' + ((what) ? 'play' : 'pause') + '-circle-o');
// 		controls.playpause.addClass('fa-' + ((what) ? 'pause' : 'play') + '-circle-o');
// 	}

//// image auto height/width
	img_auto_wdth_height();
	
	function img_auto_wdth_height(){
		// document.getElementsByClassName('u-a-wh').offsetHeight;
		$('a.u-img-ow-bg').each(function(){
			// var w = Math.ceil($(this).parents('.u-img-awh-p').width());
			// var h = Math.ceil($(this).parents('.u-img-awh-p').height());
			// $(this).attr({'src':'https://placehold.it/'+ w +'x' + h});
			var img = $(this).find('img');
			$(this).css({
				'background-image': 'url(' + img.attr('src') + ')'
			});
		});
	}

////portfolio auto height/width
//// slider
	$('.slider').unslider({
		animation: 'vertical',
		autoplay: true,
		infinite: true,
		arrows: false
	});

});