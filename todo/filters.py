from django_filters import rest_framework as filters, DateTimeFromToRangeFilter
from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    """
    Filter for projects by the name or the part of the name
    """
    project_name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['project_name']


class ToDoFilter(filters.FilterSet):
    """
    Filter for notes by project and created and updated fields
    """
    project = filters.ModelChoiceFilter(queryset=Project.objects.all())
    created_at = DateTimeFromToRangeFilter()
    updated_at = DateTimeFromToRangeFilter()

    class Meta:
       model = ToDo
       fields = ['project', 'created_at', 'updated_at']
