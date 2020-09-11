const baseUrl = 'http://localhost:5000';

const GetTaquitos = ()=>{
    const url = baseUrl;
    fetch(url)
    .then(data => data.json())
    .then(tacos => console.log(tacos));
};

const GetTaquito = id =>{
    const url = `${baseUrl}/${id}`;
    fetch(url)
    .then(data => data.json())
    .then(tacos => console.log(tacos));
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
    .then(taco => console.log(taco));
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

const DeleteTaquito = (id) =>{
    const url = `${baseUrl}/${id}`;
    fetch(url, {
        method: 'Delete',
    })
};

/*GetTaquitos();
GetTaquito(2);

const showChanges = async ()=>{
    await AddTaquito({
        name: 'canasta',
        quantity: 3,
        pica: 'si'
    });
    
    GetTaquitos();
}

showChanges();*/

UpdateTaquito(1, {
    name: 'costillita',
    quantity: 6,
    pica: 'no'
});

DeleteTaquito(3,{

});

const GetTaquitos = async() =>{
    const response = await fetch(`${baseUrl}`);
    const data = await response.json();

    const tacoArr = data.map(element =>{
        const{id, name, quantity, pica} = element;
        return{taquitoID: id, taquitoName: name, taquitoQuantity: quantity, taquitoPica: pica};
    });

    tacoArr.forEach(element => {
        taquitosList.innerHTML +=
        `<li>
         <div>${element.taquitoID}</div>
        <ul>
        <div>Name: ${element.taquitoName}</div>
        <div>Quantity: ${element.taquitoQuantity}</div>
        <div>Pica: ${element.taquitoPica}</div>
        <ul><br>`;
    });
}

GetTaquitos();

const taquitosList = document.getElementById('taquitos-list');