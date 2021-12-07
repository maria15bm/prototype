$(document).ready(function() {
  $("#exp-but").click(function() {
    window.location.href = "my_exp.html";
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
});
