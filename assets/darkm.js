const checkbox = document.querySelector('.dark');
const bodyElem = document.querySelector('body');
const mainElem = document.querySelector('main');
const h1 = document.querySelector('h1');
const textH1 = document.querySelector('.text-h1')
const cepLocal = document.querySelector('#cep-local');
const footer = document.querySelector("footer");


const defaultTheme = () => {
  bodyElem.style.backgroundColor = 'rgb(228, 228, 228)';
};

const darkMode = () => {
  bodyElem.style.backgroundColor = 'rgb(30, 30, 30)';
  mainElem.style.color = 'white';
  h1.style.color = 'rgb(230, 230, 230)';
  h1.style.borderBottom = '10px solid rgb(180, 180, 180)'
  textH1.style.color = 'rgb(200, 200, 200)'
  cepLocal.style.color = 'black'
  footer.style.color = 'rgb(180, 180, 180)'
}

const lightMode = () => {
  bodyElem.style.backgroundColor = 'rgb(228, 228, 228)';
  mainElem.style.color = 'black';
  h1.style.color = 'rgb(80, 80, 80)';
  h1.style.borderBottom = '10px solid rgb(80, 80, 80)'
  textH1.style.color = 'rgb(120, 120, 120)'
  cepLocal.style.color = 'black'
  footer.style.color = 'rgb(80, 80, 80)'
}

const checkLight = () => {
  if(checkbox.checked === true){
    darkMode()
  }
  if(checkbox.checked === false) {
    lightMode()
  }
}

checkbox.addEventListener('click', checkLight);

window.onload = () => {
  defaultTheme();
}