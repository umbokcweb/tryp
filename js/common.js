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

//// Отмена нажатия на ссылку
	$('a[u-na]').click(function(e){ e.preventDefault(); return false;});

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
	function onScroll(){
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

	$(document).on("scroll", onScroll);

});