$(document).ready(function(){

var stripeFormModule = $(".stripe-payment-form")
var stripModuleToken = stripeFormModule.attr("data-token")
var striModulepNextUrl = stripeFormModule.attr("data-next-url")
var striModulepBtnTitle = stripeFormModule.attr("data-btn-title") || "Add Card"

var stripeTemplate = $.templates("#stripeTemplate")
var stripeTemplateDataContext = {
    publishKey: stripModuleToken,
    nextUrl: striModulepNextUrl,
    btnTitle: striModulepBtnTitle
}
var stripeTemplateHtml = stripeTemplate.render(stripeTemplateDataContext)
stripeFormModule.html(stripeTemplateHtml)


var paymentForm= $(".payment-form")
if (paymentForm.length<1){
    alert("Only one payment form is allowed per page")
    paymentForm.css('display', 'none')
}
else if (paymentForm.length==1){
    var pubkey = paymentForm.attr('data-token')
    var nextUrl = paymentForm.attr("data-next-url")
    var stripe = stripe(pubkey);

    var elements = stripe.elements();

    var style ={
        base:{
            color: '#32325d',
            lineHeight: '24px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder':{
                color: '#aab7c4'
            },
            invalid:{
                color: '#fa755a',
                inconColor: '#fa755a'
            }
        };
    var card = elements.create('card', {style: style});

    card.mount('#card-element');

    card.addEventListener('change', function(event){
      var displayError = document.getElementById('card-errors');
      if (event.erorr){
        displayError.textContent = event.erorr.message;
      }else{
        displayError.textContent = '';
      }
    });

   /* var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event){
        event.preventDefault();

        var loadTime = 1500
        var errorHtml = "<i class='fa fa-warning'></i> An erorr occured"
        var errorClasses = "btn btn-danger disabled my-3"
        var loadingHtml = "<i class='fa fa-spin fa-spinner'></i> Loading..."
        var loadingClasses = "btn btn-success disabled my-3"


        stripe.createToken(card).then(function(result){
            if(result.erorr){

                var erorrElement = document.getElementById('card-errors');
                erorrElement.textContent = result.erorr.message;
            }else{

                stripeTokenHandler(nextUrl, result.token);


            }
        });
    });
*/

    var form = $('#payment-form');
    var btnLoad = form.find(".btn-load") 
    var btnLoadDefaultHtml = btnLoad.html()
    var btnLoadDefaultClasses = btnLoad.attr("class")

    form.on('submit', function(event){
        event.preventDefault();

        var $this = $(this)
        //var btnLoad = $this.find('.btn-load')
        btnLoad.blur()
        var loadTime = 1500
        var currentTimeout;
        var errorHtml = "<i class='fa fa-warning'></i> An erorr occured"
        var errorClasses = "btn btn-danger disabled my-3"
        var loadingHtml = "<i class='fa fa-spin fa-spinner'></i> Loading..."
        var loadingClasses = "btn btn-success disabled my-3"


        stripe.createToken(card).then(function(result){
            if(result.erorr){

                var erorrElement = $('#card-errors');
                erorrElement.textContent = result.erorr.message;
                currentTimeout = displayBtnStatus(
                                    btnload, 
                                    errorHtml, 
                                    errorClasses, 
                                    1000,
                                    currentTimeout  
                                 )
            }else{
                // send the token to your server
             currentTimeout = displayBtnStatus(
                                   btnload, 
                                   loadingHtml, 
                                   loadingClasses, 
                                   1000,
                                   currentTimeout  
                                 )

                stripeTokenHandler(nextUrl, result.token);


            }
        });
    });

    function displayBtnStatus(element, newHtml, newClasses, loadTime, timeout){
        //if (timeout){
          //  clearTimeout(timeout)
        //}
        if(!loadTime){
            loadTime = 1500
        }
        //var defaultHtml= element.html()
        //var defaultClasses = element.attr("class")
        element.html(newHtml)
        element.removeClass(btnLoadDefaultClasses)
        element.addClass(newClasses)
        return setTimeout(function(){
            element.html(btnLoadDefaultHtml)
            element.removeClass(newClasses)
            element.addClass(btnLoadDefaultClasses)
        }, loadTime)
    }


    function redirectToNext(nextpath, timeoffset){
        if (nextpath){
        setTimeout(function(){
                    window.location.href= nextpath    
                }, timeoffset)
                     
        }
    }

    function stripeTokenHandler(nextUrl, token){
        console.log(token.id)
        var paymentMethodEndpoint = '/billing/payment-method-create/'
        var data = {
            'token':token.id
        }
        $.ajax({
            data: data,
            url: paymentMethodEndpoint,
            method: "POST",
            success: function(data){
                var succssMsg = data.message || "Success! You card was added."
                card.clear()
                if (nextUrl){
                    succssMsg = succssMsg + "<br/><br/><i class='fa fa-spin fa-spinner'></i> Redirecting..."
                }
                if ($.alert){
                    $.alert(succssMsg)
                    redirectToNext(nextUrl)
                }else {
                    alert(succssMsg)
                }
                btnLoad.html(btnLoadDefaultHtml)
                btnLoad.attr('class', btnLoadDefaultClasses)
                redirectToNext(nextUrl, 1500)

            },
            error: function(error){
                console.log(error)
                $.alert({title: "An error qccured", content:"Please try adding your card again."})
                btnLoad.html(btnLoadDefaultHtml)
                btnLoad.attr('class', btnLoadDefaultClasses)
                
            }
        })
    }
}
})