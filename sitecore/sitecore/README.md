# 🎛 Sitecore

<details>

<summary>Transcript</summary>

![](<../../.gitbook/assets/image (1) (1).png>)Sowa, Bill10:05 AM

Yep.

- Yep, absolutely.
- Right. So in Jsspublic we have the contents of the content pages, so you've got for each section home, business. And then since this is a development environment, there's a bunch of additional Sections or pages that we created in here just to like just for testing, but in the production environment you wouldn't see a lot of this testing stuff you'd have basically, you're like your main sections of the site so.
- Uh, you know, let's do. Let's see prod.
- Or no. Let's do that. Seat dev. So this would be the slash home.
- So when you go to the slash home page.
- This is the content. The images don't seem to be.
- A lot of the images around not showing up here but.
- You kind of get the idea, but here here's the homepage.
- Do you have something, Spencer?
-

```
* Pope, Spencer O10:06 AMYes. So the structure of.
```

```
* The items in that content tree.
* Corresponds to.
* The URL structure.
* ![Profile picture of Sowa, Bill.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:526113cf-3ef9-4121-a6d5-22d958afe21f/profilepicturev2?displayname=Sowa%2C%20Bill\&size=HR64x64) Sowa, Bill10:06 AMYep.
* Yeah, it's a little.
* ![Profile picture of Pope, Spencer O.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:68a2b934-5d11-4331-a782-a4acfb6a2f66/profilepicturev2?displayname=Pope%2C%20Spencer%20O\&size=HR64x64)Pope, Spencer O10:06 AMSo.
* ![Profile picture of Sowa, Bill.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:526113cf-3ef9-4121-a6d5-22d958afe21f/profilepicturev2?displayname=Sowa%2C%20Bill\&size=HR64x64)Sowa, Bill10:06 AMUsing because we have two homes.
* But home is essentially the.
* The main.
* Ah.
* Content item and within that, so this would be like the slash home. This would be slash business.
* Etc. So if we want to.
* Slash Joey test.
* Well.
* Maybe that was not published.

\\
```

\*

- \
  Approve it and publish it, so it's in this like draft saves draft state right now.
- So if I go to review.
- And approved.
- It's like there's something wrong of an application title.
- So if I look at the page here.
- Here it's telling me that I did navigation title.
- OK, so I'm going to save that.
- And then I'm going to approve.
- And then I'm going to publish.
- So I go to publish and then publish and then publish item.
- Then it's gonna.
- Come up with the box here eventually too.
-

```
*
```

```
* \
  Overview session.
* See if that worked there. It is. OK, so now we have a new page.
* Better title.
* Uh, I can see the route there. That's that matches what we have in the CNS. So now I'm going to just add a component here.
* So there's a couple different ways you can do this.
* Yes. Uh.
* I suppose I'll start with the experience editor. If it works in the development environments, it's pretty slow.
* So, but I'll give it a shot. So basically the the experience editor is the like the WYSIWYG.
* Which is the like a.
* It's like a user friendly like.
* Uhm.
* Interface for like adding components to the page, so it's supposed to like.
* Mimic you know what the page looks like. Then you can add components and it would show like what that component would look like and you can edit the component. So we'll go ahead and give that a shot.
* And if I can remember how to get to it.
* Yeah. OK.
* Experience editor.
*
  * \
    So all of these components have an equivalent component that exists in our application.
  * Uh. In the react application?
  * Uh, so you know when we.
  * We added one of these components to the page and we'll see what we'll see. You know what it looks like you know, in Sitecore, Sitecore says this is the page. These are components that exist on the page.
  * And then uh, our application will.
  * You know, get that information and render it so all these components are represented within our application as well. So let's.
  * Do a.
  * I guess I'll do a call to action.
  * Pretty simple.
  * I'm going to add it to the JSS public main placeholder and I will look at that as well. Like what that means. The placeholder means as well.
  * In a moment.
  * ![Profile picture of Pope, Spencer O.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:68a2b934-5d11-4331-a782-a4acfb6a2f66/profilepicturev2?displayname=Pope%2C%20Spencer%20O\&size=HR64x64)Pope, Spencer O10:20 AMThen it's nice just to check that little open properties dialog box immediately.
  * It's nice to check that that way you don't have to.
  * You know, go back and open it manually.
  *
    * \
      Alright. Can somebody else jump in to the this this EMS here and take over and then just kind of show like?
    * You'll get this. Get this published and then show the relationship between.
    * This is in the layout service and then our app intercepts it and then maybe like.
    * If there's time making update too.
    * The component and.
    * I don't know.
    * However you see fit just to kind of show like the the relationship between Sitecore and our application.
    * ![Profile picture of Pope, Spencer O.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:68a2b934-5d11-4331-a782-a4acfb6a2f66/profilepicturev2?displayname=Pope%2C%20Spencer%20O\&size=HR64x64)Pope, Spencer O10:33 AMYeah, I can do that.
    * ![Profile picture of Sowa, Bill.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:526113cf-3ef9-4121-a6d5-22d958afe21f/profilepicturev2?displayname=Sowa%2C%20Bill\&size=HR64x64)Sowa, Bill10:33 AMCool.
    * ![Profile picture of Pope, Spencer O.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:68a2b934-5d11-4331-a782-a4acfb6a2f66/profilepicturev2?displayname=Pope%2C%20Spencer%20O\&size=HR64x64)Pope, Spencer O10:33 AMCan you give me a?
    * Where did it? Can you give me write access to the terminal in that shared?
    * ![Profile picture of Sowa, Bill.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:526113cf-3ef9-4121-a6d5-22d958afe21f/profilepicturev2?displayname=Sowa%2C%20Bill\&size=HR64x64)Sowa, Bill10:33 AMYes.
    * ![Profile picture of Pope, Spencer O.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:68a2b934-5d11-4331-a782-a4acfb6a2f66/profilepicturev2?displayname=Pope%2C%20Spencer%20O\&size=HR64x64)Pope, Spencer O10:33 AMSession.
    * ![Profile picture of Sowa, Bill.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:526113cf-3ef9-4121-a6d5-22d958afe21f/profilepicturev2?displayname=Sowa%2C%20Bill\&size=HR64x64)Sowa, Bill10:33 AMSo I wanted to get everybody in the shared just because.
    * I was like, oh, this might be a good opportunity to maybe get some some traction on using this tool because it's pretty cool for like collaboration.
    * Uhm.
    * K So it should be a.
    * Right now it should have write access.
  *

      * \
        Uh.
      * Trying to think back.
      * Like how to create like a a template for that component.
      * Within the CNS, so like.
      * How to how to how to create that component so that it's represented in the center?
      * Uh, you know, set up like what should be configurable for that component.
      * Uhm.
      * In this EMS and then you know like going through and.
      * Adding it to a page and then like what it looks like to, you know, actually developed that like, you know, understand what that data like this is going to look like for your component like when you build it on the react side. So it's you know it's it's a little.
      * Uh, it's a it's a it's a, it's a bit involved. It can be a bit involved because kind of like those two sides have to talk to each other, you have to understand like, what that what that data is going to look like. I mean you can start, you can start building out the component, of course without that data and just not have it render the day. That just kind of build it out in Storybook.
      * While you know that's being set up on the Sitecore side and then you can get your, you know what your what your data is going to look like coming from Sitecore and then plug that in. But that that that could be like a whole other.
      * Session I think.
      * Appreciate you.
      * Jump in and Spencer.
      * ![Profile picture of Pope, Spencer O.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:68a2b934-5d11-4331-a782-a4acfb6a2f66/profilepicturev2?displayname=Pope%2C%20Spencer%20O\&size=HR64x64)Pope, Spencer O11:00 AMWell, I'll be honest, I was floundering. I didn't know. I didn't know what I should talk about.
      *

          * \
            Or whatever environment the the issue is occurring in.
          * ![Profile picture of Sowa, Bill.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:526113cf-3ef9-4121-a6d5-22d958afe21f/profilepicturev2?displayname=Sowa%2C%20Bill\&size=HR64x64)Sowa, Bill11:06 AMDoes that make sense to everyone?
          * Basically, you can you can grab whatever.
          * You know, data from whatever environment and you want.
          * So right now we're getting it from art from what we're just the environment. We're just looking at that dev environment.
          * You could also grab it from the test environment, from QA from production.
          * Uh, because the?
          * You know the data might be.
          * Uhm.
          * Might be different in the in the different environments. So like our, our development environment might not always be up to put In Sync with what's in production. I mean it, it won't be.
          * You know.
          * More often than not, it will not be so.
          * Uh, if you want to have like, the the most.
          * If you want to see like if you want to develop against like, what's in actually actually in production, then you can. You can change that layout host to to the production.
          * Uhm. Environment.
          * ![Profile picture of Pope, Spencer O.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:68a2b934-5d11-4331-a782-a4acfb6a2f66/profilepicturev2?displayname=Pope%2C%20Spencer%20O\&size=HR64x64)Pope, Spencer O11:07 AMYeah, like if someone said, oh, there's an error on this page.
          * Probably wanna.
          * Point that layout host to this environment so that you can most precisely recreate that error.
          * ![](<../../.gitbook/assets/image (1).png>)Sowa, Bill11:07 AMSo.
          * Yeah. So, thanks again, Spencer. I need to drop again, but we appreciate it. I think that's that's probably good unless there's any additional any or any questions that anybody has.
          * But we can kind of let folks ruminate on this a bit and then come back in another in another meeting and.
          * Uh answer questions or just go ahead and drop questions here in the chat as they come up.
          * ![Profile picture of Guest, James.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:735da700-6bad-4bae-9adb-c780cc53cf12/profilepicturev2?displayname=Guest%2C%20James\&size=HR64x64)Guest, James11:08 AMYeah.
          * Thank you guys. Probably just takes getting our feet wet.
          * ![Profile picture of Sowa, Bill.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:526113cf-3ef9-4121-a6d5-22d958afe21f/profilepicturev2?displayname=Sowa%2C%20Bill\&size=HR64x64)Sowa, Bill11:08 AMYeah, for sure.
          * Alright. Thanks guys. Talk to you later.
          * ![Profile picture of Macias, Marcie.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:bc34fee8-4bb2-48d6-92fa-569dbc0ee245/profilepicturev2?displayname=Macias%2C%20Marcie\&size=HR64x64)Macias, Marcie11:08 AMI think you.
          * ![Profile picture of Guner, Bryan.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:07f93a93-4edd-45c2-817e-b3c14d770992/profilepicturev2?displayname=Guner%2C%20Bryan\&size=HR64x64)Guner, Bryan11:08 AMThanks.
          * ![Profile picture of Evanoff, Matthew.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:3f7c56de-3459-45cd-ad5c-d1f1e1aaeb74/profilepicturev2?displayname=Evanoff%2C%20Matthew\&size=HR64x64)Evanoff, Matthew11:08 AMHere.
          * ![Profile picture of Pope, Spencer O.](https:
//teams.microsoft.com/api/mt/part/amer-02/beta/users/8:orgid:68a2b934-5d11-4331-a782-a4acfb6a2f66/profilepicturev2?displayname=Pope%2C%20Spencer%20O\&size=HR64x64)Pope, Spencer O11:08 AMAlright, later.

          \\

      \\

\\
```

</details>

<details>

<summary>Word Doc</summary>

Sitecore FED

Explains the steps involved in getting a new FED developer up and running using the new SSSD system and SVN.

**1 Server Information Page**

Before you start, access the following URL:

\[_http: //sssd.duke-energy.com/_]\(http: //sssd.duke-energy.com)

This will display an informational page about all the SSSD servers and your website.

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image001.png)

The first thing to do is locate your LAN Id in the "AppPool Name" column. Your AppPool is the same name as your LAN Id. In this example, my LAN Id is "jbartel".

Also on that line, you will find your Server Name (WADCSSSDD01 - you will need this to access your share directory), your Application Pool Name (jbartel), your Process ID (you will need this in order to debug your application from within Visual Studio), your website URLs (sssd1-p1.duke-energy.com - you will need these to access your website), the Current State of your Application Pool (Started/Stopped), and an Execute button (allows you to restart/start your own AppPool).

**2 Initial Setup**

A website will have already been setup for you to use (commonly referred to as an SSSD - Sitecore Server Side Development server). Your websites are NOT Sitecore based hence there are not any databases or Sitecore related files. Initially your website is empty (blank). If you access your website before building/publishing, you will get this error:

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image002.png)

That is normal since there is not any website files. The next step is to get your local machine/computer setup so you can access the Visual Studio project and get your website build.

**Before you install any local applications, you will need to have the appropriate access allowing you to install to your computer or virtual desktop. You must contact the Help Desk in order to get this access.**

**3 Getting the Solution (SVN)**

The first step is getting a local copy of the solution to your computer. All of the solutions are stored in the SVN (Subversion) under the "feature-branches" folder. There will be many different versions so make sure you are grabbing the correct one. For example, this is what you may see when viewing the Feature Branch in the SVN:

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image003.png)

All FED related solutions end with the node "-Foundation". To checkout a branch, just highlight the branch you want, right click, and select Checkout.

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image004.png)

You will be prompted where to put the files on your local computer. It is advised that you create a directory called "SVN" in the root of your local computer (C Drive). Then for each checkout, create a directory under the SVN directory specific to that branch (for example Public-v0.50-Foundation). In the Checkout dialog box, select that folder and click Ok.

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image005.png)

This will begin the process of copying all the files to your local machine and maintaining source code control. Once that is completed, you will now have all the files from the source code repository for that particular iteration locally on your computer. This directory is where ALL our work will be performed. As you make changes, the status of the directory will change showing that files have changed (red/green icons).

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image006.png)

To commit or update your files, select the Public-v0.50-Foundation directory and right click. All the options you need are located in the menu.

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image007.png)

SVN can be a bit tricky but once you have done it a few times, you will find it very simple to use.

One concept that you MUST understand is that ALL the developers are using the same iteration branch. For example, when working on POC, all the developers will create a local copy of that branch to their local computer. You will all be making changes to the same files. It is important that you Update your files often and also that you commit your changes often. This will minimize the number of file conflicts.

We are now using a version numbering scheme. It is important to make sure that you only make changes to the a version that matches the matching code version branch. Changes to the Foundation must match the corresponding Public or Authenticated code release.

If you need to create a new version, just contact us and we will create a new Feature Branch.

**4 Local Tools Setup**

There are few tools that need to be installed locally in order to facilitate the use of Visual Studio and the publishing of the solution to your SSSD website.

**4.1 Node.js**

Node.js is required for the use of some of the tools. You can go to their website (\[https: //nodejs.org]\(https: //nodejs.org)) and download the Windows .exe installer. You should coordinate with your team and use the same versions across all team members.

Once installed, you will have access to the NPM (NodeJS Package Manager).

**4.2 NPM Install**

Next step is to install NPM globally on your machine (this should update your Path so you can execute the "npm" in any command window. Open up the NodeJS command prompt and enter the following:

**npm install npm -g**

You may get some signing issues (depends on the version of NodeJS you installed). If you get those types of errors, issue the following command in the NodeJS command prompt:

**npm config set strict-ssl false**

Then try installing NPM again.

**4.3 Grunt**

Next you need to install Grunt. From the NodeJS command prompt, enter the following command:

**npm install grunt-cli -g**

This will install grunt globally as well.

**4.4 Ruby**

Ruby is a programming language that is required in order to run SASS. Download Ruby from the Ruby website (\[https: //www.ruby-lang.org]\(https: //www.ruby-lang.org)). Again, make sure you get the correct version. All team members should be running the same versions of the software.

Once installed, you will be able to install SASS.

**4.5 SASS**

SASS stands for Syntactically Awesome Style Sheets. To install SASS, open Ruby command prompt and enter:

**gem install sass**

Most likely you will get an error. These are proxy errors. To get around this issue, you will need to download the SASS gem file locally. Download the gem file from the Ruby Gems website (\[https: //rubygems.org/]\(https: //rubygems.org)). On the website, click Gems and find the correct SASS gem file.

Once you have the file, place it in the Ruby root directory on your computer (for instance, c:\ruby22). Then from the Ruby command prompt, enter the command:

**gem install c:\ruby22\gemfile.gem**

Note that the directory and file name may be different. What you are doing is installing SASS from the local gem file vs. trying to access the gem file from the website thus bypassing the proxy call.

**5 Visual Studio Setup**

Getting VS setup is the most time consuming step when setting up a new developer. Here are the steps to follow in order to get your solution working.

**5.1 Install Visual Studio**

You should be using VS 2013 Pro Update 3. Just install and take the default values. This process can take about 90 minutes to complete. This install is very straight forward. We have not had any issues with installing the application.

**5.2 Visual Studio Add-ons**

There are a number of Visual Studio Add-on programs that need to be installed before you can begin working with the solution. From within Visual Studio, select Tools | Extensions and Updates to install.

**5.2.1 Task Runner Explorer**

Installing this extension will allow the publish of the website to execute Grunt tasks from with Visual Studio.

**5.2.2 Grunt Launcher**

Installing this extension will allow Grunt tasks to be launched from with Visual Studio. This may no longer be necessary with the inclusion of Task Runner Explorer as most task will automatically be run when the solution is built.

**5.2.3 Node.JS 1.1 for VS 2013**

Not required but makes Visual Studio aware of the Node.js application for intellisense, etc. It is more of a helpful tool if needed but not necessarily required.

**5.3 Local NPM Install**

Before you open your solution for the first time, there is one step that needs to be performed.

Using the NodeJS command prompt, switch to the directory where your packages.json is located. Once in that directory, issue the following command:

**npm install**

This will build all the dependencies locally that are required by your local solution. Failing to perform this step will cause the build to fail.

**5.4 Opening the Solution**

Once the solution is on your local machine, open up VS and then open the solution file. We need to ensure that the Grunt tasks are setup for the solution.

In the Solution Explorer, right click on the gruntfile.js and select Task Runner Explorer.

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image008.png)

We want to ensure that the four (4) grunt tasks:

· ngAnnotate

· uglify

· sass

· cssmin

are setup to run BEFORE the build. From the Task Runner dialog, right click on each of the tasks and add it to Before Build binding.

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image009.png)

Once completed, the dialog should show the following:

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image010.png)

All the bindings are setup. When you build and/or publish the solution, all four (4) of these tasks will automatically be run.

**5.5 Build the Solution**

Up to this point, you should not have made any changes to any files in your local Subversion directory that could be committed to the SVN. If everything has been setup correctly, you should be able to build the application (not publish).

Press Cntl-Shft-B or right-click the solution and select Build. You may get errors and will need to resolve them. This will only do a build and NOT place your solution in your SSSD website.

Once you are confident that everything is good, you can publish to your SSSD. The easiest way to publish is to add the Web One Click Publish toolbar. Right click on the toolbar (not menu) and from the popup, select Web Once Click Publish:

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image011.png)

Now on your toolbar, you should see a publishing option. Select the option for YOUR SSSD and click the publish button:

!\[]\(file: ///Users/BGuner/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image012.png)

If it completes successfully, you should be able to open a browser and go to your SSSD website.

**6 Developer Summary**

Server Information Page\
Contains the server name, app pool name, process id, url(s), and status for YOUR website listed for YOUR LAN Id (the app pool is the same as your LAN Id). You can access that page here:

http: //sssd.duke-energy.com/

Website File Share:\
\\\ \<server name> \\\<your lanid>

Get the server name from the Server Information Page.

Website:\
\[_http: //sssdX-pY.duke-energy.com_]\(http: //sssdx-py.duke-energy.com)\
\\

X will be the server number and Y will be an assigned number 0-9. To get YOUR URLs, refer to the Server Information page. Find you App Pool and it will list your URLs.

</details>

{% embed url="https://dukeenergy-my.sharepoint.com/:v:/g/personal/mahjabin_rubaiyat_duke-energy_com/EffW6aN6OFFDhiTBWqwYaRkBDX5FVD9wNwrZ2EXRonjigg" %}
