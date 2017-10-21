## Hello

Thanks for signing up.  I can't promise this is going to be wildly successful but I can tell you there is plenty of money to be made and we'll have fun exploring new ways to make it together.

I had the idea for this originally as I have been taking contract jobs for the last few years now and the biggest pain point has always been creating invoices and setting up ways of getting paid.  When dealing with smaller customers it's usually not even worth all of the hassle to ask for a payment when they just want a small amount of help.

The idea here is that the payment is already waiting for the work, it's already been paid for and by performing the work you actually unlock the payment.  It goes straight to your own personal wallet and you can do whatever you please with it (preferably move it to an exchange for your preferrred currency or hodl it!)

## What is it

You sign up for the site and only need to enter your personal information and the name of the business entity you are operating on behalf of.  This is required because all contracts are considered business to business therefore no income laws will be violated.  The first thing you'll do is create a personal and/or company wallet to receive payments at.  We'll call this your ATB wallet.

There is a listing of work items that can be picked up by anyone.  There is a dollar amount already on the listing.  This is how much money *has already been bountied on this work item*.  You choose items that you want to work on from this list.  It's important to note you should only choose to work on listings that aren't being worked on already by others and ones that you can successfully implement.  That means if the listing doesn't have enough detail you should ping the creator that you'd like to work on it but the details are specific enough.

When it comes to how the work will be performed it's up to you to decide the implementation details but important to know the guidelines of the project to make sure your work will be approved.  This means setting your own hours and completing items on your own time, however keep in mind if the work hasn't been completed it's possible someone else might pick up your listing and work on it.

Once you finish you simply click on a button to "Request Payment" for the work item.  When you do this you'll enter a link (ex. GitHub Pull Request, closed Trello item, signed Docusign doc, etc...) that points to where your work can be verified.  Once the company that requested the work and paid up front for the bounty approves your work it will be instantly transferred to your personal ATB wallet.  Then it is up to you to remove those funds as quickly as possible. (Aurelia Toolbox is not meant to be an financial institution and just acts as an intermediary)

If you find an item you'd like to have someone else work on you can do the same by creating listings.

## What kind of work

Initially all of the work items will be entered and paid by me (Patrick Walters, Aurelia Toolbox, LLC.) directly out of my company funds.  These items include various tasks such as writing documentation for Aurelia, fixing open bugs / issues, and improving the Aurelia Toolbox platform.  For that reason the bounties won't be extremely high, but should be fair.

We've already secured an alpha testing client who is putting up $3,500 on to the platform initially.  This is a group of lawyers working on a project with Aurelia to change the way contract law is done.  Should you choose to work on these next items they should be available within the next 5-10 days in the system.  The only upfront requirement is signing an Non-Disclosure Agreement.

The core Aurelia team receives more requests than can currently be handled so the idea is for more work to continue to funnel in to the platform.

## Getting started

1. Create an account on an exchange that allows buying / selling Litecoin (I use Coinbase.com in the US but there are many other alternatives such as Kraken, GDAX, etc...)  This should be an exchange that you can transfer Litecoin into your own currency so choose wisely!
2. Visit Aureliatoolbox.com and Register (use your google account for now if you can, or create one.  Github has a redirect issue on the production site at the moment)
3. Once logged in, visit the Account page.  Setup the company you are doing business as and request a new wallet for your user.  This creates an application-specific wallet that your payments / bounties will go to.
4. Pick a dev task from the Listings page.  Complete it and request a payment from the listings page.  Add a link to what is showing the task completed.

After it is reviewed and approved the Litecoin will be immediately transferred to your wallet.

## Developing against the platform

To actually develop against the platform you'll need to do *at least* the things listed below (I'll start creating documentation soon!) -

1. Install (and be able to run) Ruby on Rails
2. Install mongodb locally
3. Request a secret test key for block.io

## Next steps

Feel free to check out the available listings and if anything looks interesting, tackle it.

If you want to work on tasks related to the platform - right now the wallet service I am using is block.io.  After talking with the litecoin dev team this week I've found that that service is a great service but that the block.io is completely unresponsive and it is best to avoid their service.

I'm going to start doing some research tonight as to whether Coinbase's wallet APIs or some other service would be better to switch to.  The good thing is the plumbing is all in place so it's basically switching out the backend services.

## Architecture overview

```
- app - the RoR app
- build - the Aurelia build tasks
- client - client source code
- config - RoR config folder
- db - unused
- docs - wip documentation
- public - where the dist and jspm_packages are located / installed
- spec - ror tests
- test - client-side tests

```