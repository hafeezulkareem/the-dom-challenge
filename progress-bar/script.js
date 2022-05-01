function initLoader(seconds, loaderId, runButtonId) {
   const timePerPercentage = (seconds * 1000) / 100;
   const loader = document.querySelector(loaderId);
   const runButton = document.querySelector(runButtonId);

   const setLoader = (percentage) => {
      loader.style.width = `${percentage}%`;
   };

   const setClickCount = (count) => {
      if (count > 0) {
         runButton.textContent = `Run ${count}`;
      } else {
         runButton.textContent = "Run";
      }
   };

   const queue = [];
   const startLoader = () => {
      const timer = setInterval(() => {
         if (queue[0] > 100) {
            queue.shift();
            setClickCount(queue.length);
            clearInterval(timer);
         } else {
            setLoader(queue[0]);
            queue[0] += 1;
         }
      }, timePerPercentage);
   };

   const addLoader = () => {
      let delay = 0;
      queue.forEach((percentage) => {
         delay += (100 - percentage - 1) * timePerPercentage;
      });
      setTimeout(startLoader, delay);
      queue.push(1);
      setClickCount(queue.length);
   };

   runButton.addEventListener("click", addLoader);
}
