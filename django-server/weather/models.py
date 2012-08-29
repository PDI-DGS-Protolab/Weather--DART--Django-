import json
from django.db import models
import datetime

class Query(models.Model):
    user = models.CharField(max_length=20)
    date = models.DateTimeField()
    city = models.CharField(max_length=200)
    result_json = models.TextField()
	
    def json(self):
        d = self.date + datetime.timedelta(0,7200)
        return json.dumps({
            "id" : self.id,
            "user" : self.user,
            "city" : self.city,
            "date" : "%d-%d-%d %d:%02d" % (d.day, d.month, d.year, d.hour, d.minute),
            "result_json" : json.loads(self.result_json),
        })
	 	
    def __unicode__(self):
        self.date = self.date + datetime.timedelta(0,7200)
        return self.user + " - " + self.city + " %d-%d-%d %d:%02d" % (self.date.day, self.date.month, self.date.year, self.date.hour, self.date.minute)
