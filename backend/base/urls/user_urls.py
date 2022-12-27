from django.urls import path


from base.views.user_views import MyTokenObtainPairView, getUserProfile, getUsers, registerUser, updateUserProfile, deleteUser,updateUser, getUserById


urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='MyTokenObtainPairView'),
    path('profile/', getUserProfile, name='users-profile'),
    path('', getUsers, name='users'),
    path('register/', registerUser, name='register'),
    path('profile/update/', updateUserProfile, name='update-users-profile'),
    path('delete/<str:pk>/', deleteUser, name='delete-user'),
    path('update/<str:pk>/', updateUser, name='update-user'),
    path('<str:pk>/', getUserById, name='user'),



]
