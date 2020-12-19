let carForm = document.getElementById('carcreation-form-id');
let submitBtn = document.getElementById('submit-id');
let li;
if(carForm){
    carForm.addEventListener('submit',(event) => {
        $('ul').empty();
        $('#routeserror-list-id').empty();
        event.preventDefault();

        let licensePlate = $('#licensePlate-id').val();
        if(!licensePlate.trim())
        {
            li='<li>License Plate: Sent parameter is missing</li>';
            $('#errorlist-id').append(li);
            $('#licensePlate-id').val('');
        }

        /*if(!licensePlate.trim().match("^[a-zA-Z]+$"))
        {

        }*/
        let brand = $('#brand-id').val();
        if(brand.trim()){
            if(!brand.trim().match("^[a-z][A-Z]+")){
                li='<li>Brand: Sent parameter should only contain alphabets</li>';
                $('#errorlist-id').append(li);
                $('#brand-id').val('');
            }
        }

        let model = $('#model-id').val();
        if(model.trim()){
            if(!model.trim().match("^[a-z][A-Z]+")){
                li='<li>Model: Sent parameter should only contain alphabets</li>';
                $('#errorlist-id').append(li);
                $('#model-id').val('');
            }
        }

        let makeYear = $('#makeYear-id').val();
        if(makeYear.trim()){
            if(!makeYear.trim().match("^[0-9]*4")){
                li='<li>Make Year: Sent parameter should only contain 4 numbers</li>';
                $('#errorlist-id').append(li);
                $('#makeYear-id').val('');
            }
        }

        let type = $('#type-id').val();
        if(type.trim()){
            if(!type.trim().match("^[a-z][A-Z]+")){
                li='<li>Type: Sent parameter should only contain alphabets</li>';
                $('#errorlist-id').append(li);
                $('#type-id').val('');
            }
        }

        let color = $('#color-id').val();
        if(color.trim()){
            if(!color.trim().match("^[a-z][A-Z]+")){
                li='<li>Color: Sent parameter should only contain alphabets</li>';
                $('#errorlist-id').append(li);
                $('#color-id').val('');
            }
        }

        let noOfPassengers = $('#noOfPassengers-id').val();
        if(noOfPassengers.trim()){
            if(!noOfPassengers.trim().match("^[0-9]+")){
                li='<li>No of Passengers: Sent parameter should only contain numbers</li>';
                $('#errorlist-id').append(li);
                $('#noOfPassengers-id').val('');
            }
        }

        let bootSpace = $('#bootSpace-id').val();
        if(bootSpace.trim()){
            if(!bootSpace.trim().match("^[0-9]+")){
                li='<li>Boot Space: Sent parameter should only contain numbers</li>';
                $('#errorlist-id').append(li);
                $('#bootSpace-id').val('');
            }
        }

        let houseNo = $('#houseNo-id').val();
        if(houseNo.trim()){
            if(!houseNo.trim().match("^[0-9]+")){
                li='<li>House No: Sent parameter should only contain 4 numbers</li>';
                $('#errorlist-id').append(li);
                $('#houseNo-id').val('');
            }
        }

        let street = $('#street-id').val();
        if(street.trim()){
            if(!street.trim().match("^[a-z][A-Z]+")){
                li='<li>Street: Sent parameter should only contain alphabets</li>';
                $('#errorlist-id').append(li);
                $('#street-id').val('');
            }
        }

        let zip = $('#houseNo-id').val();
        if(zip.trim()){
            if(!zip.trim().match("^[0-9]+")){
                li='<li>Zip: Sent parameter should only contain 4 numbers</li>';
                $('#errorlist-id').append(li);
                $('#zip-id').val('');
            }
        }

        let price = $('#price-id').val();
        if(price.trim()){
            if(!price.trim().match("^[0-9]+")){
                li='<li>Price: Sent parameter should only contain 4 numbers</li>';
                $('#errorlist-id').append(li);
                $('#price-id').val('');
            }
        }

        if($("#errorlist-id").has("li").length == 0) 
            createForm.submit();
    })
}