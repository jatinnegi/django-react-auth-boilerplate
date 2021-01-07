from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    profile_image = models.ImageField(
        upload_to='profile-photos/', default='profile-photos/default-profile-image.jpg')

    def __str__(self):
        return self.username
