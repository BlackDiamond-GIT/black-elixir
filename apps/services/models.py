from django.db import models

class MassageType(models.Model):
    slug = models.SlugField(unique=True, max_length=100)
    name_cs = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100)
    name_ru = models.CharField(max_length=100)
    
    description_cs = models.TextField()
    description_en = models.TextField()
    description_ru = models.TextField()
    
    duration_minutes = models.IntegerField()
    base_price = models.IntegerField()
    
    meta_title = models.CharField(max_length=60, default='')
    meta_description = models.CharField(max_length=160, default='')

    image = models.ImageField(upload_to='services/', blank=True)
    image_alt = models.CharField(max_length=200, default='', blank=True)

    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Massage Types'
    
    def __str__(self):
        return self.name_cs
