$(function() {
  var app_id = '1010265835689479';
  var scopes = 'public_profile,email';

  // var btn_login = '<a href="#" id="login" class="btn btn-primary">Iniciar sesión</a>';

  // var div_session = "<div id='facebook-session'>"+
  //           "<strong></strong>"+
  //           "<img>"+
  //           "<a href='#' id='logout' class='btn btn-danger'>Cerrar sesión</a>"+
  //           "</div>";

  window.fbAsyncInit = function() {

      FB.init({
        appId      : app_id,
        status     : true,
        cookie     : true, 
        xfbml      : true, 
        version    : 'v2.1'
      });


      FB.getLoginStatus(function(response) {
        statusChangeCallback(response, function() {});
      });
    };

    var statusChangeCallback = function(response, callback) {
      console.log(response);
      
      if (response.status === 'connected') {
          getFacebookData();
      } else {
        callback(false);
      }
    }

    var checkLoginState = function(callback) {
      FB.getLoginStatus(function(response) {
          callback(response);
      });
    }

    // funcion cuando está conectado
    var getFacebookData =  function() {
      FB.api('/me', function(response) {
        localStorage.setItem("fb_data", response);
        // $('#login').after(div_session);
        // $('#login').remove();
        // $('#facebook-session strong').text("Bienvenido: "+response.name);
        // $('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
      });
    }

    var facebookLogin = function() {
      checkLoginState(function(data) {
        if (data.status !== 'connected') {
          FB.login(function(response) {
            if (response.status === 'connected')
              // getFacebookData();
              localStorage.setItem("fb_data", response);
          }, {scope: scopes});
        }
      })
    }

    var facebookConnect = function(){
      if (!localStorage.getItem("fb_data")){
        return false;
      }else{
        return true;
      }
    }

    var facebookLogout = function() {
      checkLoginState(function(data) {
        if (data.status === 'connected') {
          FB.logout(function(response) {
          // $('#facebook-session').before(btn_login);
          // $('#facebook-session').remove();
          localStorage.removeItem("fb_data");
        })
      }
      })

    }



    // $(document).on('click', '#login', function(e) {
    //   e.preventDefault();

    //   facebookLogin();
    // })

    // $(document).on('click', '#logout', function(e) {
    //   e.preventDefault();

    //   if (confirm("¿Está seguro?"))
    //     facebookLogout();
    //   else 
    //     return false;
    // })

})