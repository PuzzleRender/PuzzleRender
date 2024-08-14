from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO
from django.core.files.base import ContentFile
import random
import string

def generate_new_puzzle(size):
    word_list = [
      ("ALGORITHM", "A step-by-step procedure for calculations"),
      ("API", "Application Programming Interface"),
      ("ARRAY", "A collection of elements identified by index"),
      ("BACKEND", "The server-side part of an application"),
    ]

    grid = [[' ' for _ in range(size)] for _ in range(size)]
    used_words = []
    clues = {"across": [], "down": []}
    
    for i, (word, clue) in enumerate(random.sample(word_list, min(len(word_list), size * 2))):
        direction = "across" if i % 2 == 0 else "down"
        placed = False
        attempts = 0
        while not placed and attempts < 100:
            row = random.randint(0, size - 1)
            col = random.randint(0, size - 1)
            if direction == "across" and col + len(word) <= size:
                if all(grid[row][col+j] in (' ', word[j]) for j in range(len(word))):
                    for j in range(len(word)):
                        grid[row][col+j] = word[j]
                    placed = True
            elif direction == "down" and row + len(word) <= size:
                if all(grid[row+j][col] in (' ', word[j]) for j in range(len(word))):
                    for j in range(len(word)):
                        grid[row+j][col] = word[j]
                    placed = True
            attempts += 1
        
        if placed:
            used_words.append(word)
            clues[direction].append({"number": len(used_words), "clue": clue, "answer": word})
    
    # Fill empty spaces with random letters
    for row in range(size):
        for col in range(size):
            if grid[row][col] == ' ':
                grid[row][col] = random.choice(string.ascii_uppercase)
    
    return  {
        "title": "Crossword Puzzle: Software Engineering Edition",
        "grid": grid,
        "clues": clues
    }    


def create_puzzle_pdf(puzzle, puzzle_data):
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # Add title
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(width / 2, height - inch, puzzle_data["title"])
    c.setTitle(puzzle_data["title"])
  
    # Draw grid
    grid_size = len(puzzle_data["grid"])
    cell_size = 20
    total_grid_size = grid_size * cell_size
    c.setFont("Helvetica", 12)
    start_x = (width - total_grid_size) / 2
    start_y = height - ((height - total_grid_size) / 2)

    for row in range(grid_size):
        for col in range(grid_size):
            x = start_x + col * cell_size
            y = start_y - row * cell_size
            c.rect(x, y, cell_size, cell_size)
            c.drawString(x + 5, y + 5, puzzle_data["grid"][row][col])

    c.save()

    pdf_file = ContentFile(buffer.getvalue(), 'puzzle-{}.pdf'.format(puzzle.id))
    buffer.close()
    return pdf_file

def create_clue_pdf(clue, puzzle_data, puzzle_id):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter,
                            leftMargin=inch, rightMargin=inch,
                            topMargin=inch, bottomMargin=inch)

    story = []
    styles = getSampleStyleSheet()

    # Add title
    story.append(Paragraph(f"{puzzle_data['title']} - Clues", styles['Title']))
    story.append(Spacer(1, 0.25*inch))

    # Add clues
    for direction in ["Across", "Down"]:
        story.append(Paragraph(f"<b>{direction}:</b>", styles['Heading2']))
        for i, clue in enumerate(puzzle_data["clues"][direction.lower()], 1):
            clue_text = f"{i}. {clue['clue']} ({clue['answer']})"
            story.append(Paragraph(clue_text, styles['Normal']))
        story.append(Spacer(1, 0.25*inch))

    def set_pdf_title(canvas, doc):
        canvas.setTitle(f"{puzzle_data['title']} - Clues")

    doc.build(story, onFirstPage=set_pdf_title, onLaterPages=set_pdf_title)
    
    pdf_file = ContentFile(buffer.getvalue(), 'clue-{}.pdf'.format(puzzle_id))
    buffer.close()
    return pdf_file
