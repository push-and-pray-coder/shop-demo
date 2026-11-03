from django.http import JsonResponse
from .models import Product, Category

def product_list(request):
    products = Product.objects.values("id", "name", "price", "category_id")
    return JsonResponse(list(products), safe=False)

def category_list(request):
    categories = Category.objects.all()

    data = [
        {
            "id" : category.id,
            "name" : category.name,
            "image" : category.image.url if category.image else None,
        }
        for category in categories
    ]

    return JsonResponse(data, safe=False)