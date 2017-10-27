const burst = new mojs.Burst({
  left: 0, 
  top: 0,
  radius:   { 0: 100 },
  count:    7,
  angle:    { 0: 90 },
  opacity:  { 1: 0 },
  children: {
    fill:       { '#BE6CB6' : 'cyan' },
    duration:   2000
  }
})

const displayBackground = location.pathname === '/' || location.pathname === '/about/'

if (displayBackground) {
  const overlay = document.querySelector('.overlay')
  overlay.style.opacity = .1
}

const img = document.querySelector('img')

if (img) {
  img.addEventListener( 'click' , (e) => {
    let isA = e.target.localName === 'a'
    let hasParent = e.target.parentNode.localName === 'a'
    let hasGrandparent = e.target.parentNode.parentNode.localName === 'a'
    if (!isA && !hasParent && !hasGrandparent) {
      burst
        .tune({ x: e.pageX, y: e.pageY })
        .generate()
        .replay();
    }
  })
}

console.set({size: '2em'});
console.party('Welcome to my console!!');
console.set({size: '1em', style: 'pink'});
console.print('Nothing but beautiful text');
console.log('https://github.com/berto/fun-logger');

// Dark Theme

const button = document.querySelector('.theme')
const backgroundImage = document.querySelector('.overlay')
const body = document.querySelector('body')
initTheme()

button.addEventListener('click', toggleTheme)

function initTheme() {
  const isLight = isLightTheme()
  if (!isLight) {
    button.classList.toggle('ion-ios-moon')
    button.classList.toggle('ion-ios-sunny')
  }
  toggleCSS()
}

function toggleTheme(event) {
  body.style.transition = 'background 1s'
  event.target.classList.toggle('ion-ios-moon')
  event.target.classList.toggle('ion-ios-sunny')
  savePreferences()
  toggleCSS()
}

function toggleCSS() {
  const isLight = isLightTheme()
  if (isLight) {
    let lightCSS = {
      background: 'white',
      color: 'black',
      opacity: 0.05,
      filter: 'none'
    }
    setTheme(lightCSS)
  } else {
    let darkCSS = {
      background: 'black',
      color: 'lightgray',
      opacity: 0.1,
      filter: 'invert(100%)'
    }
    setTheme(darkCSS)
  }
}

function savePreferences() {
  const isLight = localStorage.getItem('isDark') != 'true'
  let isDark = false
  if (isLight) {
    isDark = true
  }
  localStorage.setItem('isDark', isDark)
}

function isLightTheme(color) {
  return localStorage.getItem('isDark') === null || localStorage.getItem('isDark') != 'true'
}

function setTheme(css) {
  const title = document.querySelector('.name h1')
  setElementsColor('section.main .content', css.color)
  setElementsColor('section.main .content .markdown p', css.color)
  for(let i = 1; i <= 6; i++) {
    setElementsColor(`section.main .content .markdown h${i}`, css.color)
  }
  setElementsColor('section.main .content .page-heading', css.color)
  setElementsColor('section.main .content .markdown code', 'black')
  setElementsColor('section.main .container .content .see-more', css.color)
  if (!displayBackground) {
    css.opacity = 0
  }
  body.style.backgroundColor = css.background
  title.style.color = css.color 
  backgroundImage.style.opacity = css.opacity
  backgroundImage.style.filter = css.filter
  button.style.color = css.color
}

function setElementsColor(selector, color) {
  const elements = document.querySelectorAll(selector)
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.color = color
  }
}

// ZERGLING

const eyes = document.querySelector('#eyes')
const tongue = document.querySelector('#tongue')
const wings = document.querySelector('#wings')

animate()

function animate() {
  blink(200)
  shake()
  pant()
}

function blink(milli) {
  eyes.style.display = 'none'
  setTimeout(function() {
    eyes.style.display = ''
  }, milli)
}

function shake() {
  wings.style.transformOrigin = 'bottom right'
  wings.style.animation = 'shake 1s'
  setTimeout(function() {
    wings.style.transformOrigin = ''
    wings.style.animation = ''
  }, 1000)
}

function pant() {
  tongue.style.animation = 'pant .7s'
  setTimeout(function() {
    tongue.style.animation = ''
  }, 1000)
}
