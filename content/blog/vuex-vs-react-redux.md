+++
date = "2017-05-27T22:25:43-07:00"
title = "Vuex vs React Redux"

+++

[Vuex](https://github.com/vuejs/vuex) introduced me to another way of implementing Flux. 

[Flux](http://facebook.github.io/flux/) is an "APPLICATION ARCHITECTURE FOR BUILDING USER INTERFACES". If you ever build a single 
page app with multiple routes and nested components, managing state is a nightmare.
Flux makes it easier to manage and it makes sense. I've used it in multiple react apps with [Redux](http://redux.js.org/),
[Peer Review](https://github.com/berto/peer-review) being my last one,
and it's helpful. It takes a lot of work to set up and multiple files, but it makes sense in large applications.

I found the way [Vue.js](https://vuejs.org/) implements Flux to make more sense. I recently gave a talk at
the Vue meetup about setting up Vuex from scratch (video below). This talk highlights the difference in jargon
and flow of communication. 

The biggest difference is that Vuex out of the box handles asynchronous events and
the way to change state is with Mutations, which, as the name suggests, mutates the state instead of having 
the state immutable and replacing it with Reducers. Personally this is easier to reason about and is what
you want to do anyways. 

[Code](https://github.com/berto/vuex-demo) and [Slides](https://slides.com/robertoortega/vuex/live#/)

<iframe width="560" height="315" src="https://www.youtube.com/embed/I936jW7QbjM" frameborder="0" allowfullscreen></iframe>
  
![gopher](img/starcrafts_2.png)
