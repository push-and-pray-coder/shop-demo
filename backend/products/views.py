from django.http import JsonResponse
from .models import Product, Category

def product_list(request):
    products = Product.objects.values("id", "name", "price", "category_id")
    return JsonResponse(list(products), safe=False)

def category_list(request):
    categories = Category.objects.values("id", "name")
    return JsonResponse(list(categories), safe=False)