var filter_list = [];

/* every time the page reloads everything inside is executed */
$(document).ready(function() {
	//--------HEADER-----------------
	/*check the cookie loged to know if it has to show the registered version or ungestired one*/
	if (check_loged("loged") == ""){
		$("#pop-up-comments").hide();
		$("#login-popup").hide();
		$("#sign-popup").hide();
		$("#please-popup").hide();
		$("#registered").hide();
		$("#registered-bts").hide();
		$("#logout-popup").hide();
		$('#messages-popup').hide();
		$("#prf-out-in-menu").hide();
		$("#log-sign-in-menu").show();
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
		$("#prf-out-in-menu").show();
		$("#log-sign-in-menu").hide();
		show_username();
		upload_data_profile();
	}

	/* if the window size is for mobile phones, hide the navigation bar */
	if ($(window).width() < 601){
			$('#nav-header-menu').hide();
	}

	/* show always the navigation menu for tablet and desktop */
	$(window).resize(function(){
		if ($(window).width() > 601){
			$('#nav-header-menu').show();
		}
	})

	/* in mobile version, a button shows and hides the navigation menu */
	$('#show-menu').click(function() {
		if ($('#nav-header-menu').is(':hidden')){
			$('#nav-header-menu').show();
		} else {
			$('#nav-header-menu').hide();
		}
	})

	/* search bar filter list */
	$("#myList li a").hide();
	$("#search-input").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#myList li").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		});
		if($("#search-input").val() !== ""){
			$("#myList li a").filter(function() {
				$(this).show();
			});
		}else{
			$("#myList li a").hide();
		}
	});

	/* display log in, sign in, log out pop ups in desktop and tablet */
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
	$('#link-sign').click(function() {
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
			window.location = "index.html";
			// the previous line does not work but it should
			delete_or_create_loged("");
			location.reload();
		})
	})

	/* display log in, sign in, log out pop ups in mobile */
	$('#log-out-btn-in-menu').click(function (){
		$("#logout-popup").show();
		$("#stay").click(function() {
			$("#logout-popup").hide();
		})
		$("#logout").click(function() {
			window.location = "index.html";
			delete_or_create_loged("");
			location.reload();
		})
	})
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
	$('#profile-btn-in-menu').click(function (){
		window.location="profile.html"
	})

	/* display message pop up */
	$('#image_mes').click(function () {
		$('#messages-popup').show();
	})

	// change location to the profile and change the default interests inside the change interests popup
	$('#profile-btn').click(function (){
		window.location="profile.html";

		// read the cookies
		let val=check_loged("loged");
		let values=getCookie(val);
		let cookie = values.split(",");
		var interest = "";
		var ii = 10;
		// change the
		for (var i = 5; i < ii; i++) {
			if (cookie[i] != ""){
				$interest = $("#default-interest").clone();
				$interest.children("p").html(cookie[i]);
				var iii = i - 4;
				$interest.prop("id", "interest-to-change-" + iii);
				$("#default-interest").parent().append($interest);
			}

			if (cookie[i] == "") {
				ii += 1;
			}
		}
		for (var i = 1; i < 6; i++) {
			if ($("#interest-to-change-" + i).children("p").html(cookie[i]) == "") {
				$("#interest-to-change-" + i)
			}
		}
	})

	/* close pop up */
	$(".exit-button").click(function(){
		$(".exit-button").closest(".popup").css("display", "none");
	})
	$(".exit-button").click(function(){
		var $id = $(".exit-button").closest(".popup").css("display", "none");
	})

	/* a close button will close its pop up */
	$(".close-btn").click(function(){
		$(this).parent().hide()
	})

	/* NOT IMPLEMENTED DUE TO BUGS */
	/* the top experiences can be sorted (drag and drop) */
	/*let sortable = document.getElementById("experiences");
	$( function() {
		$(sortable).sortable();
	} );*/

	//--------PROFILE-----------------
	// change window to my_exp.html
	$("#exp-but-link").click(function () {
		window.location = "my_exp.html"
	})

	// change window to my_exp.html
	$("#change-pfp-begin").click(function () {
		$("#change-pfp").show();
	})

	// show modify profile popup
	$("#mod-but").click(function () {
		$("#modify-profile").show();
	})

	// show change interests popup
	$("#inter-but").click(function () {
		$("#change-interests").show();
	})

	// in the change profile picture, after a new picture is selected, show the user which image he has selected
	$('#new-pfp-in').on('input', function() {
		var pic = document.getElementById('new-pfp-in').files[0];
		pic = URL.createObjectURL(pic);
		$("#pfpp-2").prop("src", pic);
	});

	// after submiting the profile picture change, we execute the "update_image" function
	var e = new Event("look", {"cancelable":true});
	$("#new-picture").submit(function(e) {
		var pic = document.getElementById('new-pfp-in').files[0];
		pic = URL.createObjectURL(pic);
		update_image(pic);
		$("#change-pfp").hide();
	})

	// this function will take the inputs from the modify profile popup and will modify only those inputs which were filled
	$("#form-profile-info").submit(function (e) {
		e.preventDefault();
		var new_username = $("#form-username").val();
		var new_email = $("#form-email").val();
		var new_birth = $("#form-birth").val();
		var new_password = $("#form-password").val();

		var list = [new_username, new_email, new_birth, new_password];
		list.forEach((item,i) => {
			if (item != ""){
				// check for data and replace the cookie
				let val = check_loged("loged");
				let values=getCookie(val);
				let data = values.split(",");
				const exdays = 190;
				const d = new Date();
				d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
				let expires = "expires=" + d.toUTCString();
				if (i==0){
					var cvalue = [new_username,data[1],data[2],data[3], data[4],data[5],data[6],data[7],data[8],data[9]];
					document.cookie = val + "=" + cvalue + ";" + expires + ";path=/";
				}
				if (i==3){
					var cvalue = [data[0],new_password ,data[2],data[3], data[4],data[5],data[6],data[7],data[8],data[9]];
					document.cookie = val + "=" + cvalue + ";" + expires + ";path=/";
				}
				if (i==1){
					var cvalue = [data[0],data[1] ,data[2],data[3], data[4],data[5],data[6],data[7],data[8],data[9]];
					delete_or_create_loged(new_email);
					document.cookie = new_email + "=" + cvalue + ";" + expires + ";path=/";
				}
				if (i==2){
					var cvalue = [data[0],data[1] ,data[2],data[3],new_birth,data[5],data[6],data[7],data[8],data[9]];
					document.cookie = val + "=" + cvalue + ";" + expires + ";path=/";
				}
			}
		});
		$("#modify-profile").hide();
		location = location;
	})

	// this function will delete a interest from the cookies after clicking the delte interest button in the change interests popup
	$(".delete-interest-modify").click(function () {
		$(this).parent().remove();
		let val = check_loged("loged");
		let values = getCookie(val);
		let cookie = values.split(",");
		const exdays = 190;
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + d.toUTCString();
		cookie.forEach((item, i) => {
			if (item == $(this).parent().children("p").html()) {
				delete cookie[i]
			}
			document.cookie = val + "=" + cookie + ";" + expires + ";path=/";
		});
	})

	// take the user input and add a new interest to the cookies
	$("#new-interest-form").submit(function (e) {
		e.preventDefault()
		let val = check_loged("loged");
		let values = getCookie(val);
		let cookie = values.split(",");
		const exdays = 190;
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + d.toUTCString();
		var interest = $('#new-interest-form-new').find(":selected").text().toLowerCase();
		var yes = 0;
		cookie.forEach((item, i) => {
			if (item == "") {
				cookie.splice(i, 0, interest);
				// in order for this function to work properly, in this line we should use a "continue",
				// but ".forEach" is not a loop and therefore we cannot use it
			}
		});
		document.cookie = val + "=" + cookie + ";" + expires + ";path=/";
		$("#change-interests").hide()
	})

	//--------EXPERIENCES-----------------
	/* display pop up when someone tries to comment or like without being registered */
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

	/* display comments */
	$("#see-comments").click(function(){
		$("#pop-up-comments").show()
	})

	/* display experience when clicking on map countries */
	$("#ES-exp").click( function () {
		window.location = "experience_cies.html"
	})

	$(".Indonesia").click(function () {
		window.location = "experience_bali.html"
	})

	$("#CZ-exp").click( function () {
		window.location = "experience_prague.html"
	})

	/* the images in the experiences are displayed using a photoroulette */
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

	/* comments posting when clicking the send button */
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

	/* filter in last experiences */
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

	/* to increase the likes in a experience */
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

//--------------------MANAGING COOKIES FUNCTIONS----------------------------

// function done in the signup pop up
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
		var passwregex = /^[A-Za-z0-9]{4,8}$/;
		var emailregex = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]$/;
		if (password.match(passwregex) && email.match(emailregex)) {
			if (password1 == "" || password2 == "" || name == "" || username == "" || email==""){
				alert("Some required fields are empty, please fill: name, username, mail, password and password confirmation");
			}
			else {
				register = email;
				if (setCookie(username, password, name, email, profile, birth, interest1, interest2,interest3, interest4, interest5, exdays) === true){
					delete_or_create_loged(email);
					location.reload();
				}
			}
		}
		else{
			alert("Format incorrect: the password must have a lowercase, an uppercase letter and a number " +
				"it mus be of length 4-8. The mail must have some text, a '@' followed by more text, a dot and some text");
		}
	}
}

//function done in the log in pop up
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

//creation of a cookie of the user
function setCookie(username, password, name, email, image,birth ,interest1="",interest2="",interest3="",interest4="",interest5="", exdays) {
	if (getCookie(email) == "") {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + d.toUTCString();
		var cvalue = [username, password, name, image,birth,interest1, interest2,interest3,interest4,interest5];
		document.cookie = email + "=" + cvalue + ";" + expires + ";path=/";
		return true;

	}
	else{
		alert("Email allready registered, log in");
		return false;

	}
}

//function to get a cookie
function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	// if cookie does not exist
	return "";
}


//function done after registering to show the username in the header
function show_username(){
	let val=check_loged("loged");
	let values=getCookie(val);
	let data = values.split(",");
	$("#username_show").html(data[0]);
}

//--------loged cookie-----------------

//cookie used to know if there is an user registered and to have the email of him, if it is the case


//function to get the data of the cookie
function check_loged(loged) {
	let value = getCookie(loged);
	let val = value.split(',');
	return val[0];
}


//function to modify the cookie, passing the value of the email or an empty string if it is not registered
function delete_or_create_loged(email) {
	exdays = 50000;
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	let loged = "loged";
	document.cookie = loged + "=" + email + ";" + expires + ";path=/";

}


//--------in profile-----------


//update in the cookie the value of image when this is changed
function update_image(pic){
	let val=check_loged("loged");
	let values=getCookie(val);
	let data = values.split(",");
	const exdays = 190;
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	var cvalue = [data[0],data[1],data[2],pic, data[4],data[5],data[6],data[7],data[8],data[9]];
	document.cookie = val + "=" + cvalue + ";" + expires + ";path=/";
}



//get the data of the profile in the screen
function upload_data_profile() {
	let val=check_loged("loged");
	let values=getCookie(val);
	let cookie = values.split(",");
	$("#name_prof").html(cookie[2]);
	$("#username_prof").html(cookie[0]);
	$("#email_prof").html(val);
	$("#birth_prof").html(cookie[4]);
	var ii = 10;
	for (var i = 5; i < ii; i++) {
		if (cookie[i] != ""){
			var index = i - 4;
			$("#int-" + index).children("a").html(cookie[i]);
		}
		if (cookie[i] == "") {
			ii += 1;
		}
	}

	var interest = "";
	var ii = 10;

	for (var i = 5; i < ii; i++) {
		if (cookie[i] != ""){
			$interest = $("#default-interest").clone();
			$interest.children("p").html(cookie[i]);
			var iii = i - 4;
			$interest.prop("id", "interest-to-change-" + iii);
			$("#default-interest").parent().append($interest);
		}
		if (cookie[i] == "") {
			ii += 1;
		}
	}
}

//--------------------FILTERS FUNCTIONS----------------------------

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
