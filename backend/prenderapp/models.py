from django.db import models
import uuid

# Create your models here.
class Puzzle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    pdf_file = models.FileField(upload_to='puzzles/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
      return self.title

class Clue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    puzzle = models.ForeignKey(Puzzle, related_name='clues', on_delete=models.CASCADE)
    clue_text = models.TextField()
    pdf_file = models.FileField(upload_to='clues/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Clue for {self.puzzle.title}"
