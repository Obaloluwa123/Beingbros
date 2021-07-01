from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.Profile)
admin.site.register(models.Followers)
admin.site.register(models.Following)
admin.site.register(models.TimeLine)
admin.site.register(models.Story)
