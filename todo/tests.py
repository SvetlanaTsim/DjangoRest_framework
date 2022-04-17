import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .views import ProjectModelViewSet
from .models import ToDo, Project
from users.models import User


class TestProjectViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_admin(self):
        factory = APIRequestFactory()
        user = User.objects.create_user('aaaa', '111n@admin.com', '11111')
        request = factory.post('/api/projects/', {'project_name': 'Pr1',
                                                 'repository_link': 'www.1111.ru',
                                                 'project_users': [user.uid]}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                              'admin123456')
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_edit_guest(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.put(f'/api/projects/{project.uid}/', {'project_name': 'Pr1',
                                                             'repository_link': 'www.1111.ru'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        project = mixer.blend(Project)
        client = APIClient()
        user = User.objects.create_user('aaaa', '111n@admin.com', '11111')
        admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                              'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/projects/{project.uid}/', {'project_name': 'Pr1',
                                                                'repository_link': 'www.1111.ru',
                                                                'project_users': [user.uid]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(pk=project.uid)
        self.assertEqual(project.project_name, 'Pr1')
        self.assertEqual(project.repository_link, 'www.1111.ru')
        client.logout()


class TestToDoViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = mixer.blend(Project)
        user = User.objects.create_user('aaaa', '111n@admin.com', '11111')
        todo = ToDo.objects.create(text='Заметка 1', project=project, user=user)
        admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                              'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/todo/{todo.uid}/', {'project': todo.project.uid,
                                                              'text': 'aaaaaaaaa',
                                                              'user': user.uid })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(pk=todo.uid)
        self.assertEqual(todo.text, 'aaaaaaaaa')
