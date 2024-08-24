from django.urls import path
from .views import GenerateAndDownload, UserPuzzlesView, DeletePuzzleView, GeneratePuzzle, DownloadClue, DownloadPuzzle
from django.urls import path, re_path
from .views import IndexView

urlpatterns = [
    # re_path(r'^.*$', IndexView.as_view(), name='index'),
    # path('home/', home, name='home'),
    path('generate/<int:size>', GeneratePuzzle.as_view(), name='generate_and_download_puzzle'),
    path('download-puzzle/<str:puzzle_id>', DownloadPuzzle.as_view(), name='generate_and_download_puzzle'),
    path('download-clue/<str:puzzle_id>', DownloadClue.as_view(), name='generate_and_download_puzzle'),
    path('generateanddownload/<int:size>', GenerateAndDownload.as_view(), name='generate_and_download_puzzle'),
    path('user-puzzles/', UserPuzzlesView.as_view(), name='user-puzzles'),
    path('delete-puzzle/<str:puzzle_id>/', DeletePuzzleView.as_view(), name='delete-puzzle'),
]