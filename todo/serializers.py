from rest_framework.serializers import ModelSerializer
from users.serializers import SimpleUserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    project_users = SimpleUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'
        # exclude = ['project_users']


class SimpleProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['uid', 'project_name']


class ToDoModelSerializer(ModelSerializer):
    project = SimpleProjectModelSerializer()
    user = SimpleUserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
        # exclude = ['project', 'user']
