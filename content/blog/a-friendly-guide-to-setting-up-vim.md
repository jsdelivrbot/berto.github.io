+++
date = "2016-08-16T22:25:43-07:00"
title = "A Friendly Guide to Setting Up VIM"

+++

- [Why Vim?](/blog/a-friendly-guide-to-setting-up-vim/#why-vim)
- [Previous Requirements](/blog/a-friendly-guide-to-setting-up-vim/#previous-requirements)
- [Installation](/blog/a-friendly-guide-to-setting-up-vim/#installation)
- [vimrc](/blog/a-friendly-guide-to-setting-up-vim/#vimrc)
- [Personal Extras](/blog/a-friendly-guide-to-setting-up-vim/#personal-extras)
- [Next Steps](/blog/a-friendly-guide-to-setting-up-vim/#next-steps)

## WHY VIM?

This blog will walk you step by step on how to setup vim and make it your new favorite text editor. [But why?](http://www.viemu.com/a-why-vi-vim.html) you may ask. Vim seems like a long walk for a short dive. It’s difficult to understand, set up, and learn to navigate.

I like shortcuts and simply think it's fun.

I’m not going to try to convince you to use it, however, or even teach you how to use it. The goal is to help you get it set up quickly so you can start playing with it and then make your own judgement.

Here is a preview of what you’ll be walking away with:

![vim](/img/vim.png)

## PREVIOUS REQUIREMENTS

I assume you use git and have some previous experience using [dotfiles](https://en.wikipedia.org/wiki/Hidden_file_and_hidden_directory) and the command line. Since I use a Mac, a lot of the instructions will be for OSX but the information will transfer easily to other operating systems.

Alright, let’s get to it!

## INSTALLATION

Let’s install [iTerm2](https://www.iterm2.com/) to replace the terminal that comes with Macs.

Then, let’s install [Vundle](https://github.com/VundleVim/Vundle.vim) (for installing vim plugins) and the [Powerline Fonts](https://github.com/powerline/fonts) (for making it look pretty)

```
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

```
git clone https://github.com/powerline/fonts.git ~/Downloads/fonts && ~/Downloads/fonts/install.sh
```

That’s it! now you can run the command `vim` and it should open up the text editor…

But it probably looks boring. So let’s make it awesome by changing the editing the .vimrc file.

## VIMRC

If it’s not there already, create a .vimrc file and open it

```
touch ~/.vimrc && vim ~/.vimrc
```

Let’s add some simple configurations

```
" Main Configuration
let mapleader="\<Space>"
syntax on
set shell=bash
set number
set hlsearch
set guifont=Menlo\ for\ Powerline
filetype off                  " required
filetype plugin indent on
```

These will add numbers, highlights, and other basics. Let’s add Vundle (our plugin manager) so we can add external plugins.

```
" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
call vundle#end()            
```

Now let’s add some useful plugins. To find more information about them, add github.com/ before it and look at the repo online.

```
" PLUGINS!!
Plugin 'terryma/vim-multiple-cursors'
Plugin 'Valloric/YouCompleteMe'
Plugin 'SirVer/ultisnips'
Plugin 'honza/vim-snippets'
Plugin 'scrooloose/nerdtree'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'altercation/vim-colors-solarized'
Plugin 'Lokaltog/powerline'
```

Remember to save and then run the following command to install our packages

```
:PluginInstall!
```

Here is a list of Vundle commands that I keep in my vimrc file for quick reference

```
" " Plugin Brief help
" " :PluginList       - lists configured plugins
" " :PluginInstall    - installs plugins; append `!` to update or just
" " :PluginUpdate
" " :PluginSearch foo - searches for foo; append `!` to refresh local cache
" " :PluginClean      - confirms removal of unused plugins; append `!` to
```

#### YCM and UltiSnips Snippets:

[You Complete Me](https://github.com/Valloric/YouCompleteMe) and [UltiSnips](https://github.com/SirVer/ultisnips) are two of the best add ons for snippets. You might be fine with just YCM, I added UltiSnips for some specific language snippet configurations. And like all vim plugins, we need to add configurations for it to use it properly

```
" Snippet configuration.
let g:UltiSnipsExpandTrigger="<s-enter>"
let g:UltiSnipsJumpForwardtrigger="<c-b>"
let g:UltiSnipsJumpBackwardTrigger="<c-z>"
let g:UltiSnipsEditSplit="vertical"
```

#### Aesthetic Themes

These are some configurations for colors ([Solarized](http://ethanschoonover.com/solarized)) and fonts ([Powerline](https://github.com/powerline/fonts)).

```
" Color Theme
syntax enable
colorscheme solarized
let g:solarized_termcolors = &t_Co
let g:solarized_termtrans = 1
let g:solarized_termcolors=256
let g:solarized_visibility = "high"
let g:solarized_contrast = "high"
set background=dark

" Font Theme
set guifont=Inconsolata\ for\ Powerline:h15
let g:Powerline_symbols = 'fancy'
set encoding=utf-8
set t_Co=256
set fillchars+=stl:\ ,stlnc:\
set term=xterm-256color
set termencoding=utf-8

if has("gui_running")
 let s:uname = system("uname")
 if s:uname == "Darwin\n"
  set guifont=Inconsolata\ for\ Powerline:h15
 endif
endif
```

#### Leader:

Previously, we set the mapleader to be the space bar. This allows for setting custom commands. Here are some examples of the shortcuts I’ve added to my vim profile

```
"Productivity
" allows for a quick escape out of insert mode
inoremap jj <ESC>
" quick save and write commands (again, the <leader> is the spacebar)
noremap <leader>s :w<CR>
nnoremap <leader>w :wq<CR>
nnoremap <leader>fq :q!<CR>
" redo
nnoremap <leader>u <C-r>
" remove highlights
nnoremap <leader>o :noh<CR>
" quickly go to .vimrc
nnoremap <leader>v :e $MYVIMRC<CR>
" go back
nnoremap <C-b> :b#<CR>
```

Lastly, add the following line to open [NERDTree](https://github.com/scrooloose/nerdtree) by default when you open vim.

```
autocmd VimEnter * NERDTree
```

Next time you open vim, it should look like other text editors you know and love.

## PERSONAL EXTRAS

There are so, so many more plugins and shortcuts that you can add to make vim better suited for you. Specially for the languages you use. If you ever find yourself typing the same command over and over and it seems a bit of a hassle, you can shorten it and make it easier.

Here are a few that I’ve added over time to [my vimrc file](https://github.com/berto/dotfiles/blob/master/.vimrc)

```
"No arrow keys
nnoremap   <up>   <nop>
nnoremap  <down>  <nop>
nnoremap  <left>  <nop>
nnoremap  <right> <nop>
inoremap   <up>   <nop>
inoremap  <down>  <nop>
inoremap  <left>  <nop>
inoremap  <right> <nop>

"Spell check
nnoremap <leader>sc :set spell spelllang=en_us<CR>
nnoremap <leader>so :set nospell<CR>

"Clipboard
nnoremap <leader>y :<C-u>exec 'normal ' . v:count1 . '"+yy'<CR>
vnoremap <leader>y "+y
nnoremap <leader>p :<C-u>exec 'normal ' . v:count1 . '"+p'<CR>
vnoremap <leader>p "+p
nnoremap <leader>d :<C-u>exec 'normal ' . v:count1 . '"+dd'<CR>
vnoremap <leader>d "+d 

"Moving lines
nnoremap <C-j> :m .+1<CR>
nnoremap <C-k> :m .-2<CR>

"Bottom bar settings
set noruler
set laststatus=2
set statusline=%<\ %f\ %m%y%=%-35.(Line:\ %l\ of\ %L,\ Col:\ %c%V\ (%P)%)
```

## NEXT STEPS

Use it! vimtutor is great for getting started with the language (just type `vimtutor` in your terminal to begin). I also like [Vim Adventures](http://vim-adventures.com/) for a more entertaining way of learning vim. Also, look into [Vim Awesome](http://vimawesome.com/) for the best plugins to get.

![gopher](img/gopher4.png)
