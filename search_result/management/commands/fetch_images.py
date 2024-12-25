import requests
from django.core.management.base import BaseCommand
from django.core.files import File
from io import BytesIO
from search_result.models import Remedy  # Make sure this matches your actual model

class Command(BaseCommand):
    help = 'Fetch and save images for remedies'

    def handle(self, *args, **kwargs):
        # Replace with your image fetching API URL
        api_url = "https://pixabay.com/api/"
        api_key = "47755317-0f5fa4971559b89b45700afe1"  # Replace with your actual API key

        # Loop through each remedy and fetch the image
        for remedy in Remedy.objects.all():
            remedy_name = remedy.remedy  # Use remedy name for image search
            params = {
                'query': remedy_name,
                'client_id': api_key,
                'per_page': 1  # Number of images you want to fetch
            }

            # Send the API request
            response = requests.get(api_url, params=params)
            
            if response.status_code == 200:
                data = response.json()
                if data['results']:
                    # Get the image URL from the API response
                    image_url = data['results'][0]['urls']['regular']
                    
                    # Fetch the image content
                    image_response = requests.get(image_url)
                    
                    # Check if the image was fetched successfully
                    if image_response.status_code == 200:
                        # Save the image to the Remedy model's image field
                        image_file = File(BytesIO(image_response.content), name=f"{remedy_name}.jpg")
                        remedy.image.save(f"{remedy_name}.jpg", image_file)

                        self.stdout.write(self.style.SUCCESS(f"Image saved for remedy: {remedy_name}"))
                    else:
                        self.stdout.write(self.style.ERROR(f"Failed to download image for remedy: {remedy_name}"))
                else:
                    self.stdout.write(self.style.WARNING(f"No image found for remedy: {remedy_name}"))
            else:
                self.stdout.write(self.style.ERROR(f"API request failed for remedy: {remedy_name}"))
