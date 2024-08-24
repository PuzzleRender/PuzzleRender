from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
import uuid

class Puzzle(models.Model):
    """
    Define the puzzle data
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='puzzles')
    title = models.CharField(max_length=200)
    description = models.TextField()
    pdf_file = models.FileField(upload_to='puzzles/', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    # file_size = models.PositiveIntegerField(help_text='File size in bytes')

    def __str__(self):
        return self.title

class Clue(models.Model):
    """
    Define the clues data
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    puzzle = models.OneToOneField(Puzzle, on_delete=models.CASCADE, related_name='clue')
    clue_text = models.TextField()
    pdf_file = models.FileField(upload_to='clues/', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    # file_size = models.PositiveIntegerField(help_text='File size in bytes')

    def __str__(self):
        return f"Clue for {self.puzzle.title}"
