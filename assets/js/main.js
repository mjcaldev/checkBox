const checkBoxes = document.queryselector('.inbox input[ type="checkbox"]');

function handleCheck(e) {
  console.log(e )
}

checkBoxes.forEach(box => box.addEventListener('click', handleCheck)); // click fires even on keyboard