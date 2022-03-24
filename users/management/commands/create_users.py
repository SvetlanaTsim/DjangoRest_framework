from users.models import User
from django.core.management.base import BaseCommand


# создаем superuser и 2 тестовых юзера
class Command(BaseCommand):
    def handle(self, *args, **options):
        superuser = User.objects.create_superuser('admin', 'admin@geekbrains.ru', '123')
        test_user_1 = User.objects.create_user('user_1', 'user_1@geekbrains.ru', '456')
        test_user_2 = User.objects.create_user('user_2', 'user_2@geekbrains.ru', '789')
