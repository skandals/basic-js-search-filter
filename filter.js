const searchInp = document.getElementById('searchInp');
const items = document.querySelectorAll('.item');

items.forEach((item, i) => {

searchInp.addEventListener('keyup', e => {

        let value = e.target.value.toUpperCase();
        let name = item.children[0].textContent || item.children[0].innerText;

        if (name.toUpperCase().indexOf(value) > -1) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }

    })


})