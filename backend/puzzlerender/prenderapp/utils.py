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
    ("BUG", "An error or flaw in software"),
    ("CACHE", "A storage layer that improves data retrieval speed"),
    ("CLASS", "A blueprint for creating objects in object-oriented programming"),
    ("CONCURRENT", "Simultaneous execution of multiple processes or threads"),
    ("DEBUGGING", "The process of finding and fixing bugs in software"),
    ("DEPLOYMENT", "The process of making a software application available for use"),
    ("ENCAPSULATION", "The bundling of data with methods that operate on that data"),
    ("ENGINEERING", "The application of scientific principles to design and build software"),
    ("FRONTEND", "The client-side part of an application, usually involving user interfaces"),
    ("FUNCTION", "A block of code designed to perform a specific task"),
    ("GIT", "A version control system for tracking changes in source code"),
    ("IDE", "Integrated Development Environment, a software suite for coding"),
    ("INHERITANCE", "A mechanism in object-oriented programming where a new class is derived from an existing class"),
    ("JIRA", "A tool for project management and issue tracking"),
    ("LIBRARY", "A collection of pre-written code that can be used by software developers"),
    ("MICROSERVICES", "An architectural style that structures an application as a collection of small, loosely coupled services"),
    ("NAMESPACE", "A container that holds a set of identifiers and allows them to be uniquely named"),
    ("OBJECT", "An instance of a class in object-oriented programming"),
    ("ORM", "Object-Relational Mapping, a technique for interacting with databases using objects"),
    ("PARALLELISM", "The simultaneous execution of multiple tasks to improve performance"),
    ("PROXY", "A server that acts as an intermediary for requests from clients seeking resources from other servers"),
    ("REFACTORING", "The process of restructuring existing code without changing its external behavior"),
    ("REPOSITORY", "A storage location for software packages or source code"),
    ("REST", "Representational State Transfer, an architectural style for designing networked applications"),
    ("SCALABILITY", "The capability of a system to handle a growing amount of work or its potential to accommodate growth"),
    ("SECURITY", "The practice of protecting systems and data from unauthorized access or attacks"),
    ("SERVER", "A machine or program that provides services or resources to other machines or programs"),
    ("SYNCHRONIZATION", "The coordination of processes or threads to ensure they operate in a controlled manner"),
    ("VERSIONCONTROL", "A system that manages changes to source code over time"),
    ("WEBSOCKET", "A protocol providing full-duplex communication channels over a single TCP connection"),
    ("AGILE", "A set of principles for software development under which requirements and solutions evolve through the collaborative effort of cross-functional teams"),
    ("BOOTSTRAP", "A framework for developing responsive and mobile-first websites"),
    ("CICD", "Continuous Integration and Continuous Deployment, practices for frequently delivering apps to customers by automating testing and deployment"),
    ("DATASTRUCTURE", "A specialized format for organizing and storing data"),
    ("EVENTDRIVEN", "A programming paradigm where the flow of the program is determined by events"),
    ("GITFLOW", "A branching model for Git that helps manage features, fixes, and releases"),
    ("HYPERTEXT", "Text displayed on a computer display with references to other text that the user can access"),
    ("INTEGRATION", "The process of combining different systems or components to work together as a unified whole"),
    ("JAVASCRIPT", "A high-level programming language commonly used in web development"),
    ("KUBERNETES", "An open-source platform for automating containerized application deployment, scaling, and management"),
    ("LOADBALANCER", "A device or software that distributes network or application traffic across multiple servers"),
    ("MACHINELEARNING", "A field of artificial intelligence that uses algorithms to enable computers to learn from and make predictions based on data"),
    ("NOSQL", "A category of database management systems that are not based on the traditional relational model"),
    ("OBJECTIVEC", "A general-purpose, object-oriented programming language used primarily for macOS and iOS development"),
    ("QUEUE", "A data structure that stores a collection of elements in a sequence, supporting operations such as enqueue and dequeue"),
    ("REACT", "A JavaScript library for building user interfaces, particularly single-page applications"),
    ("SOFTWAREARCHITECTURE", "The high-level structure of a software system, defining its components and their interactions"),
    ("TESTDRIVENDEVELOPMENT", "A software development process where tests are written before the code that is to be tested"),
    ("UIUX", "User Interface and User Experience, focusing on the design and usability of software applications"),
    ("VIRTUALIZATION", "The creation of virtual versions of physical resources, such as servers or storage devices"),
    ("WEBAPI", "A set of HTTP request messages, along with a definition of the structure of response messages, typically used to enable interactions between software systems"),
    ("XML", "Extensible Markup Language, a markup language used to encode documents in a format that is both human-readable and machine-readable"),
    ("YAML", "YAML Ain't Markup Language, a human-readable data serialization standard often used for configuration files"),
    ("ZENOFPYTHON", "A collection of guiding principles for writing computer programs in the Python language"),
    ("ACID", "A set of properties (Atomicity, Consistency, Isolation, Durability) that guarantee database transactions are processed reliably"),
    ("BLOB", "Binary Large Object, a collection of binary data stored as a single entity in a database"),
    ("CONTAINERIZATION", "The practice of packaging applications and their dependencies together into containers for consistency across different environments"),
    ("DATAMINING", "The process of discovering patterns and knowledge from large amounts of data"),
    ("ELASTICITY", "The ability of a system to dynamically adjust its resources based on demand"),
    ("FORK", "A copy of a repository that allows you to freely experiment with changes without affecting the original project"),
    ("GRAPHQL", "A query language for APIs and a server-side runtime for executing those queries by providing a complete and understandable description of the data in your API"),
    ("HATEOAS", "Hypermedia As The Engine Of Application State, a constraint of REST application architecture that allows the interaction with RESTful web services entirely through hypermedia provided dynamically by application servers"),
    ("ISOLATION", "A database property ensuring that transactions are securely and independently processed without interference"),
    ("JDBC", "Java Database Connectivity, an API for connecting Java applications to databases"),
    ("KERNEL", "The core part of an operating system that manages system resources and communication between hardware and software"),
    ("LOGGING", "The process of recording events or messages generated by an application or system"),
    ("MIDDLEWARE", "Software that connects different applications or services and provides a common interface"),
    ("NAT", "Network Address Translation, a method for modifying network address information in packet headers while in transit across a traffic routing device"),
    ("OAUTH", "An open standard for access delegation commonly used for token-based authentication"),
    ("PERSISTENCE", "The characteristic of state that outlives the process that created it, commonly achieved through database storage"),
    ("QOS", "Quality of Service, a measure of the overall performance of a network or service"),
    ("REDIS", "An in-memory data structure store used as a database, cache, and message broker"),
    ("SCHEMA", "The structure of a database system described in a formal language"),
    ("TDD", "Test-Driven Development, a software development methodology where tests are written before the code is implemented"),
    ("UNITTESTING", "A software testing method where individual units or components of a software are tested in isolation"),
    ("VERSIONING", "The process of assigning unique version numbers to software releases"),
    ("WEBSERVER", "A server that handles HTTP requests and responses to serve web content"),
    ("XMLRPC", "A remote procedure call protocol that uses XML to encode its calls and HTTP as a transport mechanism"),
    ("YARN", "Yet Another Resource Negotiator, a cluster management technology used in Hadoop"),
    ("ZIP", "A file format used for data compression and archiving"),
    ("ABSTRACTION", "The concept of hiding complex implementation details and showing only the necessary features of an object"),
    ("BASIC", "Beginner's All-purpose Symbolic Instruction Code, an early programming language"),
    ("CACHING", "The practice of storing frequently accessed data in a temporary storage area to reduce access time"),
    ("DATAENCRYPTION", "The process of converting data into a coded format to prevent unauthorized access"),
    ("ETHICALHACKING", "The practice of intentionally probing systems for vulnerabilities to improve security"),
    ("FIRMWARE", "Specialized software that is embedded into hardware devices to control their functionality"),
    ("GEOLOCATION", "The process of identifying the physical location of a device or user"),
    ("HEURISTICS", "Rules or methods used to make decisions or solve problems based on practical approaches rather than optimal solutions"),
    ("INTERFACE", "A shared boundary or interaction point between different software systems or components"),
    ("JAVA", "A high-level, class-based, object-oriented programming language used for building platform-independent applications"),
    ("KERNELPANIC", "An unrecoverable error in the operating system kernel that causes the system to stop functioning"),
    ("LOADTESTING", "A type of performance testing that simulates heavy loads on a system to assess its behavior under stress"),
    ("MULTITHREADING", "A technique where multiple threads are executed concurrently within a single process"),
    ("NULLPOINTEREXCEPTION", "An error that occurs when an application attempts to use an object reference that has not been initialized"),
    ("OBJECTORIENTEDPROGRAMMING", "A programming paradigm based on the concept of objects containing data and methods"),
    ("PYTHON", "A high-level programming language known for its readability and versatility"),
    ("QUEUEINGTHEORY", "The study of waiting lines or queues and the optimization of their performance"),
    ("RESTFULAPI", "An API that follows the principles of REST, allowing interactions with web services using standard HTTP methods"),
    ("SQL", "Structured Query Language, used for managing and querying relational databases"),
    ("TOKENIZATION", "The process of converting sensitive data into non-sensitive tokens for security purposes"),
    ("UDP", "User Datagram Protocol, a connectionless communication protocol used in networking"),
    ("VERSIONCONTROLSYSTEM", "A system that tracks changes to files and allows for collaboration among developers"),
    ("WHITELIST", "A list of approved entities that are permitted access to a system or network"),
    ("XSS", "Cross-Site Scripting, a security vulnerability that allows attackers to inject malicious scripts into webpages"),
    ("YAML", "A human-readable data serialization format used for configuration files"),
    ("ZERODOWNTIMEDEPLOYMENT", "A deployment method that allows updates to be made to a system without affecting its availability"),
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
