function toggleText() {
  let btns = document.getElementsByClassName('toggle-text-button');
  let text = document.getElementById('text');
  for(let btn of btns) {
    btn.addEventListener('click', event => {
      text.toggleAttribute('hidden'); 
    })
  }
}
