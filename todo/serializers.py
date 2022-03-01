from rest_framework.serializers import ModelSerializer
from users.serializers import SimpleUserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    project_users = SimpleUserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class SimpleProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['project_name', 'repository_link']


class ToDoModelSerializer(ModelSerializer):
    project = SimpleProjectModelSerializer()
    user = SimpleUserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
