from django.shortcuts import render
from django.http import HttpResponse, FileResponse
from .models import Puzzle, Clue
from .utils import generate_new_puzzle, create_puzzle_pdf, create_clue_pdf
from django.shortcuts import get_object_or_404
import zipfile
from io import BytesIO
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

# Create your views here.
@permission_classes([IsAuthenticated])
def generate_puzzle(request, size):
    print('i got in')
    if size < 9 or size > 25:
        return HttpResponse("Size must be between 9 and 25")
    
    title = "Crossword Puzzle"
    description = "This is an example of a crossword puzzle"
    
    puzzle = Puzzle.objects.create(
        user=request.user,
        title=title,
        description=description,
    )
    clue = Clue.objects.create(
        puzzle=puzzle,
        clue_text='this is a description of the clue',
    )

    generated_puzzle = generate_new_puzzle(size)

    puzzle_pdf = create_puzzle_pdf(puzzle, generated_puzzle)
    puzzle.pdf_file.save(f'puzzle-{puzzle.id}.pdf', puzzle_pdf)
    
    clue_pdf = create_clue_pdf(clue, generated_puzzle, puzzle.id)
    clue.pdf_file.save(f'clue-{puzzle.id}.pdf', clue_pdf)

    return HttpResponse(f"{puzzle.id} ===> Puzzle and clues generated and saved.")

# @login_required
def download_puzzle(request, puzzle_id):
    puzzle = get_object_or_404(Puzzle, id=puzzle_id, user=request.user)
    if puzzle.pdf_file:
        response = FileResponse(puzzle.pdf_file, as_attachment=True)
        return response
    return HttpResponse("Puzzle PDF not found.")

# @login_required
def download_clue(request, puzzle_id):
    puzzle = get_object_or_404(Puzzle, id=puzzle_id, user=request.user)
    clue = get_object_or_404(Clue, puzzle=puzzle)
    if clue.pdf_file:
        response = FileResponse(clue.pdf_file, as_attachment=True)
        return response
    return HttpResponse("Clue PDF not found.")

# @login_required
def generate_and_download_puzzle(request, size):
    if size < 9 or size > 25:
        return HttpResponse("Size must be between 9 and 25")
    
    title = "Crossword Puzzle"
    description = "This is an example of a crossword puzzle"
    
    puzzle = Puzzle.objects.create(
        user=request.user,
        title=title,
        description=description,
    )
    clue = Clue.objects.create(
        puzzle=puzzle,
        clue_text='this is a description of the clue',
    )

    generated_puzzle = generate_new_puzzle(size)

    puzzle_pdf = create_puzzle_pdf(puzzle, generated_puzzle)
    puzzle.pdf_file.save(f'puzzle-{puzzle.id}.pdf', puzzle_pdf)
    
    clue_pdf = create_clue_pdf(clue, generated_puzzle, puzzle.id)
    clue.pdf_file.save(f'clue-{puzzle.id}.pdf', clue_pdf)

    # create a zip file in memory
    zip_buffer = BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
        zip_file.writestr(f'puzzle-{puzzle.id}.pdf', puzzle.pdf_file.read())
        zip_file.writestr(f'clue-{puzzle.id}.pdf', clue.pdf_file.read())

    response = HttpResponse(zip_buffer.getvalue(), content_type='application/zip')
    response['Content-Disposition'] = f'attachment; filename=puzzle-{puzzle.id}.zip'

    return response
