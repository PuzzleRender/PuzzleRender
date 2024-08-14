from django.urls import path
from .views import generate_puzzle, download_puzzle, download_clue

urlpatterns = [
  path('generate/', generate_puzzle, name='generate_puzzle'),
  path('puzzle/<str:puzzle_id>/', download_puzzle, name='download_puzzle'),
  path('clue/<str:puzzle_id>/', download_clue, name='download_clue'),
]
