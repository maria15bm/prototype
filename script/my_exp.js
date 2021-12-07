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
    var experience_to_del = $(this).closest(".general-exp").attr("id");
    $("#delete-exp").css("display", "block");
    return experience_to_del;
  })

  $("#add-exp").click(function () {
    $("#add-experiencee").css("display", "block");
  })

  $("#new-coll").click(function () {
    $("#create-col").css("display", "block");
  })

  $(".b-input").click(function () {
    $("#new-coll").css("display", "block
    ")
  })
});
