from turtle import update
from django.urls import path
from base.views.product_views import getRoutes, getProducts, getProduct, deleteProduct, createProduct, updateProduct, uploadImage


urlpatterns = [
    path("test/", getRoutes, name="routes"),
    path("upload/", uploadImage, name="product-image"),
    path("", getProducts, name="products"),
    path("<str:pk>", getProduct, name="product"),
    path('delete/<str:pk>/', deleteProduct, name='delete-product'),
    path("create/", createProduct, name="create-product"),
    path('update/<str:pk>/', updateProduct, name='update-product'),

]
