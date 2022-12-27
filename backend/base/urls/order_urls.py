from django.urls import path

from base.views.order_views import addOrderItems, getOrders, getOrderById, getMyOrders, updateOrderToDelivered
urlpatterns = [
    path('', getOrders, name='get-order'),
    path('add/', addOrderItems, name='add-order'),
    path('myorders/', getMyOrders, name='my-orders'),
    path('<str:pk>/', getOrderById, name='order-by-id'),
    path('<str:pk>/deliver/', updateOrderToDelivered, name='update-order-deliver'),


]
