from django.db import models
from apps.masseurs.models import Masseuse
from apps.services.models import MassageType

class TimeSlot(models.Model):
    masseuse = models.ForeignKey(Masseuse, on_delete=models.CASCADE, related_name='slots')
    service = models.ForeignKey(MassageType, on_delete=models.CASCADE)
    
    start_time = models.DateTimeField(db_index=True)
    is_booked = models.BooleanField(default=False, db_index=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['start_time']
        unique_together = ['masseuse', 'start_time', 'service']
    
    def __str__(self):
        return f"{self.masseuse.name} - {self.start_time.strftime('%Y-%m-%d %H:%M')}"
