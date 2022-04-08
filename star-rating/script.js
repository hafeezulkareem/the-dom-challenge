/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(el, count, callback) {
   let rating = 0;

   const starsContainer = document.querySelector(el);
   for (let i = 0; i < count; i++) {
      const star = document.createElement("i");
      star.classList = "fa fa-star-o";
      star.addEventListener("mouseover", () => onHoverStar(i));
      star.addEventListener("click", () => {
         rating = i + 1;
         callback(rating);
      });
      starsContainer.appendChild(star);
   }
   starsContainer.addEventListener("mouseleave", () => clearRating(rating));
}

function onHoverStar(index) {
   const stars = document.querySelectorAll(".fa");
   stars.forEach((star) => {
      if (star.classList.contains("fa-star")) {
         star.classList.remove("fa-star");
      }
      star.classList.add("fa-star-o");
   });

   for (let i = 0; i <= index; i++) {
      stars[i].classList.remove("fa-star-o");
      stars[i].classList.add("fa-star");
   }
}

function clearRating(rating) {
   const stars = document.querySelectorAll(".fa");
   let i = 0;
   while (i < rating) {
      if (stars[i].classList.contains("fa-star-o")) {
         stars[i].classList.remove("fa-star-o");
      }
      stars[i].classList.add("fa-star");
      i += 1;
   }
   while (i < stars.length) {
      if (stars[i].classList.contains("fa-star")) {
         stars[i].classList.remove("fa-star");
      }
      stars[i].classList.add("fa-star-o");
      i += 1;
   }
}
