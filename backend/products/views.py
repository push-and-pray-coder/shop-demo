from django.http import JsonResponse
from .models import Product, Category
from django.shortcuts import get_object_or_404

def product_list(request):
    products = Product.objects.all()

    data = [
        {
            "id": product.id,
            "name": product.name,
            "price": str(product.price),
            "category_id": product.category_id,
            "image": product.image.url if product.image else None,
        }
        for product in products
    ]

    return JsonResponse(data, safe=False)

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

def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)

    data = {
        "id": product.id,
        "name": product.name,
        "price": str(product.price),
        "description": product.description,
        "category_id": product.category_id,
        "image": product.image.url if product.image else None,
    }

    return JsonResponse(data, safe=False)