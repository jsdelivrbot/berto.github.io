+++
date = "2016-07-20T14:01:29-07:00"
title = "Web Development In Go: Beginners Step by Step Intro"
+++

- [What to expect from this post](/blog/web-development-in-go-beginners-step-by-step-intro/#what-to-expect-from-this-post)
- [Getting Started](/blog/web-development-in-go-beginners-step-by-step-intro/#getting-started)
- [Hello Go](/blog/web-development-in-go-beginners-step-by-step-intro/#hello-go)
- [Web Server](/blog/web-development-in-go-beginners-step-by-step-intro/#web-server)
- [Deployment](/blog/web-development-in-go-beginners-step-by-step-intro/#deployment)
- [Next Steps](/blog/web-development-in-go-beginners-step-by-step-intro/#next-steps)

## WHAT TO EXPECT FROM THIS POST

This is a beginner’s introduction to using Go for Web Development. By the end of this post, we will have built and deployed a simple web site.

I’m striving for a low barrier to entry approach. This means minimizing the complexity by sparing some details and using libraries/frameworks that do most of the magic for us.

If you want to dive deeper, I suggest reading some of the books already available in this [guide](https://github.com/dariubs/GoBooks).

Also, please checkout [Ardan Labs](https://github.com/ardanlabs/gotraining) for awesome Go training classes. And speaking of awesome, checkout [Awesome Go](https://github.com/avelino/awesome-go) for a curated list of resources to use for your next project.

## GETTING STARTED

If you have not installed Go, the Golang Book does a terrific job walking you through it. For the lazy:

Open up your terminal (This is probably the best time to mention I have a Mac and will be using a OSX).

Install [Homebrew](http://brew.sh/). This makes downloading software a breeze.

Go into [AWS](https://aws.amazon.com/) and set up an account. It’s free with the basic account but credit card and phone verification is still required. Takes a few minutes. Then, dive into EC2.

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Install Go

`brew install go`

Install [Git](https://git-scm.com/)

`brew install git`

Install [Atom](https://atom.io/)

`brew cask install atom`

Create your Go workspace. Everything you do should be inside this directory.

`mkdir -p ~/go/src`

Lastly, set your [environment variables](https://en.wikipedia.org/wiki/Environment_variable) so the computer knows where to run Go

`echo export GOPATH='$HOME'/go >> ~/.profile`

`echo export PATH='$PATH':'$GOPATH'/bin >> ~/.profile`

`source ~/.profile`

That’s it! for more information on Go’s environment, check out the [GoDocs](https://golang.org/doc/code.html).

## HELLO GO

Now that your environment is set up, let’s test it:

Make a file inside your Go workspace

`cd ~/go/src/`

`touch main.go`

`atom main.go`

This commands will traverse to your workspace, create a file, and open it with Atom. Then paste:

```
package main

import "fmt"

func main() {
    fmt.Println("Hello Go!")
}
```

and run the program with

`go run main.go`

`go run` builds the binary and executes it.

If it all went well, you should see “Hello Go!” on your terminal… if not, get a new computer and start over.

## WEB SERVER

The terminal is great, but let’s get a hello in our browser. First, lets make a new directory for our project.

`mkdir -p $GOPATH/src/web-server`

Now let’s install [Gin](https://gin-gonic.github.io/gin/) to run our server. In Go, install packages by using `go get`, this installs packages inside your go `src` directory with the paths being nested directories. So when you run:

`go get github.com/gin-gonic/gin`

Your Go workspace should look something like:

```
go/  
  |- pkg/
  |- bin/
  |- src/
    |- github/
      |- gin-gonic/
        |- gin/
    |- web-server/
```

Inside our project, create a `main.go` file. There, let’s write our server:

```
package main

// here we define our imports
import (
  // import in standard libraries
	"net/http"
	"os"

  // import the web framework
	"github.com/gin-gonic/gin"
)

// all go projects require a main function
// this is the function that runs the program
func main() {
  // initialize a gin server
	r := gin.Default()

  // load html files to be rendered
	r.LoadHTMLGlob("*.html")
  // parse through static files to be served
  // static files include our js and css
	r.Static("/public", "public")

  // define the port our server will be running on
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

  // define the route path and response
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"HelloMessage": "Go is Awesome!",
		})
	})

  // start the server
	r.Run(":" + port)
}
```

Next, we need to create the main HTML file to be rendered

`touch index.html`

Add some filler text

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Go is Awesome!</title>
    <link rel="stylesheet" href="/public/style.css">
  </head>
  <body>
    <h2>{{.HelloMessage}}</h2>
  </body>
</html>
```

Notice the `{{. }}`. This is syntax Go’s template engine. Basically, it will dynamically render information from our server into the HTML.

Let’s make a `style.css` file to make sure our server is serving our static `public` directory

`mkdir public && touch public/style.css`

And add some style

```
body {
  color: white;
  background: rebeccapurple;
}
```

Lastly, let’s run it like we did before

`go run main.go`

We should get some messages from Gin in our terminal, but most importantly, in your browser, if you navigate to `localhost:3000`, you should see a purple page with some white text.

## DEPLOYMENT

Now that we have a web server running, we shall deploy it so everyone can see it! For this we will use [Heroku](https://www.heroku.com/). Here is a great resource to get started with [Heroku and Go](https://devcenter.heroku.com/articles/getting-started-with-go), and here is my TLDR:

Before we deploy, we should move all of our 3rd party packages into a `/vendor` directory. In other words, vendor our packages. To do this, we will use [govendor](https://github.com/kardianos/govendor). Like before, let’s use `go get` to install it

`go get github.com/kardianos/govendor`

Then, let’s use it to create a our vendor directory with our dependencies

`govendor init`

`govendor add +external`

The next step is to create a `Procfile` so Heroku knows the process type of our project.

`echo "web: web-server" >> Procfile`

Now that we have everything we need, let’s save this version using Git.

`git init`

`git add -A`

`git commit -m "initial commit"`

[Sign up](https://signup.heroku.com/login) to Heroku and download the [CLI Toolbelt](https://devcenter.heroku.com/articles/getting-started-with-go#set-up). When ready, simply create an app (with a unique name) and send the project to Heroku

`heroku create [unique-name]`

`git push heroku master`

`heroku open`

All done! We have successfully built a web server and deployed it to the internet. Pad yourself on the back.

## NEXT STEPS

From here, build up your server. Add some routes, add some views, build your own blog. [Go by Example](https://gobyexample.com/) is one of my favorite tools to learn the language.

And speaking of examples, I highly encourage looking at some of my [previous work](https://github.com/search?q=user%3Aberto+language%3Ago) for examples on [multiple routes](https://github.com/berto/twitch-streams/blob/master/main.go), [serving JSON](https://github.com/berto/sugoku/blob/master/main.go#L70), and hooking up a [database](https://github.com/berto/beer-tinder/blob/master/main.go#L37).

![gopher](/img/gopher2.png)
