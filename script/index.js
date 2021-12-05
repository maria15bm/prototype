
$("#sign-popup").hide()
$('#sign-btn').click(function() {
	$("#sign-popup").show()
})

$(document).ready(function() {
	$("#pop-up-comments").hide()

	if ($(window).width() < 601){
			$('#nav-header-menu').hide();
	}

	// Show always the navigation menu for tablet and desktop
	$(window).resize(function(){
		if ($(window).width() > 601){
			$('#nav-header-menu').show();
		}
	})
	// In mobile version, a button shows and hides the navigation menu.
	$('#show-menu').click(function() {
		if ($('#nav-header-menu').is(':hidden')){
			$('#nav-header-menu').show();
		} else {
			$('#nav-header-menu').hide();
		}
	})

	// A close button will close its pop up.
	$(".close-btn").click(function(){
		$(this).parent().hide()
	})

	$("#see-comments").click(function(){
		$("#pop-up-comments").show()
	})

	// The images in the experiences are displayed using a photoroulette
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
		obj1.addClass('obj5');
		obj2.addClass('obj1');
		obj3.addClass('obj2');
		obj4.addClass('obj3');
		obj5.addClass('obj4');
	})

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
		obj1.addClass('obj2');
		obj2.addClass('obj3');
		obj3.addClass('obj4');
		obj4.addClass('obj5');
		obj5.addClass('obj1');
	})

	/* Comments posting when chicking the send button. */
	$(".send-btn").click(function(){
		/* Check if sign up */
		var comment_val = $(this).parent().children('input').val();
		/* Get name and user from cookies. */
		var user_val = 'userx'
		var name_val = 'Name'
		var newcomment = $("<article class='comment col-s-11'></article>");
		var name = $("<p class='col-s-6'></p>").html(name_val);
		var user = $("<h3 class='col-s-6'></h3>").html('@'+user_val);
		var com_text = $("<p class='col-s-12'></p>").html(comment_val);
		newcomment.append(name, user, com_text);
		var separator = $("<img class='separator col-s-11' src='images/separator_comments.png'>");
		$("#comment-sect").append(separator, newcomment);
	})
})

