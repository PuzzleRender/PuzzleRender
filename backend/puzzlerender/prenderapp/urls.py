from django.urls import path
from .views import generate_puzzle, download_puzzle, download_clue, generate_and_download_puzzle

urlpatterns = [
  path('generate/<int:size>', generate_puzzle, name='generate_puzzle'),
  path('puzzle/<str:puzzle_id>/', download_puzzle, name='download_puzzle'),
  path('clue/<str:puzzle_id>/', download_clue, name='download_clue'),
  path('generateanddownload/<int:size>', generate_and_download_puzzle, name='generate_and_download_puzzle'),
]
