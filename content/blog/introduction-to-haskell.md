+++
date = "2017-02-02T23:55:51-07:00"
title = "Introduction to Haskell"
+++

- [Getting Started](/blog/introduction-to-haskell/#getting-started)
- [Development](/blog/introduction-to-haskell/#development)
- [Syntax](/blog/introduction-to-haskell/#syntax)
- [Conclusion](/blog/introduction-to-haskell/#conclusion)

I came to discover [Haskell](https://www.haskell.org/) is a wonderful programming language. The fact that it is statically typed and purely functional grabbed my attention (it is also described as a declarative language, regardless of how impossible it is to read).

This blog is an open record of how I came to create a simple [CLI timer](https://github.com/berto/terminal-countdown-timer) with Haskell and what I learned from it.

![timer](/img/projects/timer.gif)

## GETTING STARTED

Ridiculously painless. First, read as much as you can of [Learn You A Haskell](http://learnyouahaskell.com/). It is the best programming book I've ever read.

When you're ready to code, go [here](https://www.haskell.org/platform/) and download the latest version of the Haskell Platform. 

On top of installing Haskell, it also gives you [GHC](https://www.haskell.org/ghc/) to compile the code. It comes with an interactive environment for the terminal. Type `ghci` to play around.

Lastly, the platform comes with [Cabal](https://www.haskell.org/cabal/). Cabal is [not a package manager](https://ivanmiljenovic.wordpress.com/2010/03/15/repeat-after-me-cabal-is-not-a-package-manager/), even though it contains information about the packages. It is part of the ecosystem, along with [HaskellDB](http://hackage.haskell.org/packages/hackage.html) and cabal-install to manage your packages.

All and all, I used Cabal to get the libraries and packages that i needed (like a package manager). I also used [Stack](https://docs.haskellstack.org/en/stable/README/). It is a wonderful program for developing Haskell apps. It scaffolds a beautiful app with tests. Install by running:

```
curl -sSL https://get.haskellstack.org/ | sh
```

Then use it with the following commands:

```
stack new my-project
cd my-project
stack setup
stack build
stack exec my-project-exe
```
 
## DEVELOPMENT

Type `stack new my-project` to get started. When you generate a new project, Stack gives you the following:

```
.
├── LICENSE
├── Setup.hs
├── app
│   └── Main.hs
├── my-project.cabal
├── src
│   └── Lib.hs
├── stack.yaml
└── test
    └── Spec.hs
```

Like `Java` and other compiled languages, the `main` package contains the main function of the application. You will notice a `Lib` package being imported in `Main.hs`. This is an example of importing custom packages from the `src` directory.
You can create a package by creating a file in the `src` directory and adding it to the `.cabal` file's `exposed-modules`. 

I found myself editing the `*.cabal` file quite often. This is where your project information lives and you specify the package imports.

For importing third party packages, install them using `cabal` and then add them to the ` build-depends`. For example, I used `hspec` for tests, so I ran `cabal install hspec` and then added `hspec   == 2.*` to the dependencies. Here you can find an example of my [.cabal file](https://github.com/berto/terminal-countdown-timer/blob/master/terminal-countdown-timer.cabal) and the [tests](https://github.com/berto/terminal-countdown-timer/blob/master/test/Spec.hs).

To create your own packages, start by defining the module name, the functions to by exported surrounded by parenthesis, and the keyword `where`. This is the example from the `Lib` package:

```
module Lib
    ( someFunc
    ) where

someFunc :: IO ()
someFunc = putStrLn "someFunc"
```

Then, when the package is imported, all the exported functions will be available globally.

I only had a problem with certain packages being hidden by Cabal that Stack wasn't able to access. If this ever happens, I worked around it by including a flag in the build command:

```
stack build --ghc-options="-package [container-name]"
```

## SYNTAX

Again, I highly suggest reading [Learn You A Haskell](http://learnyouahaskell.com/) to explore the language. I do want to highlight a few areas that stood out to me:

#### Optionally Statically Typed

```
lpad :: Int -> [Int] -> [Int]
lpad m xs = replicate (m - length ys) 0 ++ ys
    where ys = take m xs
```

In the example above, the first line defining the function is `lpad :: Int -> [Int] -> [Int]`. This is the syntax for declaring the input and output of the function, first the name, then the `::` and then the parameters separated by `->`'s.
The last type is the output. In this example, the function `lpad` takes an integer and a list of integers and returns another list of integers.

This is completely optional though. It is considered good practice to give functions type declarations but it is not required. The compiler will do just fine without it. Read [this chapter](http://learnyouahaskell.com/types-and-typeclasses) for more information.

#### Extensive List of Operators

Haskell, and other functional languages, are mathematical and full of operators. [Here](http://www.imada.sdu.dk/~rolf/Edu/DM22/F06/haskell-operatorer.pdf) is a list of them.

I find them unwelcoming when learning the language. They simplify the code to an extend that it looks beautiful but quite difficult to read. As a beginner, I found myself constantly looking up their definition.

My favorite ended up being the `$` that is an abstraction of `()`'s in the way of grouping the order of execution. `sum (1 * 8)` is the same as `sum $ 1 * 8`

#### The Importance of Pattern Matching 

In the [Syntax in Functions](http://learnyouahaskell.com/syntax-in-functions) chapter, you can see Haskell's ability to do pattern matching. There are so many ways to do `if` statements.

You can define a function to behave differently depending on the input with standard `if` statements, [guards](https://wiki.haskell.org/Pattern_guard), or more interestingly, the way you define the function. Here is an example from the book:

```
sayMe :: (Integral a) => a -> String  
sayMe 1 = "One!"  
sayMe 2 = "Two!"  
sayMe 3 = "Three!"  
sayMe 4 = "Four!"  
sayMe 5 = "Five!"  
sayMe x = "Not between 1 and 5" 
```

If the input is 1, the function will return "One!", if it's 2, "Two!, and so on. In the last case, it will handle any other input as a variable `x`. 

#### Flexible Inputs and Outputs 

In the code example above, you may have noticed the type `a` in the function declaration. This is Haskell's [Generics](https://wiki.haskell.org/Generics). They are great for allowing flexible inputs and outputs in a function. That means that the function `sayMe` could take any type of input. 

Haskell also has a [Maybe](https://hackage.haskell.org/package/base-4.9.1.0/docs/Data-Maybe.html) and [Either](https://hackage.haskell.org/package/base-4.9.1.0/docs/Data-Either.html) type. This I found really interesting, where you define the possibility of the outcome. In the case of `Maybe`, you get `Just` the type you defined or `Nothing` back.

```
f::Int -> Maybe Int
f 0 = Nothing
f x = Just x
```

With `Either`, you `Either` get the `Right` or the `Left` type. 

```
f1 :: Int -> Either String Int
f1 arg = if arg == 42
             then Left "can't work with 42"
             else Right (arg + 3)
```

`Maybe` and `Either` output flexibility is great for error handling.

## CONCLUSION

Haskell is a blast. I must admit, I made rookie mistakes of trying to define an accumulator variable at global scope and trying to change the nth number of a list. In functional programming, there is no state or mutations.

The way of thinking is different. More recursion, math, modularity, and simplicity. I like the process of composing my code, brick by brick. Refactoring and modification was a peaceful process.

I encourage all to give it a shot.

![gopher](/img/gopher7.png)
