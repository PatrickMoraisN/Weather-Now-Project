const cep = document.querySelector('.cep');
const btn = document.querySelector('.btn');
const checkInputP = document.querySelector('.check-input');
const tempElem = document.querySelector('.temp-fate');
const modal = document.querySelector('.modal-container')
const climaElem = document.querySelector('.clima');
const apiWeather = {
  key: '61ef00c8825fd4245bfd38468e696a37',
  unit: 'metric',
  lang: 'pt_br',
}

const showWeather = (temperature, weather) => {
  const tempCelsius = Math.round(temperature - 273, 15);
  tempElem.innerHTML = `${tempCelsius}`;
  climaElem.innerHTML = `${weather}`;
}
const getWeather = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${apiWeather.lang}&unit=${apiWeather.unit}&appid=${apiWeather.key}`);
  const objs = await response.json()
  showWeather(objs.main.temp, objs.weather[0].description);
}

const checkInput = () => {
    checkInputP.innerHTML = 'Cep/Localidade invalidos! <br> tente 22011010 ou Rio de Janeiro por ex :)';
}

const checkNum = () => {
  for (let i = 0; i < cep.value.length; i++) {
    if (cep.value[i] === '0' || cep.value[i] === '1' || cep.value[i] === '2') {
      return true
    } else {
      return false
    }
  }
}

const openModal = () => {
  modal.classList.add('show-modal')
}

const findCep = async () => {
  if (checkNum()) {
    const cepValue = cep.value;
    const endpoint = `https://viacep.com.br/ws/${cepValue}/json/`;
    const response = await fetch(endpoint);
    const obj = await response.json();
    getWeather(obj.localidade);
    openModal();
  } else if (!cep.value) {
    checkInput()
  } else {
    getWeather(cep.value)
    openModal();
  }
};

btn.addEventListener('click', findCep);