strider-cli
===========

CLI for Strider

[![NPM](https://nodei.co/npm/strider-cli.png)](https://nodei.co/npm/strider-cli/)

## Available Options


```no-highlight
Usage: node strider [command] [options]

command
  addUser       Create a Strider user
  restart       Restart strider (touch .strider)
  list          List local plugins. Use --all to fetch all.
  install       Install a plugin from the ecosystem.
  uninstall     Uninstall a plugin
  upgrade       Replace a plugin with the the latest version
  init          Initialize a new plugin for development
  runTest       Run a test and optionally deploy

Options:
   -v, --version       Print version and exit
   -m, --plugin_path   Specify path to plugins (defaults to node_modules)
```

## Command Descriptions and options

### addUser

Create a Strider user

```
Options:
  -l User's email address
  -p User's password
  -a Specify if this is an admin (flag) (default: false)
  -f Force create user, overwrites previous user with the same email address (flag) (default: false)
```

### restart

Restart strider (touch .strider)

### list

Include remote plugins available for install

```
Options:
  -a Include remote plugins available for install
```

### install

Install a plugin from the ecosystem.

i.e. `$ strider install plugin-name`

### uninstall

Uninstall a plugin

i.e. `$ strider uninstall plugin-name`

### upgrade

Replace a plugin with the the latest version

i.e. `$ strider upgrade plugin-name`

### init

Initialize a new plugin for development

### runTest

Run a test and optionally deploy

```
Options:
  -l User's email address
  -p User's password
  -j Project name (include organization name i.e. org/repo-name)
  -b Branch name (default: master)
  -m Job message (optional)
  -d Deploy on green (optional) (flag)
```
