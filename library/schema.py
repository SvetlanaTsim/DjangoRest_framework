import graphene
from graphene_django import DjangoObjectType
from todo.models import ToDo, Project
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        #fields = ['uid', 'username', 'first_name', 'last_name', 'email']
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    all_todos = graphene.List(ToDoType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

schema = graphene.Schema(query=Query)
