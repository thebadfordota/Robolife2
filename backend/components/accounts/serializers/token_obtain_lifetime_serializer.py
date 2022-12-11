from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class TokenObtainLifetimeSerializer(TokenObtainPairSerializer):
    """Сериализатор для получения jwt токена при авторизации"""

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['lifetime'] = int(refresh.access_token.lifetime.total_seconds())
        data['id'] = self.user.id
        data['is_superuser'] = self.user.is_superuser
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['is_staff'] = self.user.is_staff
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name
        data['patronymic'] = self.user.patronymic
        return data
