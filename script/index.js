var filter_list = ["filter 1", "filter 2"];

/* Updates the filter in last experiences using the values in filter_list*/
function updateFilter() {
	$(".experience").filter(function() {
		if (filter_list.length>0){
			for(var i = 0; i < filter_list.length; i++){
		  		$(this).toggle($(this).text().toLowerCase().indexOf(filter_list[i]) > -1);
			}
		} else{
			// If filter_list is empty, every experience is shown.
			$(".experience").each(function(){
				$(this).show();
			});
		}

	})
}

/* Deletes a filter in last experiences */
function deleteFilter(filter){
	var value = $(filter).parent().children("p").html();
	filter_list = filter_list.filter(function(item) {
	    return item !== value
	})
	updateFilter();
	console.log(filter_list);
	$(filter).parent().remove();

}



$(document).ready(function() {
	if (check_loged("loged") == ""){
		$("#pop-up-comments").hide();
		$("#login-popup").hide();
		$("#sign-popup").hide();
		$("#please-popup").hide();
		$("#registered").hide();
		$("#registered-bts").hide();
		$("#logout-popup").hide();
		$('#messages-popup').hide();
	}
	else{
		$("#pop-up-comments").hide();
		$("#login-popup").hide();
		$("#sign-popup").hide();
		$("#please-popup").hide();
		$("#registered").show();
		$("#main").hide();
		$("#main-bts").hide();
		$("#logout-popup").hide();
		$('#messages-popup').hide();
		show_username_profile();
		upload_data_profile();

	}
	if ($(window).width() < 601){
			$('#nav-header-menu').hide();
	}

	$("#search-input").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#myList li").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

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

	// log in and sign in pop ups
	$('#log-btn').click(function() {
		$("#login-popup").show();
		$("#sign-popup").hide();
		$('#submit-login').click(function() {
			get_values2();
		})
	})
	$('#sign-btn').click(function() {
		$("#sign-popup").show();
		$("#login-popup").hide();
		$('#submit-sign').click(function() {
			get_values();
		})
	})
	$('#log-out-btn').click(function (){
		$("#logout-popup").show();
		$("#stay").click(function() {
			$("#logout-popup").hide();
		})
		$("#logout").click(function() {
			delete_or_create_loged("");
			location.reload();
		})
	})
	$('#image_mes').click(function () {
		$('#messages-popup').show();
	})
	$('#profile-btn').click(function (){
		window.location="profile.html"

	})
	$('#link-sign').click(function() {
		$("#sign-popup").show();
		$("#login-popup").hide();
		$('#submit-sign').click(function() {
			get_values();
		})
	})
	$('#log-please-btn').click(function() {
		$("#login-popup").show();
		$("#sign-popup").hide();
		$("#please-popup").hide();
		$('#submit-login').click(function() {
			get_values2();
		})
	})
	$('#sign-please-btn').click(function() {
		$("#sign-popup").show();
		$("#login-popup").hide();
		$("#please-popup").hide();
		$('#submit-sign').click(function() {
			get_values();
		})
	})
	$(".exit-button").click(function(){
		$(".exit-button").closest(".popup").css("display", "none");
	})
	// mobile version
	$('#log-in-menu-btn').click(function() {
		$("#login-popup").show();
		$("#sign-popup").hide();
		$('#profile-info').submit(function() {
			get_values2();
		})
	})
	$('#sign-in-menu-btn').click(function() {
		$("#sign-popup").show();
		$("#login-popup").hide();
		$('#signup-popup').submit(function() {
			get_values();
		})
	})

	$(".exit-button").click(function(){
    var $id = $(".exit-button").closest(".popup").css("display", "none");
  })

  $("#change-pfp-begin").click(function () {
    $("#change-pfp").css("display", "block");
  })

  $("#mod-but").click(function () {
    $("#modify-profile").css("display", "block");
  })

  $("#inter-but").click(function () {
    $("#change-interests").css("display", "block");
  })

  $('#new-pfp-in').on('input', function() {
    var pic = document.getElementById('new-pfp-in').files[0];
    pic = URL.createObjectURL(pic);
    $("#pfpp-2").prop("src", pic);
  });

  var e = new Event("look", {"cancelable":true});
  $("#new-picture").submit(function(e) {
	  var pic = document.getElementById('new-pfp-in').files[0];
	pic = URL.createObjectURL(pic);
	console.log("pic");
	update_image(pic);
	$("#change-pfp").hide();
  })

	// A close button will close its pop up.
	$(".close-btn").click(function(){
		$(this).parent().hide()
	})

	$("#see-comments").click(function(){
		$("#pop-up-comments").show()
	})

	$("#myList li a").hide();
	//search bar
	$("#search-input").on("keyup", function() {
		if($("#search-input").val() !== ""){
			$("#myList li a").filter(function() {
				$(this).show();
			});
		}else{
			$("#myList li a").hide();
		}
	});

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
		if (getCookie("loged") !== "") {
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
		} else {
			$("#please-popup").show();
			$("#pop-up-comments").hide();
		}
	})

	/* Filter in last experiences. */
	$("#add-filter-btn").click(function(){
		if($("#filter-input").val()!== ""){
			var value = $("#filter-input").val().toLowerCase();
			filter_list.push(value);
			updateFilter();
			var newfilter = $("<div class = filter></div>");
			var newval = $("<p></p>").html(value);
			var button = $("<button class='delete-filter'>x</button>");
			button.attr('onclick', 'deleteFilter(this)');
			newfilter.append(newval, button);
			$("#filters").append(newfilter);
		}
	})

	$("#like-img").click(function(){
		if (getCookie("loged") !== "") {
			var value = parseInt($(this).parent().children("h4").html());
			if ($(this).attr("src")==="images/like.png"){
				value -=1;
				$(this).attr("src", "images/like_sin_dar.png");
			} else {
				value+=1;
				$(this).attr("src", "images/like.png");
			}
			$(this).parent().children("h4").html(value.toString());
		} else{
			$("#please-popup").show();
		}
	})
})


// function in sign in to create cookie
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
		let birth = $("#birth").val();
		let profile = "images/user.jpg";
		const interest1= $("#interest-1").val();
		const interest2 = $("#interest-2").val();
		const interest3 = $("#interest-3").val();
		const interest4 = $("#interest-4").val();
		const interest5 = $("#interest-5").val();
		const exdays = 190;
		//check pattern of the inputs
		var passwregex = /^[a-z0-9]{0,8}$/;
		var emailregex = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]$/;
		if (password.match(passwregex) && email.match(emailregex)) {
			if (password1 == "" || password2 == "" || name == "" || username == "" || email==""){
				alert("Some required fields are empty");
			}
			else {
				register = email;
				console.log(register);
				if (setCookie(username, password, name, email, profile, birth, interest1, interest2,interest3, interest4, interest5, exdays) === true){
					delete_or_create_loged(email);

					location.reload();
				}
			}
		}
		else{
			alert("Format incorrect");
		}
	}
}

function setCookie(username, password, name, email, image,birth ,interest1="",interest2="",interest3="",interest4="",interest5="", exdays) {
	if (getCookie(email) == "") {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + d.toUTCString();
		//two cookies one for all data and the other for the image
		var cvalue = [username, password, name, image,birth,interest1, interest2,interest3,interest4,interest5];
		document.cookie = email + "=" + cvalue + ";" + expires + ";path=/";
		return true;

	}
	else{
		alert("Email allready registered, log in");
		return false;

	}
}
function show_username_profile(){
	let val=check_loged("loged");
	let values=getCookie(val);
	let data = values.split(",");
	$("#username_show").html(data[0]);
	$("#profile_show").html(data[3]);
}

function update_image(pic){
	let val=check_loged("loged");
	let values=getCookie(val);
	let data = values.split(",");
	const exdays = 190;
	const d = new Date();
	console.log(pic);
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	//two cookies one for all data and the other for the image
	var cvalue = [data[0],data[1],data[2], val,pic, data[4],data[5],data[6],data[7],data[8],data[9]];
	document.cookie = email + "=" + cvalue + ";" + expires + ";path=/";
}

function check_loged(loged) {
	let value = getCookie(loged);
	let val = value.split(',');
	return val[0];
}

function delete_or_create_loged(email) {
	//create cookie loged
	exdays = 50000;
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	let loged = "loged";
	document.cookie = loged + "=" + email + ";" + expires + ";path=/";

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
	var mail = $("#email-login").val();
	const password = $("#password-login").val();
	const value=getCookie(mail);
	if (password == "" || mail == "" ) {
		alert("Some required fields are empty");
	}
	else{
		var passwregex = /^[a-z0-9]{0,8}$/;
		if (password.match(passwregex)){
			if (value === "") {
				alert("Email not registered, sign in");
			} else {
				let val = value.split(',');
				//if log in is correct
				if (val[1] === password) {
					delete_or_create_loged(mail);

					location.reload();
				} else {
					alert("Password not correct");
				}
			}
		}
		else {
			alert("Format incorrect");
		}
	}
}

function upload_data_profile() {
	let val=check_loged("loged");
	let values=getCookie(val);
	let cookie = values.split(",");
	$("#name_prof").html(cookie[2]);
	$("#username_prof").html(cookie[0]);
	$("#email_prof").html(val);
	$("#birth_prof").html(cookie[4]);
	$("#pfp").html(cookie[3]);
	$("#int-1").children("a").html(cookie[5]);
	$("#int-2").children("a").html(cookie[6]);
	$("#int-3").children("a").html(cookie[7]);
	$("#int-4").children("a").html(cookie[8]);
	$("#int-5").children("a").html(cookie[9]);
	console.log($("#name_prof").html());
	console.log("a");
}
