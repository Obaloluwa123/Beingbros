
from django.db.models.signals import post_delete, post_save, post_delete
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile, TimeLine, Following, Followers



@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        profile = Profile(bro = instance)
        profile.email = profile.bro.email
        profile.displayName = profile.bro.first_name
        profile.slug = profile.bro.username
        profile.save()

@receiver(post_delete, sender=User)
def delete_profile(sender, instance, created, **kwargs):
    if not created:
       profile = Profile(bro=instance)
       profile.delete()
    
@receiver(post_save, sender=Profile)
def create_timeline(sender,instance,created,**kwargs):
    if created:
        timeline = TimeLine(owner=instance)
        timeline.save()



@receiver(post_save, sender=Profile)
def create_following_list(sender, instance, created, **kwargs):
    if created:
        following_list = Following(profile= instance)
        following_list.save()


@receiver(post_save, sender=Profile)
def create_follower_list(sender, instance, created, **kwargs):
    if created:
        followers_list = Followers(profile=instance)
        followers_list.save()



