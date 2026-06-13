/* HTMX Booking Flow */

document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('booking-form');
  const bookingContent = document.getElementById('booking-content');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
    });
  }
  
  const optCards = document.querySelectorAll('.opt-card');
  optCards.forEach(card => {
    card.addEventListener('click', function() {
      optCards.forEach(c => c.classList.remove('sel'));
      this.classList.add('sel');
    });
  });
  
  const timeButtons = document.querySelectorAll('.time-btn:not(.booked)');
  timeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      timeButtons.forEach(b => b.classList.remove('sel'));
      this.classList.add('sel');
    });
  });
  
  const htmxIndicator = document.querySelector('.htmx-indicator');
  if (htmxIndicator) {
    document.addEventListener('htmx:xhr:loadstart', () => {
      htmxIndicator?.classList.add('show');
    });
    
    document.addEventListener('htmx:xhr:loadend', () => {
      htmxIndicator?.classList.remove('show');
    });
  }
  
  document.addEventListener('htmx:afterSwap', function(evt) {
    const newCards = evt.detail.target.querySelectorAll('.opt-card');
    newCards.forEach(card => {
      card.addEventListener('click', function() {
        newCards.forEach(c => c.classList.remove('sel'));
        this.classList.add('sel');
      });
    });
    
    const newTimeButtons = evt.detail.target.querySelectorAll('.time-btn:not(.booked)');
    newTimeButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        newTimeButtons.forEach(b => b.classList.remove('sel'));
        this.classList.add('sel');
      });
    });
  });
});
