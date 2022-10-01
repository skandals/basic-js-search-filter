const searchInp = document.querySelector('.searchInp');
const items = document.querySelectorAll('.item');

items.forEach((item, i) => {

  searchInp.addEventListener('keyup', e => {

      let value = e.target.value.toUpperCase();
      let name = item.children[0].textContent || item.children[0].innerText;
      let description = item.children[1].textContent || item.children[1].innerText;

      if (name.toUpperCase().indexOf(value) > -1 || description.toUpperCase().indexOf(value) > -1) {
          item.style.display = "";
      } 
      else {
          item.style.display = "none";
        }

  })


})