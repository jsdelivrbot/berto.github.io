+++
date = "2016-12-03T23:46:44-07:00"
title = "Making This Site with Hugo"
+++

- [Introduction](/blog/making-this-site-with-hugo/#introduction)
- [Installation](/blog/making-this-site-with-hugo/#installation)
- [Picking A Theme](/blog/making-this-site-with-hugo/#picking-a-theme)
- [Generating An App](/blog/making-this-site-with-hugo/#generating-an-app)
- [Customizing The App](/blog/making-this-site-with-hugo/#customizing-the-app)
- [Adding Content](/blog/making-this-site-with-hugo/#adding-content)
- [Deployment](/blog/making-this-site-with-hugo/#deployment)
- [Next Steps](/blog/making-this-site-with-hugo/#next-steps)

## INTRODUCTION

[Static site generators](https://davidwalsh.name/introduction-static-site-generators) are fun.
After building many sites, being able to scaffold one in minutes can be extremely convenient.
If the goal is to write a blog, there is no need to wireframe, create the html layout, style, etc. Simply generate the app and start typing.

[Hugo](https://gohugo.io/) is my favorite static site generator. If you know me, the fact that it is written in [Go](https://golang.org/) already wins my heart.
But it's also ridiculously fast and easy to use. I will do my best to demonstrate such ease to get a site up and going in minutes.

## INSTALLATION

If you have a Mac and [Homebrew](http://brew.sh/)

```
brew install hugo
```

Otherwise, look into the [release list.](https://github.com/spf13/hugo/releases)

## PICKING A THEME

Before entering any commands or coding a single character, I like to plan and know what I am making.

The first step for us is to pick out a theme. Here is an [extensive list](http://themes.gohugo.io/) that keeps growing everyday.

When picking a theme, make sure it has the layout and features you will need. Think of navigation bar, routes, and customization. Most themes provide a demo to play around with.

It is not a deal breaker if it doesn't have everything you need. You can customize a theme fairly easy, but it is less work overall.

After picking a theme, make sure to find the `config.toml` file, we will need this to configure our app. 

## GENERATING AN APP

The `hugo` commands are pretty straightforward. To start:

```
hugo new site .
```

This will immediately create an app in the current directory, hence the `.`.

Now, let's add our theme. Go to the source code of the theme. [Here](https://github.com/spf13/hugoThemes) is the repo containing all the themes. For this site, I used the [cocoa-eh](https://github.com/fuegowolf/cocoa-eh-hugo-theme) theme. 

To add it, simply clone it with `git` into a themes directory. For example:

```
git clone https://github.com/fuegowolf/cocoa-eh-hugo-theme.git ./themes/cocoa-eh
```

Copy the `config.toml` file provided by the theme to the root of the project. Sometimes it is easily provided by the theme, other times look into the demo source code. [This](https://github.com/fuegowolf/cocoa-eh-hugo-theme/blob/master/exampleSite/config.toml) is an example of one.

Customize it with your information.

When that's done, serve the application with the new theme

```
hugo server -D
``` 

The new site should be up and running on `localhost:1313`

## CUSTOMIZING THE APP

As I mentioned before, customizing a `hugo` app is fairly easy. Inside the theme directory, there is `layouts` and a `static` directory.

The `static` directory is where you can add any assets, `css`, or `js` files.

Link to them in the `layouts` directory. Inside the `partials`, you'll find the header and footer to add any scripts.

The one unfamiliar syntax you might find is the "Actions" surrounded by `{{` and `}}`. This is [Go's Template](https://golang.org/pkg/text/template/) syntax, very similar to [Handlebars](http://handlebarsjs.com/). The "Actions" are basically arguments or pipelines to add value and logic to the template.

In our case, we can use it to link to our files with the correct path. There are many variables available, the one we will use is `{{ .Site.BaseURL }}`, which as you might have guessed, represents your app URL defined in the `config.toml`. 

E.g.

```
<script src="{{ .Site.BaseURL }}/js/app.js" type="text/javascript"></script>
```

## ADDING CONTENT 

Depending on the type of site, we will want to add some personal content. Inside the project, there is a `contents` directory. This is where the markdown files live and are parsed into html from.

`Hugo` themes will usually specify what files it is looking for. Some common ones are `about.md`, `blog/`, and `projects/`.

We can create these files manually, but the preferred method is to generate them with `hugo`:

```
hugo new blog/this-is-a-new-blog.md
```

or

```
hugo new about.md
```

## DEPLOYMENT 

So far we've been running a `hugo` server to edit our new application. To generate the static files with our theme, run:

```
hugo -t [theme-name]
```

That's it! The `public` directory will contain our new and wonderful application. You can deploy it to any static site host. [Github Pages](https://pages.github.com/) is my host of choice. There is a nice tutorial [here](https://gohugo.io/tutorials/github-pages-blog/) to create a `deploy.sh` for easy deployment.

## NEXT STEPS

Checkout [this site's repo](https://github.com/berto/berto.github.io) for more code examples.

If you find yourself customizing a lot of your theme, I highly encourage you to [create your own hugo theme](https://gohugo.io/themes/creation/).

Also, feel free to checkout [other static site generators](https://www.staticgen.com/).

![gopher](/img/gopher6.png)
