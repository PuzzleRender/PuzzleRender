# !/usr/bin/env python3
"""
This Python script connects to the
remote MySQL 'puzzlerender' database
on the remote server, and creates
several tables.
The script utilizes SQLAlchemy.
"""


# Import statements
from datetime import datetime
from dotenv import load_dotenv
import os
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Load the environmental
# variables from the .env file
load_dotenv()

# An instance of the delarative_base class
Base = declarative_base()


# The User Class
class User(Base):
    """
    A class that creates a User
    table in the remote database

    Attributes:
        table name: 'users'
        first_name: User's first name
        last_name: User's last name
        username: User's username
        email: User's email address
        password: User's password
        id: User's unique id, primary key
        created_at: User's creation date
        updated_at: User's updated details
    """
    __tablename__ = 'users'  # The table name in the remote database
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    username = Column(String(50), nullable=False, primary_key=True, unique=True)
    email = Column(String(50), nullable=False, unique=True)
    password = Column(String(50), nullable=False)
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# The Puzzle class
class Puzzle(Base):
    """
    A class that creates a Puzzle table
    in the remote database

    Attributes:
        table name: 'puzzle'
        id: Puzzle's id, primary key
        username: Foreign key, gotten from user's username
        pdf_size: Size of the pdf
        file_path: File to PDF
        created_at: puzzle creation date
    """
    __tablename__ = "puzzle"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), ForeignKey('users.username'), nullable=False)
    pdf_size = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    file_path = Column(String(50), nullable=False)


# The Puzzle class
class Clues(Base):
    """
    A class that creates a Clues table
    in the remote database

    Attributes:
        table name: 'clues'
        id: Puzzle's id, primary key
        puzzle_id: Foreign key, gotten from puzzle's id
        pdf_size: Size of pdf
        file_path: File to PDF
        created_at: puzzle creation date
    """
    __tablename__ = "clues"
    id = Column(Integer, primary_key=True, autoincrement=True)
    puzzle_id = Column(Integer, ForeignKey('puzzle.id'), nullable=False)
    pdf_size = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    file_path = Column(String(50), nullable=False)


# Create an engine with the database URL
db_url = os.getenv['SQLALCHEMY_DATABASE_URI']
engine = create_engine(db_url, echo=True)
#
# Creating the tables
Base.metadata.create_all(engine)
#
# Session = sessionmaker(bind=engine)
# session = Session()
# new_user
# session.add()
# session.commit()
# session.close()
