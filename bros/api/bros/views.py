from django.http import HttpResponse, JsonResponse
import json
from .serializers import ProfileModelSerializer, BroCodeSerializer
from  ...models  import Profile, Story, TimeLine, Following, Followers
import time, datetime

def response(request):
    
    profile = Profile.objects.get(user=request.user)
    serializer = ProfileModelSerializer(profile)
    return JsonResponse(serializer.data, safe=False)

def post_brocode(request):

    if(request.user.is_authenticated):
        brocode_body = json.loads(request.body)['brocode-body']
        brocode_author = request.user
        brocode = Story(creator=brocode_author.profile, story_body=brocode_body)
        brocode.save()
        personal_timeline = TimeLine.objects.get(owner=brocode_author.profile)
        personal_timeline.list.add(Story.objects.get(id=brocode.id))
        followers_list = Followers.objects.get(profile=brocode_author.profile)
        followers_list = followers_list.followers.all()
        if(len(followers_list)>0):
            for follower in followers_list:
                target_timeline = TimeLine.objects.get(owner=follower)
                target_timeline.list.add(Story.objects.get(id=brocode.id))
        serializer = BroCodeSerializer(brocode)
        response = serializer.data
        response['creator'] = request.user.username
        response['creator-display-name'] = request.user.profile.displayName
        return JsonResponse(response, safe=False)

def get_brocodes(request, timestamp):
    if (request.method == "GET"):

        datetime_ = datetime.datetime.fromtimestamp(float(timestamp)/1000)
        personal_timeline = TimeLine.objects.get(owner=request.user.profile)
        retrived_brocodes = personal_timeline.list.all().order_by('-created').exclude(creator=request.user.profile)[:30]
        filtered_brocodes = []
        for bc in retrived_brocodes:
            if(int(bc.created.timestamp()) > int(timestamp)):
                filtered_brocodes.append(bc)
        
        
        serializer = BroCodeSerializer(filtered_brocodes, many=True)
        for s in serializer.data:
            s['creator'] = Story.objects.get(id=s['id']).creator.user.username
            s['creator-display-name'] = Story.objects.get(id=s['id']).creator.displayName
        return JsonResponse(serializer.data,safe=False)

def like_brocode(request, brocode_id):
    brocode = Story.objects.get(id=brocode_id)
    brocode.likes +=1
    serializer = BroCodeSerializer(brocode)
    return JsonResponse(serializer.data,safe=False)

def unlike_brocode(request, brocode_id):
    brocode = Story.objects.get(id=brocode_id)
    brocode.likes -=1
    serializer = BroCodeSerializer(brocode)
    return JsonResponse(serializer.data,safe=False)


def search_users(request):
    search_query = json.loads(request.body)['search-query']
    profiles = Profile.objects.filter(displayName__startswith=search_query)
    serializer = ProfileModelSerializer(profiles,many=True)
    return JsonResponse(serializer.data,safe=False)


def get_profile(request,slug):
    print(slug)
    user = Profile.objects.get(slug=slug)
    serializer = ProfileModelSerializer(user)
    response = serializer.data
    response['username'] = user.user.username
    print(response)
    return JsonResponse(response,safe=False)

def commit_follow(request,slug):
    sender_profile = request.user.profile
    receiver_profile = Profile.objects.get(slug=slug)
    following_list = Following.objects.get(profile=sender_profile)
    following_list.follows.add(receiver_profile)
    followers_list = Followers.objects.get(profile=receiver_profile)
    followers_list.followers.add(sender_profile)
    response = {"message":"Success"}
    return JsonResponse(json.dumps(response),safe=False)