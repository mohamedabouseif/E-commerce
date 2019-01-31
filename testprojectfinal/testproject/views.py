from django.contrib.auth import authenticate, login,get_user_model

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render,redirect,get_object_or_404
from .forms import ContactForm
from products.models import Product,Category,Car 
from django.contrib.auth import logout

def logout_view(request):
    logout(request)
    return redirect('home')

def home_page(request):
	queryset = Category.objects.all()
	x = Product.objects.all().order_by('-id')[:10][::-1]
	context = {
		'object_list': queryset,
		'x':x,
	}
	if request.user.is_authenticated():
		context["premium_content"] = "YEAHHHH" 
	return render(request,"index1.html",context)

def contact_page(request):  
		contact_form=ContactForm(request.POST or None)

		context={
		"title":"Hellow world welcome to the contact_page",
		"content":"welcome to the contact_page",
		"form": contact_form
		 }
		if contact_form.errors:
			 errors = contact_form.errors.as_json()
			 if request.is_ajax():
			 	  return HttpResponse(errors,status=400,content_type='application/json')
	
		#if request.method == "POST":
		#	 print(request.POST.get('fullname'))
		#	 print(request.POST.get('email'))
		#	 print(request.POST.get('content'))
		return render(request,"contact.html",context)

def about_page(request):
	context = {
		"title": "About Page",
		"content": "Welcome to the about page." 
	} 
	return render(request,"home_page.html",context)






