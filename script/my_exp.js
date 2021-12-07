$(document).ready(function() {
  $("#exp-but").click(function() {
    window.location.href = "my_exp.html";
  })

  $(".exit-button").click(function(){
    $(".exit-button").closest(".popup").css("display", "none");
  })

  $("no-but").click(function () {
    $(".exit-button").closest(".popup").css("display", "none");
  })

  $(".remove-exp").click(function () {
    $("#delete-exp").css("display", "block");
  })

  $(".remove").click(function () {
    $("#delete-coll").css("display", "block");
  })

  $("#add-exp").click(function () {
    $("#add-experiencee").css("display", "block");
  })

  $("#new-coll").click(function () {
    $("#create-col").css("display", "block");
  })

  $(".b-input").click(function () {
    $("#new-coll").css("display", "block")
  })
});
