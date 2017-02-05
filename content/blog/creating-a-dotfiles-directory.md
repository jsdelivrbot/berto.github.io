+++
date = "2016-08-27T22:40:54-07:00"
title = "Creating a Dotfiles Directory"

+++

Not too complicated but highly useful. The purpose of doing this is to save your system configurations and host them somewhere. I have my [dotfiles](https://github.com/berto/dotfiles) on github to share with the public, store them in a safe place, and to easily transfer them to other environments like my ubuntu server.

Start by creating a directory anywhere you want, inside your `projects` or `$HOME` directory. Then, copy all your dotfiles (.bashrc, .bash_profile, .vimrc, .gitconfig…) inside your new `dotfiles` directory. I leave my `.profile` for private configurations.

## SYMLINKING THE FILES

After adding all your desired dotfiles, it is time to link them to your `$HOME` directory. This will replace the files with a symlink to the files inside the directory.

To do this, add a bash script. Inside the `dotfiles` directory, create a `symlink-dotfiles` file and add

```
#!/bin/bash

DOTFILES=(.gitconfig .gitignore .zshrc .vimrc .aliases)

#Remove old dotfiles and replace them
for dotfile in $(echo ${DOTFILES[*]});
do
    sudo rm -rf ~/$(echo $dotfile)
    ln -s ~/dotfiles/$(echo $dotfile) ~/$(echo $dotfile)
done
```

The script loops through the your desired files, removes them from home, and adds the symlink.

Run it with with bash

```
bash symlink-dotfiles
```

## THAT’S IT!

![gopher](/img/gopher3.png)
