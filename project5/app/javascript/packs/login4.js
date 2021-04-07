$(document).ready(startUp);

$(function(){
    var x = 0;
    setInterval(function(){
        x+=1;
        $('#background').css('background-position', x + 'px 0');
    }, 40);
})

function startUp() {
    fadeIn(2);

    $("#new-user").on({
        "click": function () {
            document.location.href = "newUser.php";
        }
    });

    $("#back-to-login").on({
        "click": function () {
            document.location.href = "project4-login.php";
        }
    });
}

function fadeIn(num) {
    $("body").css("transition-duration", num + "s");
    $("body").css("opacity", "1");
}

function checkMajor() {
    var student = document.myForm.student.value;
    var username = document.myForm.newUsername.value;
    var password = document.myForm.newPassword.value;
    var major = document.myForm.major.value;

    var url = "/~howard/validateMajor.php?name=" + student + "&username=" + username + "&password=" + password + "&major=" + major;

    $.get(url, function (myData) {
        if (myData == "That major does not exist") {   
            alert(myData);  
            return false;
        }
        else {
            // get the URL
            document.location.href = "createUser.php";
        }
    });
}

function checkUserPass() {
    var username = document.UPForm.username.value;
    var password = document.UPForm.password.value;

    var url = "/~howard/validateUserPass.php?username=" + username + "&password=" + password;

    $.get(url, function (myData) {
        if (myData == "Username or password is incorrect") {
            alert(myData);
            return false;
        }
        else {
            document.location.href = "project4.php?";
        }
    });
}