from .models import User
from .serializers import UserModelSerializer, UserModelSerializerExtended
from rest_framework import mixins, viewsets


#есть возможность просмотра списка и каждого пользователя в отдельности,
# можно вносить изменения, нельзя удалять и создавать
class UserModelViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin,
                       mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerExtended

        return UserModelSerializer
