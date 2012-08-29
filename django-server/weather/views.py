from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, get_list_or_404
from weather.models import Query
import requests, json
from django.utils import timezone

# API Key for authentication with the World Weather Online server
API_KEY = '0a535779e9103421121207'

# Function that represents a user login
def login_user(request):
    if request.method == 'OPTIONS':
        response = HttpResponse()
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = request.META['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']
        response['Access-Control-Max-Age'] = '1728000'

    else:
        username = json.loads(request.raw_post_data)['username']
        password = json.loads(request.raw_post_data)['password']
                
        user = authenticate(username=username, password=password)
        
        if user is not None:
            if user.is_active:
                login(request, user)
                request.session.set_expiry(0)
                response = HttpResponse( "<h1>Login success</h1>")
            else:
                response = HttpResponse( "<h1>401 - Disabled account</h1>", status=401)
        else:
            response = HttpResponse( "<h1>401 - Invalid user/pass</h1>", status=401)

    set_CORS(response, request);    
    return response                    

        
def logout_user(request):
    logout(request)
    response = HttpResponse("<h1>Logged out</h1>")
    set_CORS(response, request);
    return response
        
# This represents the resource that allows
def querys(request):
    if request.method == 'POST':
        if request.user.is_authenticated(): 
            if request.META['CONTENT_TYPE'].split(';')[0] == 'application/json':
                city = json.loads(request.raw_post_data)['city']
            else:
                city = request.POST['city']

            r = requests.get('http://free.worldweatheronline.com/feed/weather.ashx?q='+city+'&format=json&num_of_days=2&key='+API_KEY)
            if 'error' in r.json['data']:
                response = HttpResponse(r.content)
            else:
                q = Query.objects.create(user = request.user, city = r.json["data"]["request"][0]["query"], date = timezone.now(), result_json = r.content)
                response = query(request, q.id)

        else:
            response = HttpResponse( "<h1>401 - Unauthorized</h1>", status=401)

    elif request.method == 'OPTIONS':
        response = HttpResponse()
        response['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        response['Access-Control-Allow-Headers'] = request.META['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']
        response['Access-Control-Max-Age'] = '1728000'
    
    set_CORS(response, request);
    return response

# This represents a single query stored in the database
def query(request, id):

    if request.user.is_authenticated():
        q = get_object_or_404(Query, pk=id)
        response = render(request, 'weather/query.html', {'query' : q.json}, content_type="application/json")
        
    else:
        response = HttpResponse( "<h1>401 - Unauthorized</h1>", status=401)

    set_CORS(response, request);
    return response

# This is needed to make cross-site references
def set_CORS(response, request):
        response['Access-Control-Allow-Origin'] = request.META['HTTP_ORIGIN']
        response['Access-Control-Allow-Credentials'] = 'true'
