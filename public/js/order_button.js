(function($) {

    let acc_btn = $("#accept_button")
    let rej_btn = $("#reject_button")
    let confirm_form = $("#confirm_form")
    let booking_status = $("#state").val()
    
    //let login_user = $().session.get('car')
    

    if(booking_status === "PFA" && $("#is_login").val() == "true"){
        acc_btn.attr('disabled', false)
        rej_btn.attr('disabled', false)
    }
    else{
        acc_btn.attr('disabled', true)
        rej_btn.attr('disabled', true)
        
        if(booking_status === "A") document.getElementById('message').innerHTML = 'approved'
        if(booking_status === "R") document.getElementById('message').innerHTML = 'rejected'
        
        
    }

    acc_btn.on('click', function(event) {
        event.preventDefault();
        let reqConfig = {
            method: 'POST',
            url: '/rentingInfo/confirm/approve/' + $('#order_id').html().split(": ")[1]
        }

        $.ajax(reqConfig).then(function (resMessage) {
            document.getElementById('message').innerHTML = 'approved'
            acc_btn.attr('disabled', true)
            rej_btn.attr('disabled', true)
        }) 
        
    })

    
    rej_btn.on('click', function(event) {
        event.preventDefault();
        let reqConfig = {
            method: "POST", 
            url: '/rentingInfo/confirm/reject/' + $('#order_id').html().split(": ")[1]
        }
        $.ajax(reqConfig).then(function (resMessage) {
            document.getElementById('message').innerHTML = 'rejected'
            acc_btn.attr('disabled', true)
            rej_btn.attr('disabled', true)
        })

        
    })
    
})(window.jQuery)