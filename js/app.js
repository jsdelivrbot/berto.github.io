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

document.addEventListener( 'click' , (e) => {
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

console.set({size: '2em'});
console.party('Welcome to my console!!');
console.set({size: '1em', style: 'pink'});
console.print('Nothing but beautiful text');
console.log('https://github.com/berto/fun-logger');
