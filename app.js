const baseUrl = 'http://localhost:5000';
const taquitosContainer = document.getElementById('taquitos-container');

const btnPostTaco = document.getElementById('btn-post-taco');

const tacosOptions = document.getElementById('taco-option');

const tacoForm = {
    name: document.getElementById('taco-name'),
    quantity: document.getElementById('taco-quantity'),
    pica: document.getElementById('option-spyciness')
}

btnPostTaco.onclick = ()=>{
    const taco = {
        name: tacoForm.name.value,
        quantity: tacoForm.quantity.value,
        pica: tacoForm.pica.value
    }

    AddTaquito(taco);
};

const GetTaquitos = ()=>{
    const url = baseUrl;
    fetch(url)
    .then(data => data.json())
    .then(tacos => {
        taquitosContainer.innerHTML = '';
        tacosOptions.innerHTML = '';
        tacos.forEach(taco => {
            const tacoElement = document.createElement('div');
            const tacoName = document.createElement('h3');
            const tacoQuantity = document.createElement('div');
            const tacoSpyciness = document.createElement('div');
            const btnDeleteTaco = document.createElement('button');
            btnDeleteTaco.innerHTML = 'Eliminar x';

            const {name, quantity, pica, id} = taco;

            btnDeleteTaco.onclick = ()=>{
                DeleteTaquito(id);
            }

            const tacoOption = document.createElement('option');
            tacoOption.value = id;
            tacoOption.innerHTML = name;
            tacosOptions.appendChild(tacoOption);

            tacoQuantity.innerHTML = `cantidad: ${quantity}`;
            tacoSpyciness.innerHTML = `¿Es picante?: ${pica}`;
            tacoName.innerHTML = name;
            tacoElement.appendChild(tacoName);
            tacoElement.appendChild(tacoQuantity);
            tacoElement.appendChild(tacoSpyciness);
            tacoElement.appendChild(btnDeleteTaco);

            taquitosContainer.appendChild(tacoElement);
        });
    });
};

const GetTaquito = id =>{
    const url = `${baseUrl}/${id}`;
    fetch(url)
    .then(data => data.json())
    .then(taco => {
        
    });
};

const AddTaquito = taco =>{
    const url = baseUrl;
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(taco),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())
    .then(taco => GetTaquitos());
};

const UpdateTaquito = (id, data) =>{
    const url = `${baseUrl}/${id}`;
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(taco => console.log(taco));
};

const DeleteTaquito = id =>{
    const url = `${baseUrl}/${id}`;
    fetch(url, {
        method: 'DELETE'
    })
    .then(_=> {
        GetTaquitos();
    })
};

GetTaquitos();

/*UpdateTaquito(1, {
    name: 'costillita',
    quantity: 6,
    pica: 'no'
});*/
