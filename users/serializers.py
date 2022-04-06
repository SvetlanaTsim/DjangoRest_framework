from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['uid', 'username', 'first_name', 'last_name', 'email']


class SimpleUserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        # fields = ['username', 'first_name', 'last_name']
        fields = ['uid', 'username']

    # def __str__(self):
    #     return self.username
