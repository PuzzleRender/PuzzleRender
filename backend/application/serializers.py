from rest_framework import serializers
from .models import Puzzle

class PuzzleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puzzle
        fields = '__all__'  # Or specify the fields you want to include
