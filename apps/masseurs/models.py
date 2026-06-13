from django.db import models
from apps.services.models import MassageType

class Masseuse(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=100)
    
    bio_cs = models.TextField()
    bio_en = models.TextField()
    bio_ru = models.TextField()
    
    spec_cs = models.CharField(max_length=200)
    spec_en = models.CharField(max_length=200)
    spec_ru = models.CharField(max_length=200)
    
    photo = models.ImageField(upload_to='masseuses/', blank=True)
    photo_alt = models.CharField(max_length=200)
    
    meta_title = models.CharField(max_length=60, default='')
    meta_description = models.CharField(max_length=160, default='')
    
    services = models.ManyToManyField(MassageType)
    exp_years = models.IntegerField(default=0)
    
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name
