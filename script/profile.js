$(document).ready(function() {
  $("#exp-but").click(function() {
    window.location.href = "my_exp.html";
  })

  $(".exit-button").click(function(){
    $(".exit-button").closest(".popup").css("display", "none");
  })

  $("#change-pfp-begin").click(function () {
    $("#change-pfp-begin").closest(".popup").css("display", "none");
    $("#change-pfp").css("display", "block");
  })

  $("#mod-but").click(function () {
    $("#mod-but").closest(".popup").css("display", "none");
    $("#modify-profile").css("display", "block");
  })

  $("#inter-but").click(function () {
    $("#inter-but").closest(".popup").css("display", "none");
    $("#change-interests").css("display", "block");
  })

});
