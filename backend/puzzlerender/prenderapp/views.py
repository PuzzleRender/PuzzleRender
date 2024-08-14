# from django.shortcuts import render
from django.http import HttpResponse, FileResponse
from .models import Puzzle, Clue
from .utils import generate_new_puzzle, create_puzzle_pdf, create_clue_pdf
from django.shortcuts import get_object_or_404

# Create your views here.
def generate_puzzle(request):
  title = "Crossword Puzzle"
  description = "This is an example of a crossword puzzle"
  
  puzzle = Puzzle.objects.create(
    title = title,
    description = description,
  )
  clue = Clue.objects.create(
     puzzle = puzzle,
     clue_text = 'this is a description of the clue',
  )

  size = 20

  generated_puzzle = generate_new_puzzle(size)

  puzzle_pdf = create_puzzle_pdf(puzzle, generated_puzzle)
  puzzle.pdf_file.save('puzzle-{}.pdf'.format(puzzle.id), puzzle_pdf)
  
  clue_pdf = create_clue_pdf(clue, generated_puzzle, puzzle.id)
  clue.pdf_file.save('clue-{}.pdf'.format(puzzle.id), clue_pdf)

  return HttpResponse(f"{puzzle.id} Puzzle and clues generated and saved.")


def download_puzzle(request, puzzle_id):
    puzzle = get_object_or_404(Puzzle, id=puzzle_id)
    clue = get_object_or_404(Clue, puzzle=puzzle)
    if puzzle.pdf_file:
        response = FileResponse(puzzle.pdf_file, as_attachment=True)
        return response
    return HttpResponse("Puzzle PDF not found.")

def download_clue(request, puzzle_id):
    puzzle = get_object_or_404(Puzzle, id=puzzle_id)
    clue = get_object_or_404(Clue, puzzle=puzzle)
    if puzzle.pdf_file:
        response = FileResponse(clue.pdf_file, as_attachment=True)
        return response
    return HttpResponse("Clue PDF not found.")