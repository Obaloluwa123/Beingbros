from django import forms
from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
from django.forms import widgets
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_save
import datetime


# Create your models here.

class Profile(models.Model):
    bro          = models.ForeignKey(User, on_delete=models.CASCADE)
    displayName  = models.CharField(max_length=30, null=False, blank=False, default="User")
    bio          = models.CharField(max_length=200, blank=True)
    email        = models.EmailField(max_length=150, default="")
    birthDate    = models.DateField(default=datetime.date(2000,1,1))
    slug         = models.CharField(max_length=120, null=True, blank=True)

    def __str__(self):
        return self.bro.first_name + " " + self.bro.last_name

    class Meta:
        verbose_name_plural = "Profiles"
   

class Story(models.Model):
    creator  = models.ForeignKey(Profile, on_delete=models.CASCADE)
    story_body     = models.TextField(blank=False)
    created  = models.DateTimeField(auto_now_add=True)
    likes    = models.IntegerField(default=0)

    def __str__(self):
        return self.story_body

    #to get right plurals
    class Meta:
        verbose_name_plural = "Stories"


class TimeLine(models.Model):
    owner          = models.ForeignKey(Profile, on_delete=models.CASCADE)
    list           = models.ManyToManyField(Story, related_name="list")

    def __str__(self):
        return self.owner.displayName + " " + "Timeline"

    class Meta:
        verbose_name_plural = "TimeLine"




class Following(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    follows = models.ManyToManyField(Profile, related_name="follows_list")

    def __str__(self):
        return self.profile.displayName + " " + "Following..."

    

class Followers(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    followers = models.ManyToManyField(Profile, related_name="followers_list")

    def __str__(self):
        return self.profile.displayName + " " + "Followers List"

    class Meta:
        verbose_name_plural = "Followers"
