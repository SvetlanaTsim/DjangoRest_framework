from django.db import models
from uuid import uuid4
from users.models import User


class Project(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    project_name = models.CharField(max_length=200)
    # link field may be empty
    repository_link = models.CharField(max_length=200, blank=True)
    project_users = models.ManyToManyField(User)


class ToDo(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    user = models.ForeignKey(User, models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
