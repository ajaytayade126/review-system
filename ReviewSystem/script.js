const STORAGE_KEY = "reviews";

const usernameInput = document.getElementById("username");
const ratingSelect = document.getElementById("rating");
const commentInput = document.getElementById("comment");
const submitBtn = document.getElementById("submitBtn");
const messageBox = document.getElementById("messageBox");
const reviewsContainer = document.getElementById("reviewsContainer");
const noReviewsText = document.getElementById("noReviewsText");

// Load previous reviews
document.addEventListener("DOMContentLoaded", renderReviews);

// Submit
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  messageBox.textContent = "";
  messageBox.className = "message";

  const username = usernameInput.value.trim();
  const rating = ratingSelect.value;
  const comment = commentInput.value.trim();

  if (!username || !rating || !comment) {
    messageBox.textContent = "Please fill all required fields.";
    messageBox.style.color = "red";
    return;
  }

  const review = {
    username,
    rating: Number(rating),
    comment,
    time: new Date().toLocaleString(),
  };

  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  existing.unshift(review);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

  usernameInput.value = "";
  ratingSelect.value = "";
  commentInput.value = "";

  messageBox.textContent = "Review submitted!";
  messageBox.style.color = "green";

  renderReviews();
});

// Render reviews
function renderReviews() {
  const reviews = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  reviewsContainer.innerHTML = "";

  if (reviews.length === 0) {
    noReviewsText.style.display = "block";
    return;
  }

  noReviewsText.style.display = "none";

  reviews.forEach((review) => {
    const card = document.createElement("div");
    card.className = "review-card";

    const header = document.createElement("div");
    header.className = "review-header";

    const usernameEl = document.createElement("span");
    usernameEl.className = "review-username";
    usernameEl.textContent = review.username;

    const timeEl = document.createElement("span");
    timeEl.className = "review-time";
    timeEl.textContent = review.time;

    header.appendChild(usernameEl);
    header.appendChild(timeEl);

    const ratingEl = document.createElement("div");
    ratingEl.className = "review-rating";
    ratingEl.textContent =
      "Rating: " + "★".repeat(review.rating) + " (" + review.rating + "/5)";

    const commentEl = document.createElement("div");
    commentEl.className = "review-comment";
    commentEl.textContent = review.comment;

    card.appendChild(header);
    card.appendChild(ratingEl);
    card.appendChild(commentEl);

    reviewsContainer.appendChild(card);
  });
}
