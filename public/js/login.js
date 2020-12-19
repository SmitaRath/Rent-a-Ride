(function ($) {
let loginForm = $('#loginform-id');
let flag;

    loginForm.submit(function (event){

    event.preventDefault();

    $('#errorlist-id').empty();
    flag=true;

    let newEmailId = $('#email-id').val();
    let newPassword = $('#password-id').val();

    if(!newEmailId.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    {
        flag=false;
        let error1 = '<p>Email ID: Sent parameter format is not correct';
        $('#errorlist-id').append(error1);
        $('#email-id').val('');
    }


    if(flag)
    {

        var requestConfig = {
            method: 'POST',
            url: '/users/login',
            contentType: 'application/json',
            data: JSON.stringify({
            emailID: newEmailId,
            password: newPassword
            })
        };

       /* $.ajax(requestConfig).then(function (responseMessage) {
        console.log(responseMessage);
        //$('main').load("responseMessage");
        //newContent.html(responseMessage.message);
        });
        console.log("test");*/

        $.ajax({
            ...requestConfig,
            success: function (result) {
               console.log(result);
               $('#loginsection-id').empty();
               $('main').append(result);
            },
            error: function(error) {
              console.log(error);
              let ptag = `<p>${error.responseJSON.message}</p>`;
              $('#errorlist-id').append(ptag);
            }
          });

    }
    });


})(window.jQuery);
