Thank you for the opportunity to complete this coding challenge. I could've gotten carried away making this really pretty but felt that was beyond what was necessary to show how the app was working 

I've used Next.js, Node Express, and MonogDB.

I chose not to use tailwind css and instead I put styling in globals.css.

On the press of the submit button at the end of the form, the reponse is sent to my MongoDB. I have the uri linked written as a string in server.js. This is not good, but I'm not using auth for anything and this was just a test DB that I spun up.

The buttons on the top just redirect you to the /admin, /data, and / for the back button in /data.

As the user progresses through the flow, the buttons react and there's a progress bar that shows where the user is

If you attempt to select zero form fields for either page 2 or 3 of the form flow, the button will become disabled. If you try to select the same field on both pages, it will uncheck the box for the other page.

If you leave the app and come back, granting that you hadn't stopped the dev server, it will remember what fields were filled out. This is infact done with local storage. One of the steps in the prompt mentions do not use local storage pertaining to a back end, and I've implemented a back end section. I hope this is congruent with the instructions.

I've added a createdAt field to the form data that is sent to the DB for sorting if needed.