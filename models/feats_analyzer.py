import base64
import io
import json
import re
from PIL import Image
import groq
import os

def image_to_base64(image: Image.Image) -> str:
    """Convert PIL Image to a base64 string."""
    # Convert to RGB mode if needed
    if image.mode != 'RGB':
        image = image.convert('RGB')
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue()).decode()

class FEATSAnalyzer:
    def __init__(self):
        # Initialize Groq client
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.client = groq.Groq(api_key=self.groq_api_key)
        
    def analyze(self, image: Image.Image) -> dict:
        """Analyze the image using all 14 FEATS criteria through Llama on Groq."""
        try:
            # For debugging
            print("Starting analysis...")
            # Construct prompt for Llama
            prompt = self._construct_prompt()
            
            # For debugging
            print("\nSending completion request to Groq...")
            
            # Get analysis from Llama through Groq
            completion = self.client.chat.completions.create(
                model="llama-3.2-90b-vision-preview",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": "data:image/jpeg;base64," + image_to_base64(image)
                                }
                            },
                            {
                                "type": "text",
                                "text": prompt
                            }
                        ]
                    }
                ]
            )
            
            # Get raw response
            raw_response = completion.choices[0].message.content
            
            # For debugging
            print("\nRaw response from model:")
            print(raw_response)
            print("\nParsing response...")
            
            # Parse response into FEATS scores
            return self._parse_response(raw_response)
        except Exception as e:
            raise Exception(f"FEATS analysis failed: {str(e)}")
            
    def _construct_prompt(self) -> str:
        """Construct the prompt for Llama by reading from an external file."""
        # Read the entire prompt from a separate file
        try:
            # Get the directory of the current file (feats_analyzer.py)
            current_dir = os.path.dirname(os.path.abspath(__file__))
            # Build the path to feats_prompt.txt
            prompt_path = os.path.join(current_dir, 'feats_prompt.txt')
            # For debugging
            print(f"Looking for feats_prompt.txt at: {prompt_path}")
            with open(prompt_path, 'r', encoding='utf-8') as f:
                prompt = f.read()
            return prompt
        except FileNotFoundError:
            raise Exception(f"The file 'feats_prompt.txt' was not found at {prompt_path}.")

    def _parse_response(self, response: str) -> dict:
        """Parse the model's response into FEATS scores and explanations."""
        try:
            # Use regex to find the JSON block between ```json and ```
            json_match = re.search(r'```json(.*?)```', response, re.DOTALL)
            if json_match:
                json_str = json_match.group(1).strip()
            else:
                # Fallback: Try to find the JSON object directly
                json_match = re.search(r'\{.*\}', response, re.DOTALL)
                if json_match:
                    json_str = json_match.group(0).strip()
                else:
                    print("No JSON object found in the response.")
                    raise Exception("No JSON object found in the response.")

            # Clean up the JSON string
            json_str = json_str.replace("'", '"')  # Replace single quotes with double quotes
            json_str = re.sub(r'\\n', '', json_str)  # Remove escaped newlines
            json_str = re.sub(r'\s+', ' ', json_str)  # Replace multiple whitespace with single space

            # Attempt to parse the JSON
            try:
                data = json.loads(json_str)
                return self._process_parsed_data(data)
            except json.JSONDecodeError as e:
                print(f"JSON parsing error: {e}")
                print(f"JSON string to debug: {json_str}")
                raise Exception(f"Failed to parse JSON: {e}")
        except Exception as e:
            print(f"Error while parsing: {e}")
            raise Exception(f"Failed to parse FEATS response: {e}")
    
    def _process_parsed_data(self, data: dict) -> dict:
        """Process the parsed JSON data for all 14 FEATS criteria."""
        criterion_mapping = {
            'Prominence of Color': 'prominence_of_color',
            'Color Fit': 'color_fit',
            'Implied Energy': 'implied_energy',
            'Space': 'space',
            'Integration': 'integration',
            'Logic': 'logic',
            'Realism': 'realism',
            'Problem-Solving': 'problem_solving',
            'Problem Solving': 'problem_solving',  # Handle slight variations
            'Developmental Level': 'developmental_level',
            'Details of Objects and Environment': 'details_of_objects_and_environment',
            'Line Quality': 'line_quality',
            'Person': 'person',
            'Rotation': 'rotation',
            'Perseveration': 'perseveration'
        }

        scores = {}
        explanations = {}

        for criterion_raw, content in data.items():
            # Normalize criterion name
            criterion = criterion_mapping.get(
                criterion_raw.strip(),
                criterion_raw.strip().lower().replace(' ', '_')
            )
            score = content.get('Score')
            explanation = content.get('Explanation')
            if score is not None and explanation is not None:
                try:
                    scores[criterion] = float(score)
                    explanations[criterion] = explanation.strip()
                except ValueError:
                    print(f"Invalid score value for {criterion_raw}: {score}")
            else:
                print(f"Missing score or explanation for {criterion_raw}")

        print("\nExtracted Scores:", scores)
        print("\nExtracted Explanations:", explanations)

        return {
            "scores": scores,
            "explanations": explanations
        }
