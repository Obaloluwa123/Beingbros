from django.core.checks.messages import Error
from django.shortcuts import render, redirect
from .forms import *
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponse


def index(request):
    
    context = {}

    if request.user.is_authenticated:
        return redirect('home')

    if request.method == "POST":
        form = UserRegistrationForm(request.POST)
      
        if form.is_valid():
            email = form.cleaned_data['email']
            try:
                User.objects.get(email=email)
                error = "Email already exists"
                context['error'] = error
                context['form'] = form
                return render(request, 'bros/registration.html', context)
            except User.DoesNotExist:

                username    = form.cleaned_data['username']
                first_name  = form.cleaned_data['first_name']
                last_name   = form.cleaned_data['last_name']
                password    = form.cleaned_data['password']
                user        = User(
                    username    = username,
                    email = email,
                    first_name  = first_name,
                    last_name   = last_name,
                )
                user.set_password(password)
                user.save()
                login(request, user)
                return redirect('home')

        
        else:
            return render(request, 'bros/registration.html', {'form': form})

    form = UserRegistrationForm()
    context['form'] = form

    return render(request, 'bros/registration.html', context)


def home(request):
    if request.method == "POST":
        body   = request.POST['post-body']
        post   = Story(creator=request.user, story_body=body) 
        post.save()

    try:
        user   = User.objects.get(username=request.user)
    except:
        return redirect('register')
    
    tl   = TimeLine.objects.get(owner=request.user.profile)
    stories  = tl.list.all().order_by('-created')[:7]

    context = {'stories':stories}

    return render(request, 'bros/home.html', context)


def signout_page(request):
    logout(request)
    return render(request, 'bros/signout.html', {})

def signin_page(request):

    if request.method == "POST":
        username  = request.POST['username']
        password  = request.POST['password']
        
        #set requirements (parameters) for authentication
        user = authenticate(username=username, password=password)

       #if authenticated go home
        if user:
            login(request, user)
            return redirect('home')
    
    form = UserLoginForm()
    context = {
        "form": form,
    }
    return render(request, 'bros/signin.html', context)





