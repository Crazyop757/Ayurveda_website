import pandas as pd
from django.core.management.base import BaseCommand
from search_result.models import Remedy
from django.core.files import File
import requests
from io import BytesIO

class Command(BaseCommand):
    help = 'Import data from CSV into Remedy model'

    def handle(self, *args, **kwargs):
        # Correct file path with raw string or double backslashes
        file_path = r'C:\\Users\\Rudra Kushwah\\Desktop\\Ayurveda_Main\\blueberry\\data\\remedy_data.csv'
        
        # Try to load the CSV file with a different encoding
        try:
            df = pd.read_csv(file_path, encoding='ISO-8859-1')  # or 'latin1'
        except UnicodeDecodeError:
            self.stdout.write(self.style.ERROR("Failed to read the file with 'ISO-8859-1' encoding"))
            return

        # Loop through each row in the DataFrame and create Remedy objects
        for _, row in df.iterrows():
            disease = row['disease']
            remedy = row['remedy']
            preparation = row['preparation']
            usage = row['usage']

            # Optionally, fetch the image using an API or URL
            # image_url = 'URL_to_fetch_image_based_on_disease'  # Replace this with actual logic
            # response = requests.get(image_url)
            # image = File(BytesIO(response.content), name=f'{disease}_image.jpg')

            # Create and save the Remedy object
            Remedy.objects.create(
                disease=disease,
                remedy=remedy,
                preparation=preparation,
                usage=usage
                # image=image
            )

        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
