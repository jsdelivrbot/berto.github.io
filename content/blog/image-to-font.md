+++
date = "2017-04-15T22:25:43-07:00"
title = "Image To Font"

+++

<style>
  @font-face {
    font-family: 'Logo';
    font-style: normal;
    src: url('https://rawgit.com/berto/numinousbodywork/master/themes/hugo-future-imperfect/static/fonts/icomoon.ttf');
  }
  .icon-logo {
    line-height: 1em;
    font-size: 500%;
    font-family: "logo";
    transition: color 1s;
  }
  .icon-logo:hover {
    color: rebeccapurple;
  }
  .small {
    font-size: 100%;
  }
</style>

- [Intro](/blog/image-to-font/#intro)
- [From Pixels to Vectors](/blog/image-to-font/#from-pixels-to-vectors)
- [From SVG To Font](/blog/image-to-font/#from-svg-to-font)
- [Include With CSS](/blog/image-to-font/#include-with-css)

## Intro

Recently I ran into the challenge of turning an image that a client provided into an icon.
In order to use it as an icon, I had to included as a font in the CSS.

This blog will walk through the steps and resources I used to make this font icon <span class="icon-logo small">&#xe900;</span> from a png.

### Icon

<span class="icon-logo">&#xe900;</span>

### PNG

<img src="https://raw.githubusercontent.com/berto/numinousbodywork/623b7a89/themes/hugo-future-imperfect/static/img/logo.png" width="100" height="100">  

## From Pixels To Vectors

The first step is to turn the `png` into `svg`. Portable Network Graphics (PNG) is a raster graphics file format.
Raster images are made out of pixels. For fonts, we want vectors. Vector images are mathematical calculations from 
one point to another that form lines and shapes. Scalable Vector Graphics (SVG) is an XML-based vector image format.

To turn the `png` into `svg` we need a vector graphics app. The industry standard is [Adobe Illustrator](http://www.adobe.com/products/illustrator.html)
if you can affort it. I used the OSS [Inkscape](https://inkscape.org/en/), which is awesome!

After uploading the image to the app, I followed [this tutorial](http://www.thenoncraftycrafter.com/2015/02/inkscape.html).

## From SVG To Font

Now that you have the `svg` format of the image, we need to crate a font family. After little googling I found [IcoMoon](https://icomoon.io/).
It is a great app to make fonts out of `svg`'s for free. If you use it correctly, it will generate multiple font file formats that include your icon:

- `icomoon.eot`
- `icomoon.svg`
- `icomoon.ttf`
- `icomoon.woff`

## Include with CSS

The last step is to include the font into your website. First, create a font-face:

```css
  @font-face {
    font-family: 'Logo';
    font-style: normal;
    src: url('path/to/icomoon.ttf');
  }
```

Apply font family rule

```css
  .icon-logo {
    font-family: "logo";
  }
```

Include into HTML. The HTML symbol for the icon is defined when you crate the font with IcoMoon.

```html
  <span class="icon-logo">&#xe900;</span>
```

That's it!

![gopher](img/starcrafts_1.png)
