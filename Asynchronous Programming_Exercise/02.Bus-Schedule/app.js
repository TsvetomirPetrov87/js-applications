function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const infoStation = document.getElementById('info');

    let station = { next: 'depot' }

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${station.next}`
        const response = await fetch(url);
        const data = await response.json();

        station = data;
    
        infoStation.textContent = `Next stop ${station.name}`

        departBtn.disabled = true;
        arriveBtn.disabled = false;

    }

    function arrive() {
        infoStation.textContent = `Arriving at ${station.name}`

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();