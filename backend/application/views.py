from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse, FileResponse
from .models import Puzzle, Clue
from .utils import generate_new_puzzle, create_puzzle_pdf, create_clue_pdf
from django.shortcuts import get_object_or_404
import zipfile
from io import BytesIO
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from .serializers import PuzzleSerializer


# @login_required
# def home(request):
#     return render(request, 'index.html')

from django.views.generic import TemplateView

class IndexView(TemplateView):
    template_name = 'index.html'

from django.core.paginator import Paginator

# class UserPuzzlesView(LoginRequiredMixin, APIView):
class UserPuzzlesView(APIView):
    def get(self, request):
        # Get the limit and page from query parameters
        limit = int(request.GET.get('limit', 3))  # Default to 3 if not provided
        page_number = int(request.GET.get('page', 1))  # Default to the first page
        
        # Fetch puzzles for the authenticated user
        user_puzzles = Puzzle.objects.filter(user=request.user).order_by('-created_at')

        # Create a Paginator object
        paginator = Paginator(user_puzzles, limit)
        
        # Get the current page
        page = paginator.get_page(page_number)

        # Serialize the data
        serializer = PuzzleSerializer(page.object_list, many=True)

        # Return paginated data along with pagination info
        return Response({
            'puzzles': serializer.data,
            'total_pages': paginator.num_pages,
            'current_page': page_number,
            'has_next': page.has_next(),
            'has_previous': page.has_previous(),
        })
    
class DeletePuzzleView(LoginRequiredMixin, APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, puzzle_id):
        puzzle = get_object_or_404(Puzzle, id=puzzle_id, user=request.user)
        
        # The associated Clue will be automatically deleted due to the CASCADE relationship
        puzzle.delete()
        
        return Response({"message": "Puzzle and associated clue deleted successfully"}, status=204)
    
class GeneratePuzzle(APIView):
    # authentication_clases = [SessionAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        size = kwargs.get('size')
        if (size < 9 or size > 25):
            return HttpResponse(f"Size must be between 9 and 25")
        title = "Crossword Puzzle"
        description = "This is an example of a crossword puzzle"
        
        puzzle = Puzzle.objects.create(
            user = request.user,
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

class DownloadPuzzle(APIView):
    def get(self, request, *args, **kwargs):
        puzzle_id = kwargs.get('puzzle_id')
        puzzle = get_object_or_404(Puzzle, id=puzzle_id)
        clue = get_object_or_404(Clue, puzzle=puzzle)
        if puzzle.pdf_file:
            response = FileResponse(puzzle.pdf_file, as_attachment=True)
            return response
        return HttpResponse("Puzzle PDF not found.")
    
class DownloadClue(APIView):
    def get(self, request, *args, **kwargs):
        puzzle_id = kwargs.get('puzzle_id')
        puzzle = get_object_or_404(Puzzle, id=puzzle_id)
        clue = get_object_or_404(Clue, puzzle=puzzle)
        if puzzle.pdf_file:
            response = FileResponse(clue.pdf_file, as_attachment=True)
            return response
        return HttpResponse("Clue PDF not found.")
class GenerateAndDownload(LoginRequiredMixin, APIView):
    authentication_clases = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        size = kwargs.get('size')
        if (size < 9 or size > 25):
            return HttpResponse(f"Size must be between 9 and 25")
        title = "Crossword Puzzle"
        description = "This is an example of a crossword puzzle"
        
        puzzle = Puzzle.objects.create(
            user = request.user,
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