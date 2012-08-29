from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('weather.views',
    url(r'^weather/$', 'index'),
    url(r'^weather/querys/$', 'querys'),
    url(r'^weather/querys/(?P<id>\d+)/$', 'query', name="weather_query"),
    url(r'^weather/register/$',  'register',  name="register"),
    url(r'^weather/login/$',  'login_user',  name="login"),
    url(r'^weather/logout/$',  'logout_user',  name="logout"),
    url(r'^admin/', include(admin.site.urls)),
)
