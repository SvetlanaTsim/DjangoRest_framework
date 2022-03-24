from django.db import models
from uuid import uuid4
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    # def __str__(self):
    #     return self.username

    uid = models.UUIDField(primary_key=True, default=uuid4)
    email = models.EmailField(verbose_name='email', blank=False, unique=True)
