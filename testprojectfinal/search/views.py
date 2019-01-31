# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.views.generic import ListView
from products.models import Product

class SearchProductview(ListView):    
   template_name="search/view.html"

   def get_queryset(self,*args,**kwargs):
		request=self.request
		query=request.GET.get('q',None)
		if query is not None:
		   return product.objects.filter(title__iexact=query)
		return product.objects.featured()   



