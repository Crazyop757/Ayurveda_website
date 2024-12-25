from django.shortcuts import render , HttpResponse
from django.http import JsonResponse
from search_result.models import Remedy
# Create your views here.
def home(request):
    return render(request, 'home.html')

def about(request):
    return HttpResponse("This is a about page")

def contact(request):
    return render(request, 'contact.html')

def search(request):
        return render(request, 'search.html')

def search_suggestions(request):
    query = request.GET.get('query', '').strip()
    print("Received query:", query)  # Debugging line
    if query:
        results = Remedy.objects.filter(disease__icontains=query)
        diseases = [remedy.disease for remedy in results]
        return JsonResponse({'diseases': diseases})
    return JsonResponse({'diseases': []})