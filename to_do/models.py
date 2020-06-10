from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Task(models.Model):
	task = models.TextField(max_length=200)
	date_created = models.DateTimeField(default=timezone.now)
	author = models.ForeignKey(User, on_delete=models.CASCADE)