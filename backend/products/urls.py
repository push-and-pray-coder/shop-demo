from django.urls import path
from .views import product_list, category_list, product_detail

urlpatterns = [
    path("products/", product_list, name="product_list"),
    path("categories/", category_list, name="category_list"),
    path("products/<int:product_id>/", product_detail, name="product_detail"),
]