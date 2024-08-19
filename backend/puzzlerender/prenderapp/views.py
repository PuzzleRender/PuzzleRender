# from django.shortcuts import render
from django.http import HttpResponse, FileResponse
from .models import Puzzle, Clue
from .utils import generate_new_puzzle, create_puzzle_pdf, create_clue_pdf
from django.shortcuts import get_object_or_404
import zipfile
from io import BytesIO

# Create your views here.
def generate_puzzle(request, size):
  if (size < 9 or size > 25):
     return HttpResponse(f"Size must be between 9 and 25")
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

  generated_puzzle = generate_new_puzzle(size)

  puzzle_pdf = create_puzzle_pdf(puzzle, generated_puzzle)
  puzzle.pdf_file.save('puzzle-{}.pdf'.format(puzzle.id), puzzle_pdf)
  
  clue_pdf = create_clue_pdf(clue, generated_puzzle, puzzle.id)
  clue.pdf_file.save('clue-{}.pdf'.format(puzzle.id), clue_pdf)


  return HttpResponse(f"{puzzle.id} ===> Puzzle and clues generated and saved.")


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


# generate and download puzzle in zip
def generate_and_download_puzzle(request, size):
  if (size < 9 or size > 25):
     return HttpResponse(f"Size must be between 9 and 25")
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

  generated_puzzle = generate_new_puzzle(size)

  puzzle_pdf = create_puzzle_pdf(puzzle, generated_puzzle)
  puzzle.pdf_file.save('puzzle-{}.pdf'.format(puzzle.id), puzzle_pdf)
  
  clue_pdf = create_clue_pdf(clue, generated_puzzle, puzzle.id)
  clue.pdf_file.save('clue-{}.pdf'.format(puzzle.id), clue_pdf)

  # create a zip file in memory
  zip_buffer = BytesIO()
  with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
     zip_file.writestr(f'puzzle-{puzzle.id}.pdf', puzzle.pdf_file.read())
     zip_file.writestr(f'clue-{puzzle.id}.pdf', clue.pdf_file.read())


  response = HttpResponse(zip_buffer.getvalue(), content_type='application/zip')
  response['Content-Disposition'] = f'attachment; filename=puzzle-{puzzle.id}.zip'

  return response
