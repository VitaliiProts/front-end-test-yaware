// Tabs
$(function () {
    $("#myTab a").click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
});

// Modal window ajax
$(window).on("load", function () {
    $("#myModal").modal('show');
    $.ajax({
        url: "/index.html",
        type: "get",
        dataType: "html",
        beforeSend: function () {
            $("#loader").show();
        },
        success: function () {
            $("#loader").hide();
            // $("#myModal").modal('show');
        }
    });
});

$("#save").click(function (e) {
    e.preventDefault();
    $("#loader").show();
    $(this).prop("disabled", true);
    $.ajax({
        url: "/index.html",
        type: "get",
        dataType: "html",
        success: function () {
            $("#loader").hide();
        }
    });

    var dataFormsName = document.forms["our-form"].elements["inputName"].value;
    var dataFormsDesc = document.forms["our-form"].elements["inputDesc"].value;

    $("#alert-message").append("Name: " + dataFormsName + ";" + "<br>" + "Desc: " + dataFormsDesc + ";").show();
    $(this).hide();
});
