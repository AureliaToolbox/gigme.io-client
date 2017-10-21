# Vagrant

We use Vagrant to provision a development environment so that the platform can be worked on across various operating systems (I'm looking at you Windows)

To start with Vagrant, from the root directory of this project after cloning -

## Pre-requisites

1. Install [Vagrant](https://www.vagrantup.com/downloads.html)
2. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)

## Bring up the Vagrant box

```
$ cd {{path to root of where you git cloned this repo}}
$ vagrant up
```

The first time you run `vagrant up` it will take a while to download the Ubuntu box and provision it.  This is normal.

With Vagrant you typically don't want to blow out your images all of the time unless it's really screwed up.  This is a better dev experience.

## Setting up the VM

Now that the Virtual Machine has been provisioned and brought up by Vagrant we need to add configuration to it so the Rails app runs correctly.

```
$ vagrant ssh
$ vim ~/.bashrc
```

When the editor is open make sure to be in edit mode and paste the following in at the bottom of the file -

```
export block_io_litecoin_apikey={{your block.io testnet apikey goes here}}
export block_io_pin={{your block.io pin goes here}}

export GITHUB_SECRET_ID="{{DEV SECRET}}"
export GITHUB_SECRET_APP="{{DEV APP}}"

export GOOGLE_CLIENT_ID="{{DEV GOOGLE CLIENT}}"
export GOOGLE_CLIENT_SECRET="{{DEV GOOGLE SECRET}}"
```

Save this file and source ~/.bashrc again so the environment variables reload -

```
$ source ~/.bashrc
```

Now the environment variables are in place to at least allow logins in against GitHub.

## Installing Ruby / Rails / other dev dependencies

Next we need to get all of the development environment set up.  All of the files in the directory where we created

```
$ cd /vagrant
$ ./vagrant-provision.sh
```

This script will run through and keep trying to install all of the dependencies.  If it fails, you can try to run it again, sometimes this will work.

Max number of retries should be 5, if it doesn't work by then it's probably not going to.

If it is failing for not finding rbenv you can source `~/.bashrc` again before running a second time.

```
$ source ~/.bashrc
```

## Add sample data

There are a few small things we need to add to the database.  We can do this with a `rake` command

```
$ rake seed:create
```

## Setting up client-side

We can run Aurelia directly on our dev machine and vagrant will sync those files in to the VM to be served.

First install all of the dependencies -

```
$ npm install
$ jspm install
```

Then just `gulp watch` for changes.


# Non-vagrant installation


## Install the following in your local development environment -

0. Ruby (version 2.3.1) - Most use a tool called RVM which is Ruby Version Manager for managing the ruby installations.  You can install RVM first and then use it to install a specific version of Ruby.
1. Ruby on Rails (version 4.1.5 is what we are currently locked in the `Gemfile`)
2. Nodejs (LTS)
3. MongoDb - [OSX Instructions](https://docs.mongodb.com/master/tutorial/install-mongodb-on-os-x/?_ga=2.92839444.86106005.1504058999-1213989326.1504058999)
4. Make sure you have NPM and JSPM installed

## Getting the app up and running

### Install ruby on rails build tooling
```

$ git clone https://github.com/PWKad/aureliatoolbox.git
$ ruby -v # should print a ruby version
$ rails -v # should print a rails version
$ gem install bundler # install bundler, the ror package manager
$ bundle -v # should print a bundler version
$ gem install unicorn # used to run rails app
$ unicorn -v # should print a unicorn version
```

### Run the rails app
```
$ unicorn -p 3000 # run the app on localhost:3000
```

### Install client-side dependencies and run app
```
$ npm install jspm -g
$ npm install gulp -g
$ npm install
$ jspm install
```

### Run the Aurelia application
```
$ gulp watch
```

## Setup local environment variables

1. Request the client id and secret for local development oauth app, or create your own if you'd like!
2. Create a block.io account for local development (the pins cannot be shared at all so testing transactions requires some of your own coins you can earn by joining and knockout out an easy listing)
3. Set environment variables in a new file in the root named `.env.local`

ex -
```
block_io_litecoin_apikey={{your block.io testnet api goes here}}
block_io_pin={{your block.io pin goes here}}
```

## Create a user

You should be able to visit `localhost:3000` now to view the app running

Click on register or sign up in the top right of the homepage and choose GitHub Oauth

## Create a wallet

If you visit the account page on the left hand menu you should be able to add a wallet and company

Click request new wallet to create a wallet.  This creates a wallet on your block.io account and a corresponding Wallet in the mongodb to tracker user <--> wallet

## Add a company

To verify the company was created properly you can run the following commands from root -

```
$ rails c # run the rails interactive console
# once console loads
$ Company.last # should report out a company, not nil
```
