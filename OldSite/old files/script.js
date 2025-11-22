document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slides');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;

    nextBtn.addEventListener('click', function () {
        if (currentIndex < slider.children.length - 1) {
            currentIndex++;
        }
        
            curren
updateSlider();
    });

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
        }
        updateSlider();
    });

    
    });

    
function updateSlider() {
        const translateValue = -currentIndex * (100 / 3) + '%'; // Adjust based on the number of images
        slider.style.transform = 'translateX(' + translateValue + ')';
    }
});