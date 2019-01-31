from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url,include
from django.contrib import admin
from products import views
from accounts.views import LoginView ,RegisiterView ,guest_register_view
from .views import home_page,contact_page,logout_view
from django.views.generic import RedirectView, TemplateView 
from addresses.views import checkout_address_create_view, checkout_address_reuse_view
from django.contrib.auth.views import LogoutView
from carts.views import cart_detail_api_view
from billing.views import payment_method_view, payment_method_createdview
urlpatterns = [
    url(r'^test/$', views.test, name='test'),
    url(r'^prc/(?P<pk>\d+)/$', views.ProductCustomList, name='custom_products'),
    url(r'^marks/(?P<pk>\d+)/$', views.board_topics, name='board_topics'),
    url(r'^$', home_page,name='home'),
    url(r'^$accounts/login', RedirectView.as_view(url='/login')), 
    url(r'^contact/$', contact_page,name='contact'),
    url(r'^checkout/address/create/$',checkout_address_create_view,name='checkout_address_create'),
    url(r'^checkout/address/reuse/$', checkout_address_reuse_view, name='checkout_address_reuse'),
    url(r'^login/$',LoginView.as_view(),name='login'),
    url(r'^register/guest/$',guest_register_view,name='guest_register'),
    url(r'^LogoutView/$',LogoutView.as_view(),name='logout'),
    url(r'^logout/$',logout_view,name='logout'),
    url(r'^api/cart/$',cart_detail_api_view,name='api_cart'),
    url(r'^cart/',include("carts.urls",namespace='cart')),
    url(r'^accounts/',include("accounts.urls",namespace='accounts')),
    url(r'^register/$',RegisiterView.as_view(),name='register'),
    url(r'^billing/payment-method/$', payment_method_view, name='billing-paument-method'),
    url(r'^billing/payment-method/create/$', payment_method_createdview, name='billing-paument-method-endpoint'),
    url(r'^product/',include("products.urls",namespace='product')),
    url(r'^search/',include("search.urls",namespace='Search')),
    url(r'^admin/', admin.site.urls),
    ]


if settings.DEBUG:
    urlpatterns =urlpatterns+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns =urlpatterns+static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns =urlpatterns+static(settings.STATIC_URL, document_root=settings.MEDIA_ROOT)