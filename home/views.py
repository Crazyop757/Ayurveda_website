from django.shortcuts import render , HttpResponse
from django.http import JsonResponse
from django.db.models import Q
from search_result.models import Remedy
# Create your views here.
def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def explore(request):
    return render(request, 'explore.html')

def search(request):
    query = request.GET.get('query', '')  # Get the search query from the request
    results = []  # Default to an empty list if no query provided

    if query:  # Only search if a query exists
        results = Remedy.objects.filter(
            Q(disease__icontains=query) | Q(remedy__icontains=query) | Q(preparation__icontains=query)
        )

    return render(request, 'search.html', {
        'query': query,
        'results': results,
    })

def search_suggestions(request):
    query = request.GET.get('query', '').strip()
    print("Received query:", query)  # Debugging line
    if query:
        results = Remedy.objects.filter(disease__icontains=query)
        diseases = [remedy.disease for remedy in results]
        return JsonResponse({'diseases': diseases})
    return JsonResponse({'diseases': []})