from rest_framework import serializers
from django.contrib.auth.models import User
from ...models import Profile, Story

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name','last_name','email','password']


class ProfileModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
class BroCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'