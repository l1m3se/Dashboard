$(function() {

    if( $("#login".lenght) ) {
        var request = new XMLHttpRequest;
        var userEmail = $("#inputEmail");
        var userPassword = $("#inputPassword");

        request.onload = function() {
            var user = JSON.parse(this.response);     
            var validEmail = user.email;
            var validPassword = user.password;
            
            if( request.readyState == 4 && request.status == 200) {
                $("#login").on("click", function() {

                    if( userEmail.val() == validEmail && userPassword.val() == validPassword) {
                        window.location.replace("index.html");
                    } else if(userEmail.val() == 0 || userPassword.val() == 0) {
                        userPassword.addClass("is-invalid");
                        $("#invalid-feedback").text("Email and Password required!");
                    } else if(userEmail.val() != validEmail || !userPassword.val() != validPassword) {
                        userPassword.addClass("is-invalid");
                        $("#invalid-feedback").text("Wrong Email or Password!");
                    }
                });
            }
        }
        request.open("GET", "https://fe18.azurewebsites.net/api/user", true);
        request.send();
    }
});