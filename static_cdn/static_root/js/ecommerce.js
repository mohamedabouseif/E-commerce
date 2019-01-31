 $(document).ready(function(){
              
              var contactForm = $(."contact-form")
              var contactFormMethod = contactForm.attr("method")
              var contactFormEndpoint = contactForm.attr("action")
             
              function displaysubmitting(submitBtn, defaultText, dosubmit){
                
                if(dosubmit){
                  submitBtn.addClass("disabled")
                  submitBtn.html("<i class='fa fa-spin fa-spinner'></i> Sending... ")
                }else {
                  submitBtn.removeClass("disabled")
                  submitBtn.html(defaultText)
                }
                }

              contactForm.submit(function(event){
                event.preventDefault()
                

                var contactFormSumbitBtn = contactForm.find("[type='submit']")
                var contactFormSumbitBtnTxt = contactFormSumbitBtn.text()
                
                var contactFormData = contactForm.serialize()
                var thisForm = $(this)
                displaysubmitting(contactFormSumbitBtn,"",true)
                $.ajax({
                  method: contactFormMethod,
                  url: contactFormEndpoint,
                  data: contactFormData,
                  success: function(data){
                    contactForm[0].reset()
                    $.alert({
                      title: "success!",
                      content: data.message,
                      theme :"modern"
                    })
                    setTimeout(function(){
                      displaysubmitting(contactFormSumbitBtn,contactFormSumbitBtnTxt,false)
                    },500)
                  },
                  error: function(error){
                    console.log(error.responseJSON)
                    var jsonData = error.responseJSON
                    var msg = ""
                    $.each(jsonData, function(key,value){
                      msg += key + ": " + value[0].message + "<br/>"
                    })
                    $.alert({
                      title: "Oops",
                      content: msg,
                      theme :"modern"
                    })
                    setTimeout(function(){
                      displaysubmitting(contactFormSumbitBtn,contactFormSumbitBtnTxt,false)
                    },500) 
                  }
                })
              })




              var searchForm= $(".search-form")
              var searchInput= searchForm.find("[name='q']")
              var typingTimer;
              var typingInterval = 500
              var searchBtn = searchForm.find("[type='submit']")
              searchInput.keyup(function(event){
                clearTimeout(typingTimer)
                typingTimer=setTimeout(performance,typingInterval)
                })

              searchInput.keydown(function(event){
                clearTimeout(typingTimer)
              })


              function displaySearch(){
                searchBtn.addClass("disabled")
                searchBtn.html("<i class='fa fa-spin fa-spinner'></i> Searching.. ")
                
              }


              function performance(){
                displaySearch()
                var query= searchInput.val()
                setTimeout(function(){
                  window.location= '/search/?q='+query
                },1000)

               
              }








              var productForm =$(".form-product-ajax")
              productForm.submit(function(event){
              event.preventDefault();
              //console.log("Form is not sending")
              var thisForm = $(this)
              //var actionEndpoint = thisForm.attr("action");
              var actionEndpoint = thisForm.attr("data-endpoint")
              var httpMethod = thisForm.attr("method");
              var formData = thisForm.serialize();

              $.ajax({
              url:actionEndpoint,
              method:httpMethod,
              data:formData,
              success: function(data){
              console.log("success")
              console.log(data)
              console.log("Added",data.added)
              console.log("Removed",data.removed)
              var submitSpan = thisForm.find(".submit-span")
              if(data.added){
               submitSpan.html("In Cart <button type="submit" class="btn btn-link">Remove?</button>")
              }else{
               submitSpan.html("<button type='submit'  class='btn btn-success'>Add to cart</button")
               }

              var navbarCount = $(".navbar-cart-count")
              navbarCount.text(data.cartItemCount)
              var currentpath=window.location.href

              if (currentpath.indexOf("cart") != -1){
                refreshCart()
              }
              },
              error: function(errorData){
                $.alert({
                title: "Oops",
                content: "An error occurred",
                theme :"modern"
              })
            }
          })

      })

               function refreshCart(){
                 console.log("in current cart")
                 var cartTable = $(".cart-table")
                 var cartBody = cartTable.find(".cart-body")
                 //cartBody.html("<h1>Changed</h1>")
                 var productsRows = cartBody.find(".cart-product")
                 var currentUrl = window.location.href
                 var refreshCartUrl = '/api/cart/';
                 var refreshCartMethod = "GET";
                 var data = {};
                 $.ajax({
                    url: refreshCartUrl,
                    method: refreshCartMethod,
                    data: data,
                    success: function(data){
                      var hiddenCartItemRemoveForm =$(".cart-item-remove-form") 
                      if (data.products.lenght>0){
                          productsRows.html(" ")
                          i = data.products.lenght

                          $.each(data.products, function(index, value){
                            console.log(value)
                            var newCartItemRemove= hiddenCartItemRemoveForm.clone()
                            newCartItemRemove.css("display", "block")
                            //newCartItemRemove.removeClass("hidden-class")
                            newCartItemRemove.find(".cart-item-product-id").val(value.id)
                              cartBody.prepend("<tr><th scope=\"row\">"+ i +"</th><td><a href='"+value.url+"'>"+value.name+"</a> "+ newCartItemRemove.html()+"</td><td>"+value.price + "</td></tr>")
                              i--
                            
                          })
                          cartBody.find(".cart-subtotal").text(data.subtotal)
                          cartBody.find(".cart-total").text(data.total)
                          
  
                      }else{
                        window.location.href = currentUrl
                      }
                      

                    },
                    error: function(errorData){
                      $.alert({
                        title: "Oops",
                        content: "An error occurred",
                        theme :"modern"
                      })
                    }
                 })

               }
            })