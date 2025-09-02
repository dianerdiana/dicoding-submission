document.addEventListener("DOMContentLoaded", () => {
  const decreaseButton = document.getElementById("decrease");
  const increaseButton = document.getElementById("increase");
  const countText = document.getElementById("count");

  let count = 0;

  const renderCount = () => {
    countText.innerText = count;
  };

  decreaseButton.addEventListener("click", () => {
    count--;
    renderCount();
  });

  increaseButton.addEventListener("click", () => {
    count++;
    renderCount();
  });

  renderCount();
});
