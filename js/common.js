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
	var menu_elements = "nav.head ul li a"; 
	var menu_nav = document.getElementsByTagName('nav')[0];
	var menu_nav_offsetTop = menu_nav.offsetTop;
	var portfolio_wrapper = $('.portfolio_wrapper');

	window.onresize = function(event) {
		onScrollFixMenu();
		auto_w_to_h();
		check_db();
		setProjects();
		priceToBackup();
	};
	window.onscroll = function(event) {
		// onScrollActivateMenu();
		onScrollFixMenu();
	};
	
	onScrollFixMenu();
	priceToBackup();

//// isotope
	portfolio_wrapper.isotope({
		animationEngine: 'best-available',
		animationOptions: {
			duration: 200,
			queue: false
		},
		layoutMode: 'fitRows'
	});

	setProjects();
	$('#filters a').click(function() {
		$('#filters a').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
		portfolio_wrapper.isotope({
			filter: selector
		});
		setProjects();
		return false;
	});

//// tabs

	var tabs = ['#about'];

	for (var i = tabs.length - 1; i >= 0; i--){
		$(tabs[i] + " .tab_item").not(":first").hide();
		$(tabs[i] + " .wrapper_tabs .tab").eq(0).addClass("active");
	} 

	$(".wrapper_tabs .tab").click(function() {
		if(!$(this).hasClass('active')){
			var db_toggle = 'block';
			var wrapper_tabs = ($(this).parents('.wrapper_tabs'));
			
			if(wrapper_tabs.parent()[0].id == 'about')
				db_toggle = $('.row-h-o-md').css('display');
			
			wrapper_tabs.find(".tab").removeClass("active").eq($(this).index()).addClass("active");
			wrapper_tabs.find(".tab_item").hide().eq($(this).index()).css({'display' : db_toggle});

			if(wrapper_tabs.parent()[0].id == 'about')
				auto_w_to_h();
		}
	});

//// func
	function check_db(){
		$('section.wof .content').each(function(){
			if($(this).css('display') != 'none')	
				$(this).css({'display' : $('.row-h-o-md').css('display')});
		});

		var n = $('nav.head .wrap_ul');
		n.css('display', (n.css('z-index') == 1) ? 'block' : 'none');
	}

	function splitColumns() {
		var mW = $(window).width();
		return ((mW >= 1024) ? 4 : (mW > 900) ? 2 : (mW > 479) ? 2 : (mW < 479) ? 1 : 1);
	}
	
	function setColumns() {
		var winWidth = $(window).width(),
		columnNumb = splitColumns(),
		postWidth = Math.floor(winWidth / columnNumb);
		portfolio_wrapper.find('.ow-item').css({width: postWidth + 'px'});
	}

	function setProjects() {
		setColumns();
		portfolio_wrapper.isotope('reLayout');
	}

	function priceToBackup(){
		if($(window).width() <= 768 && $(window).width() > 480){
			$('.sybd .wrapper .active').clone().appendTo('.sybd .backup');
			$('.sybd .wrapper .active').hide(0);
		}
		if($(window).width() > 768 || $(window).width() < 480){
			$('.sybd .backup').empty();
			$('.sybd .wrapper .active').show(0);
			// alert('asd');
		}
	}

//// equal height
	// var eqElement = ".tab_item"
	// $(window).load(function(){equalheight(eqElement);}).resize(function(){equalheight(eqElement);});

//// Отмена нажатия на ссылку
	$('a.u-not-a').click(function(e){ e.preventDefault(); return false;});

//// фиксируется меню при прокрутке
	// if(document.getElementsByTagName('nav')[0].offsetTop){}
	function onScrollFixMenu(){
		var scroll_top = $(document).scrollTop();

		if (menu_nav_offsetTop <= scroll_top && menu_nav.style.position != 'fixed') {
			$('.pseudo_nav_head').show(0);
			menu_nav.style.position = 'fixed';
		} else	if (menu_nav_offsetTop > scroll_top && menu_nav.style.position == 'fixed') {
			$('.pseudo_nav_head').hide(0);
			menu_nav.style.position = 'static';
		}
	}
	// var options = {offset:document.getElementsByTagName('nav')[0].offsetTop}
	// var menu_top = new Headhesive(menu_selector, options);

//// прокрутка до якоря
	$(menu_elements).bind("click", function(e){

		$(menu_elements + ".active").removeClass("active");
		$(this).addClass("active");

		var hash = '#' + $(this).attr("href");

		$('html, body').stop().animate({
			scrollTop: ($(hash).offset().top - 60)
		}, 500, function(){
			// window.location.hash = hash;
		});

		if($('nav.head .wrap_ul').css('z-index') == 10) $('nav.head .wrap_ul').css('display', 'none');

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

//// video bg


	// scaleBannerVideoSize('.video-container video');
	window.onresize =  function() {
		// scaleBannerVideoSize('.video-container video');
	};

	function scaleBannerVideoSize(element){

		var windowWidth = $('.homepage-hero-module').width(),
		windowHeight = $('.homepage-hero-module').height() + 5,
		videoWidth,
		videoHeight;

		$(element).each(function(){
			var videoAspectRatio = $(this).data('height')/$(this).data('width');

			$(this).width(windowWidth);

			if(windowWidth < 1000){
				videoHeight = windowHeight;
				videoWidth = videoHeight / videoAspectRatio;
				$(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

				$(this).width(videoWidth).height(videoHeight);
			}

			$('.homepage-hero-module .video-container video').addClass('fadeIn animated');

		});
	}
//// player
	var controls = {
		video: $("video.u-bg-video"),
		playpause: $(".u-bg-video-pp"),
		togglePlayback: function() {
			(video.paused) ?(video.play(), editPaysePlay(true)) :(video.pause(), editPaysePlay(false));
		}
	};

	var video = controls.video[0];
	// нажатие на кнопку пуск/пауза
	controls.playpause.click(function(){
		controls.togglePlayback();
	});

	video.addEventListener("canplay", function() {
		// video.play();
		// editPaysePlay(true);
	}, false);

	var editPaysePlay = function(what){
		controls.playpause.removeClass('fa-' + ((what) ? 'play' : 'pause') + '-circle-o');
		controls.playpause.addClass('fa-' + ((what) ? 'pause' : 'play') + '-circle-o');
	}

//// auto width to height
	auto_w_to_h();

	function auto_w_to_h(){
		$('.auto_w_to_h').each(function(){
			var w = Math.ceil($(this).parent().width());
			$(this).css({
				width : w + 'px',
				height : Math.ceil((w / 1.7)) + 'px'
			});
		});
	}

//// image auto height/width
	img_to_bg();

	function img_to_bg(){
			// document.getElementsByClassName('u-a-wh').offsetHeight;
			$('.u-img-ow-bg').each(function(){
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

	// menu toogle
	$('.menu-toogle').click(function(){
		$('nav.head .wrap_ul').slideToggle();
	});
});