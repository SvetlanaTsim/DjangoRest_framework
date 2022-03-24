from .models import User
from .serializers import UserModelSerializer
from rest_framework import mixins, viewsets


#есть возможность просмотра списка и каждого пользователя в отдельности,
# можно вносить изменения, нельзя удалять и создавать
class UserModelViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin,
                       mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
