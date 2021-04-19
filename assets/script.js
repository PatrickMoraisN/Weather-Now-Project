const cep = document.querySelector('.cep');
const btn = document.querySelector('.btn');
const closeBtn = document.querySelector('.close-btn');
const checkInputP = document.querySelector('.check-input');
const tempElem = document.querySelector('.temp-fate');
const modalText = document.querySelector('.modal-text');
const modal = document.querySelector('.modal-container');
const climaElem = document.querySelector('.clima');
const imgIcon = document.querySelector('.icon')
const citySpan = document.querySelector('.local');
const greetsSpan = document.querySelector('.greet');
const smallPhrase = document.querySelector('.small-phrase');
const label = document.querySelector('#cep-local');
const apiWeather = {
  key: '61ef00c8825fd4245bfd38468e696a37',
  unit: 'metric',
  lang: 'pt_br',
}



label.innerHTML = label.innerText.split('')
  .map((letter, id) => `<span style="transition-delay:${id*0.03}s">${letter}</span>`)
  .join('');


const randomPhrase = () => {
  const phrases = [
    'Vai uma pizza frita ai?',
    'Qual a boa de hoje?',
    'Vamos com tudo!',
    'Foguete nao tem ré',
    'Avante trybengerss!!'
  ]
  const randomIndex = Math.floor(Math.random() * 5)
  if (randomIndex !== 5) {
    smallPhrase.innerHTML = `${phrases[randomIndex]}`;
  }
}

const showWeather = (temperature, weather, icon, city) => {
  const greets = ['Olá', 'Eai', 'Coee', 'Faala', 'Oioi'];
  const randomIndex = Math.floor(Math.random() * 4);
  const tempCelsius = Math.round(temperature - 273, 15);
  tempElem.innerHTML = `${tempCelsius}`;
  climaElem.innerHTML = `${weather}`;
  imgIcon.src = `./assets/imgs/icons/${icon}.png`;
  citySpan.innerHTML = city;
  greetsSpan.innerHTML = `${greets[randomIndex]}`;
  randomPhrase();
}
const getWeather = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${apiWeather.lang}&unit=${apiWeather.unit}&appid=${apiWeather.key}`);
  const objs = await response.json()
  showWeather(objs.main.temp, objs.weather[0].description, objs.weather[0].icon, city);
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
    getWeather(cep.value);
    openModal();
  }
};

btn.addEventListener('click', findCep);
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show-modal')
})