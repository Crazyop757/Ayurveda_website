from django.db import models


# Create your models here.

class Remedy(models.Model):
    disease = models.CharField(max_length=255)
    remedy = models.TextField()
    preparation = models.TextField()
    usage = models.TextField()
    image = models.ImageField(upload_to='remedy_images/', null=True, blank=True)  # New image field

    def __str__(self):
        return self.disease
