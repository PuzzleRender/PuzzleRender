# from django.db import models
# from django.utils import timezone

# class Users(models.Model):
#     """
#     Define the user data
#     """
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)  # Consider using Django's built-in auth system instead
#     created_at = models.DateTimeField(default=timezone.now)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"{self.first_name} {self.last_name}"

