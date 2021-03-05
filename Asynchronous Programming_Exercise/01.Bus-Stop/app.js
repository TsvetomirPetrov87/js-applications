async function getInfo() {
    const input = document.getElementById('stopId');
    const id = input.value;
    const ulBuses = document.getElementById('buses');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${id}`;

   try {
    ulBuses.innerHTML = '';

    const response = await fetch(url);
    const data = await response.json();

    //console.log(data);
    document.getElementById('stopName').textContent = data.name;

    Object.entries(data.buses).map(([bus, time]) => {
        const result = document.createElement('li');
        result.textContent = `Bus ${bus} arrives in ${time}`
       
        ulBuses.appendChild(result);
    })

    id.value = '';

   } catch(error) {
      document.getElementById('stopName').textContent = 'Error';
   }
}
