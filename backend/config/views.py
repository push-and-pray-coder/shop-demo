from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Vanilla API test
# def test_api(request):
#     return JsonResponse({"message": "Django is connnected!"})

@api_view(['GET'])
def test_api(request):
    return Response({'message': 'Django REST Framework is connected!'})