1. Added Google analytics script tag to head of `index.html`. The script tag contents are the following: 

```
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VKRN8VQCLK"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-VKRN8VQCLK');
    </script>
```

- Google analytics gives me some helpful insights regarding the traffic I get on my website. It lets me see how many visitors I'm getting, where they are geographically, and also what sort of devices they are using to acces my site. It also gives some demographic insights as well about the visitors to the site. Realtime engagement metrics and events are available as well. These insights can help me make some decisions about the contents of my site, demographics I can try appealing to, and maybe also help me choose platforms I can focus on more. For instance, if a significant portion of visitors are on mobile, I may want to spend more time on the mobile UI and such. 

<br>


2. I added the functionality for my 'email me' contact form. It uses the 'mailto' function to open up the users default mail app.
(On Windows this is the 'Mail' app.) I used javascript in the `contact.js` file to pull the user input from the Subject 
and message body input/textarea fields and automatically fill them in the users mail app with these values by inserting them into
the mailto string. Please note that popup blocking may need to be disabled for the mail app window to display. Also performs
a check to ensure user doesn't send empty mesage by emitting an alert if the user tries to. 

- Note: On Windows if the user isn't signed in on the 'Mail' app, it will be blank so they need to be signed in. 


<br>

3. 
- Added more media queries to adjust the sizing of my video/image on the passion projects page. Also added some box shadows,
and some borders to make the images/accompanying text look more polished. 
- Adjusted size of contact form textarea to better fit page on small screens. Also made submit button larger for ease.