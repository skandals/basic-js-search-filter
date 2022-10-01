const inpName = document.querySelector('#inpName')
const inpDesc = document.querySelector('#inpDesc')
const addBtn = document.querySelector('#addBtn')
const itemSection = document.querySelector('.items')


class addItems {

    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    checkEmptyFields(){
        let result;

        if(this.name.value.length == 0 && this.description.value.length == 0) {
            inpName.style.borderColor = 'red';
            inpDesc.style.borderColor = 'red';
            inpName.style.outlineColor = 'red';
            inpDesc.style.outlineColor = 'red';

            result = false;
        }else {
            inpName.style.borderColor = 'rgb(190, 190, 190)';
            inpDesc.style.borderColor = 'rgb(190, 190, 190)';
            inpName.style.outlineColor = 'royalblue';
            inpDesc.style.outlineColor = 'royalblue';
            result = true;
        }

        return result;
    }

    checkName() {
        let result;

        if(this.name.value.length == 0) {
            inpName.style.borderColor = 'red';
            inpName.style.outlineColor = 'red';
            result = false;
        }
        else {
            inpName.style.borderColor = 'rgb(190, 190, 190)';
            inpName.style.outlineColor = 'royalblue';
            result = true;
        }

        return result;
    }

    checkDesc() {
        let result;
        
        if(this.description.value.length == 0) {
            inpDesc.style.borderColor = 'red';
            inpDesc.style.outlineColor = 'red';
            result = false;
        }else {
            inpDesc.style.borderColor = 'rgb(190, 190, 190)';
            inpDesc.style.outlineColor = 'royalblue';
            result = true;
        }
        return result;
    }

    getItem() {

        if(localStorage.getItem('items')) {

            let items = document.querySelectorAll('.item');

            items.forEach(item => {
                item.remove();
            })

            //get localstorage data
            let data = JSON.parse(localStorage.getItem('items'));
    
            data.forEach(item => {
        
            itemSection.insertAdjacentHTML('afterbegin', `
                <div class="item">
        
                    <div class="details">
                        <div class="title">${item['name']}</div>
                        <div class="description">
                                ${item['description']}
                            </div>
                    </div>
        
                    <div class="options">
                        <button class="dltBtn" value="${item['id']}">Delete</button>
                    </div>
        
                </div>`
            );

        });
         
    }

    }

    additem() {

        let id = 1; 

        let newData = [];

        if(localStorage.getItem('items')) {

            // get old data
            let oldData = JSON.parse(localStorage.getItem('items'));

            let data = {
                id: oldData.length + 1,
                name: this.name.value,
                description: this.description.value
            }

            // push new data to old data
            oldData.push(data);

            //update localstorage
            localStorage.setItem('items', JSON.stringify(oldData));

        }else {

            let data = {
                id: id,
                name: this.name.value,
                description: this.description.value
            }

            newData.push(data);

            //update localstorage
            localStorage.setItem('items', JSON.stringify(newData));

        }

    }

    removeItem() {

        let dltBtns = document.querySelectorAll('.dltBtn');

            dltBtns.forEach(dltBtn => {

                dltBtn.addEventListener('click', e => {

                let itemElem = e.target.parentElement.parentElement;

                    let u_id = e.target.value;

                    let data = JSON.parse(localStorage.getItem('items'));

                    let newItems = data.filter((item, i, items) => {   

                      return item.id != u_id;

                    })
   
                    localStorage.setItem('items', JSON.stringify(newItems))
                    console.log(newItems);
                    itemElem.remove();

                })

            })

    }

    checkEverything() {
        if(!this.checkEmptyFields()) {
            console.log('Empty fields')
        }
        else if(!this.checkName()) {
            console.log('Empty name')
        }
        else if(!this.checkDesc()) {
            console.log('Empty description')
        }else {

            //add items to the local storage, refresh the dom and get the remove function
            this.additem();
            this.getItem();
            this.removeItem();

        }
    }

}

let addItemClass = new addItems(inpName, inpDesc); 
addItemClass.getItem();
addItemClass.removeItem();

addBtn.addEventListener('click', e => {
    e.preventDefault();

    addItemClass.checkEverything();

})



