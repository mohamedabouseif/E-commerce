from django import forms

from .models import Address

class AdressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields=[
           # 'billing_profile',
            #'address_type',
            'adress_line1',
            'adress_line2',
            'city',
            'country',
            'state',
            'postal_code'
        ]
