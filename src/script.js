document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("coverflow-track");

    if (!track) return;

    const items = document.querySelectorAll(".coverflow-item");

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    let currentIndex = 2;

    function updateCoverflow() {

        items.forEach((item, index) => {

            const distance = index - currentIndex;

            const absDistance = Math.abs(distance);

            let x = distance * 180;
            let z = -absDistance * 200;
            let rotateY = 0;
            let scale = 1 - (absDistance * 0.15);
            let opacity = 1;

            if (distance < 0) {
                rotateY = 35;
            }

            if (distance > 0) {
                rotateY = -35;
            }

            if (distance === 0) {
                z = 150;
                scale = 1;
            }

            if (absDistance > 2) {
                opacity = 0;
            }

            item.style.transform =
                `translateX(${x}px)
                 translateZ(${z}px)
                 rotateY(${rotateY}deg)
                 scale(${scale})`;

            item.style.opacity = opacity;

            item.style.zIndex = 100 - absDistance;
        });
    }

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCoverflow();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCoverflow();
    });

    updateCoverflow();

});