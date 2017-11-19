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


$("#our-form").on("submit", function (e) {
  e.preventDefault(); // Відміняєм поведінку
  if (this.inputName.value === "" && this.inputDesc.value === "") {
    toastr.error("Please fill out the fields!");
  } else if (this.inputName.value === "") {
    toastr.error("Please fill out the name field!");
  } else if (this.inputDesc.value === "") {
    toastr.error("Please fill out the desc field!");
  } else {
    $("#save").prop("disabled", true);
    $(".overlay-modal").show();
    setTimeout(function () {
      $(".overlay-modal").hide();
      toastr.success("Name: " + this.inputName.value + '<br>' + "Desc: " + this.inputDesc.value);
    }, 1000);
  }
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