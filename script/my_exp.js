// these two variables are used in order to temporarely store the selected experiences when the user clicks on the experience checkbox
let selected = [];
let selected_img = [];

$(document).ready(function() {
  // the following functions will listen to the specific id or class to be clicked in order to execute a function
  // the .exit-button is the class for the close buttons from popups
  $(".exit-button").click(function(){
    $(".exit-button").parents(".popup").hide();
  })

  // this id corresponds to saying "no" to the "want to delete?" popup, this function will only hide the popup
  $("#no-but-coll").click(function () {
    $("#no-but-coll").parents(".popup").hide();
  })

  // on the contrary, saying "yes" to the previous popup
  $("#yes-exp").click(function (){
    // this will execute this function, which will delete the experience
    delete_good_exp();
    $("#yes-exp").parents(".popup").hide();
  })

  $("#yes-col").click(function (){
    // or the collection depending on which popup is clicked
    delete_good_coll();
    $("#yes-col").parents(".popup").hide();
  })

  // in case the add experience button is clicked, we open the corresponding popup
  $("#add-exp").click(function () {
    $("#add-experiencee").show();
  })

  // or the new collection
  $("#new-coll").click(function () {
    // we store all selected experiences in a string with breaks
    let p = "";
    selected.forEach(item => p += item + "<br />");
    // we change the innerHTML of the popup to display the title of the selected experiences
    $("#create-col").children("#selected-exp").children("#selected-experiences-p").html(p);
    $("#create-col").show();
  })

  // if the create experience form is submited, we will execute the following
  var e = new Event("look", {"cancelable":true})
  $("#create-exp").submit(function (e) {
    e.preventDefault();
    // take the user inputs
    var name = $("input[name='name']", this).val();
    var description = $("input[name='description']", this).val();
    var location = $("input[name='location']", this).val();
    var budget = $("input[name='budget']", this).val();
    var image = document.getElementById('hidden-input').files[0];
    var int1 = $('#new-interest-1').find(":selected").text();
    var int2 = $('#new-interest-2').find(":selected").text();

    // if none of the inputs are empty, create an imageURL object;
    if (image != null && name != "" && description != "" && location != "" && budget != 0 && int1 != "" && int2 != "") {
      imageURL = URL.createObjectURL(image);
    }
    // else alert the user there are empty inputs
    else {
      alert("Missing inputs")
    }

    // we clone the default experience into a new variable
    var $experience = $("#default-experience").clone();
    // or take the "store default" value, which only exists if the default experience was deleted
    if ($experience.length === 0) {
      $experience = $store_default;
    }
    // block-1 will have different template-areas depending on the screen.width and the number of objects inside
    var num_exps = $("#block-1").children().length;
    if (num_exps > 1 && screen.width > 601) {
      $("#block-1").css("grid-template-areas", "'left right'");
    }
    if (num_exps > 2 && screen.width > 769) {
      $("#block-1").css("grid-template-areas", "'left mid right'");
    }
    // we start changing the information inside the new experience using the user inputs
    var $child = $experience.children("div.experience-col");
    // important to change the experience id so it does not collide with existing ones
    $experience.prop("id", "experience-" + num_exps);
    $experience.css("width", "90%");
    $experience.children("div.top-mark").hide();
    $child.children("h3.title-exp").html(name);
    $child.children(".img-remove").children(".remove-select").children(".b-contain").prop("for", "check-me" + num_exps);
    $child.children(".img-remove").children(".remove-select").children(".b-contain").children("input").prop("id", "check-me" + num_exps);
    $child.children(".interests-exp").children(".interest-1").children(".inter-1").html(int1);
    $child.children(".interests-exp").children(".interest-2").children(".inter-2").html(int2);
    $child.children(".img-remove").children(".img-title").attr("src", imageURL);

    // we append the new experience to the block-1
    $("#block-1").append($experience);
    // we hide the "you have no experiences" text just in case
    $("#no-experiences").hide();
    // we close the popup
    $("#add-experiencee").hide();
  })

  // funtion to create a collection. This works extremelly similar to the one for experiences, so we will not explain it in much detail
  $("#new-collection").submit(function (e) {
    e.preventDefault();
    var name = $("input[name='coll-name']", this).val();
    if (name === "" || selected.length === 0) {
      return -1;
    }

    var num_colls = $("#block-2").children().length;
    if (num_colls > 1 && screen.width > 601) {
      $("#block-2").css("grid-template-areas", "'left right'");
    }

    var $collection = $("#default-collection").clone();
    $collection.prop("id", "collection-" + num_colls);
    var $images = $collection.children(".img-remove");
    // the collection can have up to 3 images, each one being the main image of each of the selected experiences
    if (selected_img.length >= 3) {
      $images.children(".center-img").attr("src", selected_img[0]);
      $images.children(".side-img-2").attr("src", selected_img[1]);
      $images.children(".side-img-1").attr("src", selected_img[2]);
    }
    if (selected_img.length == 2) {
      $images.children(".center-img").attr("src", selected_img[0]);
      $images.children(".side-img-2").attr("src", selected_img[1]);
      $images.children(".side-img-1").hide();
      $images.children(".center-img").css("margin", "auto 0px auto auto");
    }
    if (selected_img.length == 1) {
      $images.children(".center-img").attr("src", selected_img[0]);
      $images.children(".side-img-1").hide();
      $images.children(".side-img-2").hide();
      $images.children(".center-img").css("margin", "auto");
    }

    $collection.children(".title-exp").html(name);
    let p = "";
    selected.forEach(item => p += item + "<br />");
    $collection.children("#experiences-inside").html(p);

    $collection.appendTo("#block-2");
    $("#no-collections").hide();
    $("#create-col").hide();
  })

});

// this function will be executed when the checkboxes are clicked, and will add the correspoding experience's information
// to the selected and selected-img variables
function showAddColl (input) {
  // take the title and the image source
  var name = $(input).parents(".experience-col").children(".default-tit").text();
  var image = $(input).parents(".img-remove").children(".img-title").attr("src");
  var importname = 1;
  // and store them inside the variables only if they don't already exist
  selected.forEach((item, i) => {
    // if they already exist, delete them from the array (second checkbox click --> deselect)
    if (item === name) {
      importname = 0;
      selected = selected.filter(item2 => item2 !== item);
      selected_img = selected_img.filter(item2 => item2 !== item)
    }
  });
  if (importname === 1) {
    selected.push(name);
    selected_img.push(image);
  }
  // if the len of the arrays is not 0 we show the button to create a collection
  if (selected.length != 0){
    $("#new-coll").show();
  }
  else {
    $("#new-coll").hide();
  }
}

// this function will be used to remember what experience is going to be deleted
var inputt = "";
function delete_exp (input) {
    inputt = input;
    $("#delete-exp").show();
}

// or what collection
function delete_coll (input) {
    inputt = input;
    $("#delete-coll").show();
}

// these variables are used to store the template for the default experiences or collections, just in case they are being deleted
var $store_default = "";
var $store_default_coll = "";

// function to delete a selected experience
function delete_good_exp (){
  $store_default = $(inputt).parents(".general-exp")
  var num_exps = $("#block-1").children().length;
  // we change the block-1 depending on the number of objects inside
  if (num_exps == 2) {
    // 2 objects means, after deletion, there will be no experiences, so we need to show the "no experiences" text
    $("#block-1").css("grid-template-areas", "'mid'");
    console.log($("no-experiences"));
    $("#no-experiences").css("display", "block");
  }
  if (num_exps > 3 && screen.width > 601) {
    $("#block-1").css("grid-template-areas", "'left right'");
  }
  // remove the experience
  $(inputt).parents(".general-exp").remove();
}

// this function is similar to the previous one but for collections
function delete_good_coll (){
  $store_default_coll = $(inputt).parents(".general-exp")
  var num_exps = $("#block-2").children().length;
  if (num_exps === 2) {
    $("#block-2").css("grid-template-areas", "'mid'");
    $("#no-collections").css("display", "block");
  }
  $(inputt).parents(".collection").remove();
}
