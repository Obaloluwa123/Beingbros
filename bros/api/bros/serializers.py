from rest_framework import serializers
from django.contrib.auth.models import User
from ...models import Profile, Brocode

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
        model = Brocode
        fields = '__all__'