from django.conf.urls import url

from .views import (
	SearchProductview
	)


 
urlpatterns = [
   
    url(r'^$',SearchProductview.as_view(),name='query'),
   
    
]