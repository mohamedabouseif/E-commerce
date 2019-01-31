from django.db import models
from billing.models import BillingProfile


ADDRESS_TYPES =(
    ('billing','Billing'),
    ('shipping','Shipping'),

)
class Address(models.Model):
    billing_profile = models.ForeignKey(BillingProfile)
    address_type    = models.CharField(max_length=120,choices=ADDRESS_TYPES)
    adress_line1    = models.CharField(max_length=120)
    adress_line2    = models.CharField(max_length=120,null=True,blank=True)
    city            = models.CharField(max_length=120)
    country         = models.CharField(max_length=120,default='Assuit')
    state           = models.CharField(max_length=120)
    postal_code     = models.CharField(max_length=120)

    def __str__(self):
        return str(self.billing_profile)

    def get_address(self):
        return "{line1}\n{lin2}\n{city}\n{state}, {postal}\n{country}".format(
            line1=self.adress_line1,
            lin2=self.adress_line2 or "",
            city=self.city,
            state=self.state,
            postal=self.postal_code,
            country=self.country
        )