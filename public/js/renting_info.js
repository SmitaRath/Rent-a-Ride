(function($) {

    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrow_value = tomorrow.toISOString().split('T')[0]

    let get_booked_arr = $("#start_date").attr('booked_date').split(',')
    let dateRange = [];

    function find_cloest_date(toDate, dateRange){
        for(let i in dateRange){
            let check_date = new Date(dateRange[i])
            if(check_date - toDate > 0){
                return check_date
            }
        }
        console.log("cannot find it")
    }

    function set_price(){
        let price = $("#single_price").val(),
            start_date = $("#start_date").val(),
            end_date = $("#end_date").val()

        start_date = new Date(start_date)
        end_date = new Date(end_date)

        let day_diff = (end_date.getTime() - start_date.getTime()) / (24*3600*1000)
        let total = parseInt(price) * day_diff

        if(total > 0) document.getElementById('price').innerHTML = `Price: ${total}`
        else document.getElementById('price').innerHTML = `Price: 0`
        return total
    }



    $("#start_date").datepicker({
        beforeShowDay: function (date){
            for (let i in get_booked_arr){
                if(i % 2 === 1){
                    let startDate = new Date(get_booked_arr[i - 1]),
                        endDate = new Date(get_booked_arr[i])
                    startDate.setDate(startDate.getDate() + 1)
                    endDate.setDate(endDate.getDate() + 1)

                    for(let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)){
                        dateRange.push($.datepicker.formatDate('yy-mm-dd', d));
                    }
                }
            }
            let dateString = jQuery.datepicker.formatDate('yy-mm-dd', date)
            return [dateRange.indexOf(dateString) == -1]
        },
        minDate: tomorrow
    })

    $('#start_date').change(function(){
        
        document.getElementById('price').innerHTML = `Price: 0`
        $('#end_date').val('');
        $("#end_date").datepicker("destroy");

        let toDate = $('#start_date').val();
        $('#end_date').prop("disabled", false);
        let maxDate = find_cloest_date(new Date(toDate), dateRange)
        toDate = new Date(toDate)
        toDate.setDate(toDate.getDate() + 1)
        $("#end_date").datepicker({
            minDate: toDate,
            maxDate: maxDate
        })
        
    });

     

    $('#end_date').change(function(){
        let price = set_price()
        
        if(price <= 0){
            $('#end_date').val('');
            $('#end_date').prop("disabled", true);
            let toDate = $('#start_date').val();
            let maxDate = find_cloest_date(new Date(toDate), dateRange)
            //console.log(toDate, maxDate)
            $("#end_date").datepicker("destroy");
        }
    })

})(window.jQuery);