import sys
import os
import json  # Import the json module
import re    # Import the re module if needed
from PIL import Image
from dotenv import load_dotenv

# Add the project root to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.feats_analyzer import FEATSAnalyzer

def test_feats():
    # Load environment variables from .env.local
    load_dotenv('.env.local')
    
    # Initialize analyzer
    analyzer = FEATSAnalyzer()
    
    # Load test image
    image_path = "public/samples/100082_F.png"  # Replace with your image path
    image = Image.open(image_path)
    
    # Run analysis
    try:
        results = analyzer.analyze(image)
        print("\nFEATS Analysis Results:")
        for key in results['scores']:
            print(f"\n{key.upper()}:")
            print(f"Score: {results['scores'][key]:.2f}")
            print(f"Explanation: {results['explanations'][key]}")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    test_feats()
