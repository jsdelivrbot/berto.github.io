+++
date = "2016-09-18T22:48:16-07:00"
title = "Using Docker for Web Development"

+++

- [All Aboard](blog/using-docker-for-web-development/#all-aboard-the-hype-train-containership)
- [Building an App](blog/using-docker-for-web-development/#building-an-app)
- [Dockerfil and Docker Compose](blog/using-docker-for-web-development/#dockerfile-and-docker-compose)
- [Next Steps](blog/using-docker-for-web-development/#next-steps)

## ALL ABOARD THE HYPE _TRAIN_ CONTAINERSHIP

[Docker](https://www.docker.com/what-docker) is popular for its lightweight ease of deployment. Make a container with only the images you need and boom! the perfect running environment. There are many guides that will go into detail on how Docker works and how to use it. However, I haven’t seen many guides that break down the use of it for development… and Docker is a great tool for development. In this blog, I aim to demonstrate such by creating an application while highlighting docker’s common tools and commands. By the end, you should be able to:

- Build an image using Docker
- Create a container to run the application
- Describe and implement [Dockerfile](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#best-practices-for-writing-dockerfiles) and [Docker Compose](https://docs.docker.com/compose/overview/#/common-use-cases)

If you haven’t already, [install](https://www.docker.com/products/docker) the latest version, and let’s get started.

## BUILDING AN APP

[Go](https://golang.org/) is a language that is particular about its environment set up. Which makes it a perfect example for using Docker.

Let’s start with the basics. Create a `main.go` file and add a simple hello world.

```
package main

import "fmt"

func main() {
    fmt.Println("Hello, 世界")
} 
```

Now type the following to run it

```
docker run --rm -v $(pwd):/docker-example -w /docker-example golang sh -c 'go run main.go'
```

`Hello, 世界` should print.

Simple right? Not really. And this is not how I use it but it’s a great place to start. So let’s take it bit by bit:

- `docker run` executes a command in a new container
- `--rm` removes the container after we exit (no need to keep this one)
- `-v` mounts a directory to the container. This is key to be able to edit the files on our machine
- `$(pwd):/docker-example` takes our current directory and mounts it at `/docker-example`
- `-w /docker-example` changes the working directory to be the one we mounted
- `golang` uses the [official image](https://hub.docker.com/_/golang/) to execute Go code
- `sh -c` runs the shell command
- `'go run main.go'` is the Go command to run our file

Better? This command takes the `golang` image and builds a new container that is deleted as soon as it exits.

Let’s try it again, but this time we are going to keep the StandardIn open to interact with the container. First, let’s make our application a little more robust. We can use the sample application from one of my earlier posts

```
package main

import (
        "os"

        "github.com/gin-gonic/gin"
)

func main() {
        r := gin.Default()

        port := os.Getenv("PORT")
        if port == "" {
            port = "3000"
        }

        r.GET("/", func(c *gin.Context) {
            c.JSON(200, gin.H{
                "Docker": "Is Awesome!",
            })
        })

        r.Run(":" + port)
}
```

Now run the following

```
docker run --name docker-example -it -p 3000:3000 -v $(pwd):/go/src/docker-example golang /bin/bash
```

We removed

- the shell command to run the app since we will be doing it manually
- `-w` to point us to the working directory since we can traverse with commands
- `--rm` to delete the container. Let’s keep this one

We added

- `--name` to give it an alias so we can start it easier
- `-it` opens the STDIN
- `-p 3000:3000` opens a port. In this case, it maps port 3000 to our localhost:3000
- `/bin/bash` runs bash

We should be interacting with the container. Before the cursor, we should see `root@[some-container-id]`. We can `cd src/docker-example` and there we will find `main.go`. Before we can run the file, we need to install the dependencies.

```
go get github.com/gin-gonic/gin
```

Now we can run it with `go run main.go` and if we go to `localhost:3000` on our broswer, we will see

```
{
    "Docker": "Is Awesome!"
}
```

Yay!! We did it! Since we mounted our files, any changes we make to this directory will reflect in our local directory so we can start developing…

There’s only a few things to keep in mind. If we close the connection, we can connect again to our container with

```
docker start -i docker-example
```

We can delete it with

```
docker rm docker-example
```

But what if someone else wants to work with the same container’s environment? We wouldn’t want to install all the dependencies manually. Also, typing that long command to create a container is highly inconvinient. That’s where Dockerfile and Docker Compose come to the rescue.

## DOCKERFILE AND DOCKER COMPOSE

First, let’s tackle the problem with dependencies and environment set up with a Dockerfile. Like a [Makefile](https://en.wikipedia.org/wiki/Makefile) contains a set of directives to run, a [Dockerfile](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/) contains a list of commands to build an image. Instead of using the official `golang` image, we want to use our image that is built on top of the `golang` image.

To do that, create a `Dockerfile` and include the following

```
FROM golang
RUN go get github.com/gin-gonic/gin
WORKDIR /go/src/docker-example
```

This simply says to use the `golang` image, install the `gin` dependency, and change our working directory. Obviously our app is basic and doesn’t require much environment configuration. In the [docs](https://docs.docker.com/engine/reference/builder/) we can read more about other options to include. For our purposes, this is all our image needs.

Enter `docker build -t docker-example .` to build it. The `-t` gives it a name of `docker-example` and the `.` points to the current directory.

If all goes well, we can see the new image with `docker images`. We can now use it to build our app container with the command we were using before but instead of `golang` we use our `docker-example` image

```
docker run -it -p 3000:3000 -v $(pwd):/go/src/docker-example docker-example /bin/bash
```

Again, that command is painfully inconvinient to remember. Instead, let’s use [Docker Compose](https://docs.docker.com/compose/overview/#/common-use-cases) to create our container. Add a `docker-compose.yml` file and include

```
version: '2'
services:
    web: 
       build: .
       command: go run main.go
       volumes:
           - .:/go/src/docker-example
       ports:
           - "3000:3000"
```

- The first two lines specify the version and the services available.
- `build` points do the Dockerfile to build the image
- `command` tells it how to run our app
- `volumes` mounts the current directory like we were doing before with `-v`
- `ports` opens the port like `-p`

Build the image with `docker-compose build`

And lastly, run the image with `docker-compose up`

![docker compose](/img/docker-compose.png)

## NEXT STEPS

That’s a good start, but there’s plenty to go from here. Add a database or play with a different language: take a look at the [Docker Compose Rails Example](https://docs.docker.com/compose/rails/) to set up an app with a postgres image.

Hopefully you’ll be enticed to use docker for your next personal project. If not, I leave you here two useful commands

```
# Delete all containers
docker rm $(docker ps -a -q)
# Delete all images
docker rmi $(docker images -q)
```

![gopher](/img/gopher7.png)

