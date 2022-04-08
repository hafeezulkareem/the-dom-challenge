/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(el, count, callback) {
   let activeStarsCount = -1;
   const starsContainer = document.querySelector(el);
   const stars = document.createDocumentFragment();
   for (let i = 0; i < count; i++) {
      const star = document.createElement("i");
      star.classList = "fa fa-star-o";
      star.dataset.rating = i + 1;
      stars.appendChild(star);
      star.addEventListener("mouseover", onMouseover);
      star.addEventListener("click", onClick);
   }
   starsContainer.appendChild(stars);
   starsContainer.addEventListener("mouseleave", onMouseleave);

   function fillActiveStars(rating) {
      for (let i = 0; i < count; i++) {
         if (i < rating) {
            starsContainer.children[i].classList.add("fa-star");
         } else {
            starsContainer.children[i].classList.remove("fa-star");
         }
      }
   }

   function onMouseover(event) {
      const rating = event.target.dataset.rating;
      if (!rating) return;
      fillActiveStars(rating);
   }

   function onClick(event) {
      activeStarsCount = event.target.dataset.rating;
      fillActiveStars(activeStarsCount);
      callback(activeStarsCount);
   }

   function onMouseleave() {
      fillActiveStars(activeStarsCount);
   }
}
