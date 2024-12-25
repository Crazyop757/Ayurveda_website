from django.shortcuts import redirect, render , HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login
from home import views
# Create your views here.
def sign(request):
    if request.method=='POST':
        username = request.POST.get('username')
        pass1 = request.POST.get('pass')
        user=authenticate(request,username=username,password=pass1)
        if user is not None:
            login(request,user)
            return redirect('home')
        else:
            return HttpResponse("Incorrect password or username")
    return render(request,'login.html')

def register(request):
    if request.method=='POST':
        username = request.POST.get("username")
        email = request.POST.get("email")
        pass1 = request.POST.get("password1")
        pass2 = request.POST.get("password2")
        if pass1 != pass2:
            return HttpResponse("your password and confirm password is not same")
        else:
            my_user = User.objects.create_user(username,email,pass1)
            my_user.save()
            return redirect('sign')

    return render(request,'register.html')