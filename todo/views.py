from rest_framework.viewsets import ModelViewSet
from .filters import ProjectFilter, ToDoFilter
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer
from rest_framework.pagination import PageNumberPagination


class ProjectPageNumberPagination(PageNumberPagination):
   page_size = 10


class ToDoPageNumberPagination(PageNumberPagination):
   page_size = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPageNumberPagination
    filterset_class = ProjectFilter


#при удалении не удалять заметку, а выставлять признак, что она закрыта
class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoPageNumberPagination
    filterset_class = ToDoFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
