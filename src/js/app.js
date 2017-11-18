// Tabs
$(function () {
  $("#myTab a").click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});

// Modal window
$(window).on("load", function () {
  $("#myModal").modal("show");
  $(".overlay").hide();
});

$("#save").click(function (e) {
  // e.preventDefault();
  $(".overlay").show();
  $(this).prop("disabled", true);
  $.ajax({
    url: "/index.html",
    type: "get",
    dataType: "html",
    success: function () {
      $(".overlay").hide();
    }
  });

  var dataFormsName = document.forms["our-form"].elements["inputName"].value;
  var dataFormsDesc = document.forms["our-form"].elements["inputDesc"].value;

  $("#alert-message").append("Name: " + dataFormsName + ";" + "<br>" + "Desc: " + dataFormsDesc + ";").show();
  $(this).hide();
});

// MultiSelect
$('#pre-selected-options').multiSelect({
  selectableHeader: "<label for=\"allUsers\">All Users</label>\n" +
  "                                    <div class=\"input-group\">\n" +
  "      <span class=\"input-group-btn\">\n" +
  "        <button class=\"btn btn-default\" type=\"button\"><i class=\"glyphicon glyphicon-search\"></i></button>\n" +
  "      </span>\n" +
  "                                        <input id=\"allUsers\" type=\"text\" class=\"form-control\">\n" +
  "                                    </div>",
  selectionHeader: "<label for=\"selectedUsers\">Selected Users</label>\n" +
  "                                    <div class=\"input-group\">\n" +
  "                    <span class=\"input-group-btn\">\n" +
  "        <button class=\"btn btn-default\" type=\"button\"><i class=\"glyphicon glyphicon-search\"></i></button>\n" +
  "      </span>\n" +
  "                                        <input id=\"selectedUsers\" type=\"text\" class=\"form-control\">\n" +
  "                                    </div>"
});