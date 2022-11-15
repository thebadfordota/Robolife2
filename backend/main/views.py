from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
# from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


@api_view(['GET', 'POST'])
def get_list(request):
    a = 5
    return JsonResponse({'1': 22, '3': 44}, safe=False)
