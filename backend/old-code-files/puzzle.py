from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet
import random
import string
import os
import requests

# word_list = [
#     ("ALGORITHM", "A step-by-step procedure for calculations"),
#     ("API", "Application Programming Interface"),
#     ("ARRAY", "A collection of elements identified by index"),
#     ("BACKEND", "The server-side part of an application"),
#     ("BUG", "An error or flaw in software"),
#     ("CLASS", "A blueprint for creating objects in OOP"),
#     ("DEBUG", "The process of identifying and fixing bugs"),
#     ("ENCAPSULATION", "The bundling of data with methods"),
#     ("FRAMEWORK", "A structured foundation for building applications"),
#     ("FUNCTION", "A reusable block of code that performs a specific task"),
#     ("GENERIC", "A type parameter that allows for flexible code"),
#     ("GIT", "A version control system"),
#     ("IDE", "Integrated Development Environment"),
#     ("INHERITANCE", "The mechanism of acquiring properties from a parent class"),
#     ("INTERFACE", "A contract for classes to implement methods"),
#     ("JAVASCRIPT", "A high-level, dynamic programming language"),
#     ("JSON", "JavaScript Object Notation, a lightweight data interchange format"),
#     ("LIBRARY", "A collection of pre-written code to be used in programs"),
#     ("MACHINELEARNING", "A branch of AI focused on training models from data"),
#     ("METHOD", "A function defined within a class"),
#     ("MVC", "Model-View-Controller, a design pattern for separating concerns"),
#     ("NODEJS", "A JavaScript runtime built on Chrome's V8 engine"),
#     ("OBJECT", "An instance of a class in OOP"),
#     ("ORACLE", "A database management system"),
#     ("POLYMORPHISM", "The ability to process objects differently based on their data type"),
#     ("POSTGRESQL", "An open-source relational database management system"),
#     ("PROTOCOL", "A set of rules for data communication"),
#     ("QUERY", "A request for data from a database"),
#     ("RECURSION", "A function calling itself in its definition"),
#     ("REPOSITORY", "A storage location for code and related files"),
#     ("ROUTINE", "A set of instructions to perform a specific task"),
#     ("SCRIPT", "A program written for automation of tasks"),
#     ("SQL", "Structured Query Language, used for managing databases"),
#     ("SERVER", "A system that provides resources or services to other systems"),
#     ("SOFTWAREENGINEERING", "The application of engineering principles to software development"),
#     ("STRING", "A sequence of characters"),
#     ("SYNTAX", "The set of rules that defines the structure of code"),
#     ("TDD", "Test-Driven Development, writing tests before code"),
#     ("TOKEN", "A sequence of characters representing a unit of meaning in programming"),
#     ("UI", "User Interface, the means by which users interact with software"),
#     ("VARIABLE", "A storage location identified by a name"),
#     ("VERSIONCONTROL", "The management of changes to code over time"),
#     ("WEBSERVER", "A server that serves web pages to clients"),
#     ("XML", "Extensible Markup Language, a markup language for data representation"),
#     ("YARN", "A package manager for JavaScript"),
#     ("ZENOFPYTHON", "A collection of guiding principles for Python's design"),
#     ("ZOOM", "A tool for remote communication and collaboration"),
#     ("APIKEY", "A unique identifier used to authenticate API requests"),
#     ("BROWSER", "A software application for accessing web pages"),
#     ("CONTAINERIZATION", "The use of containers to package and run applications"),
#     ("DATASTRUCTURE", "A way of organizing and storing data"),
#     ("DEPLOYMENT", "The process of releasing an application for use"),
#     ("ENDPOINT", "A URL where a web service can be accessed"),
#     ("FRONTEND", "The client-side part of an application"),
# ]


word_list = []

def fetch_words_from_datamuse(topic, max_results=50):
    url = f"https://api.datamuse.com/words?ml={topic}&max={max_results}"
    response = requests.get(url)
    if response.status_code == 200:
        words = response.json()
        return [(word['word'].upper(), f"Related to {topic}") for word in words if len(word['word']) > 2]
    else:
        print(f"Error fetching words: {response.status_code}")
        return []

software_words = fetch_words_from_datamuse("Programming", 15)
agriculture_words = fetch_words_from_datamuse("agriculture")
word_list.extend(software_words)
# word_list.extend(agriculture_words);

def create_puzzle_pdfs(puzzle_data, directory_name):
    # Create directory
    os.makedirs(directory_name, exist_ok=True)

    # Create puzzle PDF
    create_puzzle_pdf(puzzle_data, os.path.join(directory_name, "puzzle.pdf"))

    # Create clues PDF
    create_clues_pdf(puzzle_data, os.path.join(directory_name, "clues.pdf"))

def generate_puzzle(size=5):
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
  
  return {
      "title": "Crossword Puzzle: Software Engineering Edition",
      "grid": grid,
      "clues": clues
  }


def create_puzzle_pdf(puzzle_data, filename):
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter

    # Add title
    c.setFont("Helvetica-Bold", 16)
    c.drawString(inch, height - inch, puzzle_data["title"])

    # Draw grid
    grid_size = len(puzzle_data["grid"])
    cell_size = 20
    c.setFont("Helvetica", 12)

    for row in range(grid_size):
        for col in range(grid_size):
            x = inch + col * cell_size
            y = height - 2*inch - row * cell_size
            c.rect(x, y, cell_size, cell_size)
            c.drawString(x + 5, y + 5, puzzle_data["grid"][row][col])

    c.save()

def create_clues_pdf(puzzle_data, filename):
    doc = SimpleDocTemplate(filename, pagesize=letter,
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

    doc.build(story)

# Example usage
puzzle_data = generate_puzzle(25)
# create_pdf(puzzle_data, "alx_project_update.pdf")
create_puzzle_pdfs(puzzle_data, "my_crossword")
