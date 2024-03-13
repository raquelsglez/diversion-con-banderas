const countriesList = document.getElementById('countries-list');
const modalInfo = document.getElementById('modal-info');
const modal = document.getElementById('modal');

const getCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3/all');
        if (!response.ok) {
            throw new Error('Ha surgido un error', response.status);
        }
        const data = await response.json();
        const sortData = data.sort((a, b) => {
            const nameA = a.name.common.toLowerCase();
            const nameB = b.name.common.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            else if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        return showCountriesList(sortData);
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
};

function showCountriesList(countries) {
    countries.forEach(country => {
        const divFlag = document.createElement('div')
        divFlag.classList.add('div-flag')

        const name = document.createElement('p');
        name.innerHTML = country.name.common;

        const flag = country.flags[1];
        const flagImg = document.createElement('img');
        flagImg.src = flag;
        flagImg.alt = `${country.name.common} flag`;

        divFlag.appendChild(flagImg);
        divFlag.appendChild(name);
        divFlag.addEventListener('click', () => showCountryInfo(country));

        countriesList.appendChild(divFlag)

    });
};

function showCountryInfo(country) {
    const container = document.createElement('div');
    container.classList.add('modal-flag')

    const flagImg = document.createElement('img');
    const flag = country.flags[1];
    flagImg.src = flag;
    flagImg.alt = `${country.name.common} flag`;

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('modal-info-container')

    const name = document.createElement('p');
    name.classList.add('name')
    name.innerHTML = country.name.common;

    const capital = document.createElement('p');
    capital.innerHTML = "Capital: " + country.capital;

    const population = document.createElement('p');
    population.innerHTML = `Población: ${country.population}`;

    const direction = document.createElement('p');
    direction.innerHTML = `Lado de la carretera: ${country.car.side}`;

    infoContainer.appendChild(name);
    infoContainer.appendChild(capital);
    infoContainer.appendChild(population);
    infoContainer.appendChild(direction);

    container.appendChild(flagImg);
    container.appendChild(infoContainer);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.addEventListener('click', () => {
        modalInfo.innerHTML = '';
        modal.style.display = 'none';
    });
    
    modalInfo.appendChild(container);
    modalInfo.appendChild(closeButton);

    modal.style.display = 'block';
}

getCountries();
