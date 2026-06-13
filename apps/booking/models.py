from django.db import models
from apps.schedule.models import TimeSlot

class Reservation(models.Model):
    slot = models.OneToOneField(TimeSlot, on_delete=models.CASCADE, related_name='reservation')
    
    client_name = models.CharField(max_length=200)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=20)
    
    message = models.TextField(blank=True, default='')
    
    confirmed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Reservation for {self.client_name} on {self.slot.start_time}"
