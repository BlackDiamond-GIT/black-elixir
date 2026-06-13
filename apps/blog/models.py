from django.db import models

class Post(models.Model):
    slug = models.SlugField(unique=True, max_length=100)
    
    title_cs = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200)
    title_ru = models.CharField(max_length=200)
    
    excerpt_cs = models.CharField(max_length=500, default='')
    excerpt_en = models.CharField(max_length=500, default='')
    excerpt_ru = models.CharField(max_length=500, default='')
    
    content_cs = models.TextField()
    content_en = models.TextField()
    content_ru = models.TextField()
    
    image = models.ImageField(upload_to='blog/', blank=True)
    image_alt = models.CharField(max_length=200, default='')
    
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    is_published = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-published_at']
    
    def __str__(self):
        return self.title_cs
