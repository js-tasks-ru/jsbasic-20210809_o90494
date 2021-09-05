let btns = document.getElementsByClassName('hide-self-button');

function hideSelf() {
  for(let btn of btns) {
    btn.addEventListener('click', event => {
      event.target.setAttribute('hidden', true);    
   })
  }  
}
