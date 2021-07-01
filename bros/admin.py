from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Profile)
admin.site.register(Followers)
admin.site.register(Following)
admin.site.register(TimeLine)
admin.site.register(Story)
