$(document).ready(function() {
	$('#show-menu').click(function() {
		if ($('#nav-header-menu').is(':hidden')){
			$('#nav-header-menu').show();
		} else {
			$('#nav-header-menu').hide();
		}
	})

	// The images in the experiences are displayed using a photoroulette
	$(".arr-left").click(function(){
		let art = $(this).parent();
		let objs = $(art).children('div');
		var obj1 = $(objs).children('.obj1');
		var obj2 = $(objs).children('.obj2');
		var obj3 = $(objs).children('.obj3');
		var obj4 = $(objs).children('.obj4');
		var obj5 = $(objs).children('.obj5');
		obj1.removeClass('obj1');
		obj2.removeClass('obj2');
		obj3.removeClass('obj3');
		obj4.removeClass('obj4');
		obj5.removeClass('obj5');
		obj1.addClass('obj5');
		obj2.addClass('obj1');
		obj3.addClass('obj2');
		obj4.addClass('obj3');
		obj5.addClass('obj4');
	})

	$(".arr-right").click(function(){
		let art = $(this).parent();
		let objs = $(art).children('div');
		var obj1 = $(objs).children('.obj1');
		var obj2 = $(objs).children('.obj2');
		var obj3 = $(objs).children('.obj3');
		var obj4 = $(objs).children('.obj4');
		var obj5 = $(objs).children('.obj5');
		obj1.removeClass('obj1');
		obj2.removeClass('obj2');
		obj3.removeClass('obj3');
		obj4.removeClass('obj4');
		obj5.removeClass('obj5');
		obj1.addClass('obj2');
		obj2.addClass('obj3');
		obj3.addClass('obj4');
		obj4.addClass('obj5');
		obj5.addClass('obj1');
	})
})