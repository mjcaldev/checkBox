const checkBoxes = document.querySelectorAll('.inbox input[type="checkbox"]');

function handleCheck(e) {
  // Check if they had the shift down
  // Check it is being checked not unchecked
  let inBetween = false;
  if (e.shiftKey && this.checked) {
  // Loop over items between two checked items
  checkBoxes.forEach(box => {
    console.log(box)
    if (box === this || box === lastChecked) {
      inBetween = !inBetween;
      console.log('Checking inbetween!')
    }
    if (inBetween) {
      box.checked = true;
    }
  });
}

lastChecked = this;
}

checkBoxes.forEach(box => box.addEventListener('click', handleCheck)); // click fires even on keyboard