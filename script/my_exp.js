let selected = [];
let selected_img = [];

$(document).ready(function() {
  $("#exp-but").click(function() {
    window.location.href = "my_exp.html";
  })

  $(".exit-button").click(function(){
    $(".exit-button").parents(".popup").hide();
  })

  $("#no-but-coll").click(function () {
    $("#no-but-coll").parents(".popup").hide();
  })

  $("#yes-exp").click(function (){
    delete_good_exp();
    $("#yes-exp").parents(".popup").hide();
  })

  $("#yes-col").click(function (){
    delete_good_coll();
    $("#yes-col").parents(".popup").hide();
  })

  $("#add-exp").click(function () {
    $("#add-experiencee").show();
  })

  $("#new-coll").click(function () {
    let p = "";
    selected.forEach(item => p += item + "<br />");
    $("#create-col").children("#selected-exp").children("#selected-experiences-p").html(p);
    $("#create-col").show();
  })

  var e = new Event("look", {"cancelable":true})
  $("#create-exp").submit(function (e) {
  	e.preventDefault();
    var name = $("input[name='name']", this).val();
    var description = $("input[name='description']", this).val();
    var location = $("input[name='location']", this).val();
    var budget = $("input[name='budget']", this).val();
    var image = document.getElementById('hidden-input').files[0];
    var int1 = $('#new-interest-1').find(":selected").text();
    var int2 = $('#new-interest-2').find(":selected").text();

    if (image != null && name != "" && description != "" && location != "" && budget != 0 && int1 != "" && int2 != "") {
      imageURL = URL.createObjectURL(image);
    }
    else {
      return -1;
    }

    var $experience = $("#default-experience").clone();
    if ($experience.length === 0) {
      $experience = $store_default;
    }
    var num_exps = $("#block-1").children().length;
    if (num_exps > 1 && screen.width > 601) {
      $("#block-1").css("grid-template-areas", "'left right'");
    }
    if (num_exps > 2 && screen.width > 769) {
      $("#block-1").css("grid-template-areas", "'left mid right'");
    }
    var $child = $experience.children("div.experience-col");
    $experience.prop("id", "experience-" + num_exps);
    $experience.css("width", "90%");
    $experience.children("div.top-mark").hide();
    $child.children("h3.title-exp").html(name);
    $child.children(".img-remove").children(".remove-select").children(".b-contain").prop("for", "check-me" + num_exps);
    $child.children(".img-remove").children(".remove-select").children(".b-contain").children("input").prop("id", "check-me" + num_exps);
    $child.children(".interests-exp").children(".interest-1").children(".inter-1").html(int1);
    $child.children(".interests-exp").children(".interest-2").children(".inter-2").html(int2);
    $child.children(".img-remove").children(".img-title").attr("src", imageURL);

    $("#block-1").append($experience);
    $("#no-experiences").hide();
    $("#add-experiencee").hide();

    console.log($experience);
  })

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
    console.log(selected_img.length);
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

function showAddColl (input) {
  var name = $(input).parents(".experience-col").children(".default-tit").text();
  var image = $(input).parents(".img-remove").children(".img-title").attr("src");
  var importname = 1;
  selected.forEach((item, i) => {
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
  if (selected.length != 0){
    $("#new-coll").show();
  }
  else {
    $("#new-coll").hide();
  }
}

var inputt = "";
function delete_exp (input) {
    inputt = input;
    $("#delete-exp").show();
}

function delete_coll (input) {
    inputt = input;
    $("#delete-coll").show();
}

var $store_default = "";
var $store_default_coll = "";

function delete_good_exp (){
  $store_default = $(inputt).parents(".general-exp")
  var num_exps = $("#block-1").children().length;
  console.log(num_exps)
  if (num_exps == 2) {
    $("#block-1").css("grid-template-areas", "'mid'");
    console.log($("no-experiences"));
    $("#no-experiences").css("display", "block");
  }
  if (num_exps > 3 && screen.width > 601) {
    $("#block-1").css("grid-template-areas", "'left right'");
  }
  $(inputt).parents(".general-exp").remove();
}

function delete_good_coll (){
  $store_default_coll = $(inputt).parents(".general-exp")
  var num_exps = $("#block-2").children().length;
  if (num_exps === 2) {
    $("#block-2").css("grid-template-areas", "'mid'");
    $("#no-collections").css("display", "block");
  }
  $(inputt).parents(".collection").remove();
}
