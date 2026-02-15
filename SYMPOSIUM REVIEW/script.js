let rating = 0;

const stars = document.querySelectorAll("#stars span");

stars.forEach((star, index) => {
    star.addEventListener("click", () => {

        rating = index + 1;

        stars.forEach(s => {
            s.classList.remove("active");
            s.classList.remove("clicked");
        });

        for (let i = 0; i < rating; i++) {
            stars[i].classList.add("active");

            // Bounce animation
            stars[i].classList.add("clicked");

            setTimeout(() => {
                stars[i].classList.remove("clicked");
            }, 300);
        }
    });
});



function submitReview() {

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (!name || rating === 0) {
        alert("Please fill details and rating");
        return;
    }

    const review = {
        name,
        rating,
        message
    };

    // Save locally
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    // Show popup
    document.getElementById("popup").style.display = "block";

    // After 3 seconds → add review + reset form
    setTimeout(() => {

        document.getElementById("popup").style.display = "none";

        displayReviews();

        document.getElementById("name").value = "";
        document.getElementById("message").value = "";

        rating = 0;
        stars.forEach(s => s.classList.remove("active"));

    }, 3000);
}


function displayReviews() {

    const reviewsList = document.getElementById("reviewsList");
    reviewsList.innerHTML = "";

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.slice().reverse().forEach(r => {

        const div = document.createElement("div");
        div.className = "review-card";

        div.innerHTML = `
            <strong>${r.name}</strong>
            <div class="review-stars">${"★".repeat(r.rating)}</div>
            <p>${r.message}</p>
        `;

        reviewsList.appendChild(div);
    });
}


// Load reviews on start
displayReviews();
