var filter_list = ["filter 1", "filter 2"];

$(document).ready(function() {
	$("#pop-up-comments").hide();
	$("#sign-popup").hide();

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

	// esto va dentro del document ready
	$('#sign-btn').click(function() {
		$("#sign-popup").show();
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

	/* Filter in las experiences. */
	$("#add-filter-btn").click(function(){
		if($("#filter-input").val()!== ""){
			var value = $("#filter-input").val().toLowerCase();
			filter_list.push(value);
		    $(".experience").filter(function() {
		    	for(var i = 0; i < filter_list.length; i++){
		      		$(this).toggle($(this).text().toLowerCase().indexOf(filter_list[i]) > -1);
		    	}
			});
			// agregar cosito del filtro + botón de borrar.
		}
	})
})


// function in sign in to creaate cookie
function get_values() {
	const username = $("#username").val();
	let password;
	let password1 = $("#password").val();
	let password2 = $("#password-confirm").val();
	if (password1 !== password2){
		alert("The passwords don't match")
	}
	else {
		password = password1
		const name = $("#name").val();
		let email = $("#email").val();
		let profile = "images/user.jpg";
		const interested = $("#interested").val();
		const terms = $("#Terms").val();
		const exdays = 190;
		//check pattern of the inputs
		var passwregex = /^[a-z0-9]{0,8}$/;
		var emailregex = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]$/;
		if (password.match(passwregex) && email.match(emailregex)) {
			setCookie(username, password, name, email, profile, interested, terms, exdays);
		}
	}
}

function setCookie(username, password, name, email, image,interests="", acepted, exdays) {
	if  (getCookie(email) !== "") {
		//if mail does not exist
		alert("Email allready registered");
	}
	else {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + d.toUTCString();
		//two cookies one for all data and the other for the image
		var cvalue = [username, password, name,image , interests, acepted];
		document.cookie = email + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	console.log(cname);
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			console.log(c.substring(name.length, c.length));
			return c.substring(name.length, c.length);
		}
	}
	// if cookie does not exist
	return "";
}

//in log in
function get_values2(){
	var mail = $("#email_login").val();
	const password = $("#password_login").val();
	const value=getCookie(mail);
	if (value !== "") {
		let val = value.split(',');
		//if log in is correct
		if (val[1] === password) {
			const username = val[0];
			const profile = val[3];
			//let profile= photo;
			$("#username_").html(username);
			$("#profile_").html(profile);
			//hide main page
			//show registered
		}
	}
		else {
				alert("Email not registered");
			}
}