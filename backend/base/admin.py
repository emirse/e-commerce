from itertools import product
from django.contrib import admin

from base.models import Product,Order,OrderItem,Review,ShippingAddress

# Register your models here.


admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Review)
admin.site.register(ShippingAddress)
