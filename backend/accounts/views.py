import json

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token

@require_POST
def register(request):
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            {"error": "Invalid JSON."},
            status=400
        )

    username = data.get("username", "").strip()
    password = data.get("password", "")

    if not username or not password:
        return JsonResponse(
            {"error": "Username and password are required."},
            status=400
        )

    if User.objects.filter(username=username).exists():
        return JsonResponse(
            {"error": "Username already exists."},
            status=409
        )

    try:
        validate_password(password)
    except ValidationError as error:
        return JsonResponse(
            {"errors": error.messages},
            status=400
    )

    # create_user hashes the password before saving it.
    user = User.objects.create_user(
        username=username,
        password=password
    )

    return JsonResponse(
        {"id": user.id, "username": user.username},
        status=201
    )

@require_GET
@ensure_csrf_cookie
def csrf_token(request):
    token = get_token(request)
    return JsonResponse({"csrfToken": token})

@require_POST
def login_user(request):
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON."}, status=400)

    user = authenticate(
        request,
        username=data.get("username", ""),
        password=data.get("password", "")
    )

    if user is None:
        return JsonResponse(
            {"error": "Invalid username or password."},
            status=401
        )

    # Django creates a server-side session for the authenticated user.
    login(request, user)

    return JsonResponse({
        "id": user.id,
        "username": user.username
    })


@require_POST
def logout_user(request):
    # Invalidates the current session.
    logout(request)
    return JsonResponse({"message": "Logged out successfully."})


@require_GET
def current_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({"authenticated": False})

    return JsonResponse({
        "authenticated": True,
        "id": request.user.id,
        "username": request.user.username
    })