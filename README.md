# Fluid-email
Mobile-first email resolutions with scss.

## Process
1. Write you css/sass   
2. Bring your css inline (recommend [inliner.cm](http://inliner.cm/))   
3. Test your email at [Litmus](https://litmus.com/) or [campaignmonitor.com](https://www.campaignmonitor.com/)   

## Install
Download [Fluid-email](https://github.com/ganlanyuan/fluid-email/archive/master.zip) or install with [Bower](http://bower.io/): 
````
$ bower install rocket
````
Or install with [git](http://www.git-scm.com/):
````
$ git clone https://github.com/ganlanyuan/fluid-email.git
````

## Usage
**Basic structure:**   
We have a `container`to constrain the main content on bigger screen, but since Lotus Notes 8 & Outlook don't support `max-width`, we need add a conditional wherever we have a `container`.
```` html
<table class="body">
  <tr>
    <td>
      <!--[if (gte mso 9)|(IE)]> <table width="650" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]-->
      <table class="container">
        <tr>
          <td>
            <!-- Your content goes here -->
          </td>
        </tr>
      </table>
      <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->
    </td>
  </tr>
</table>
````

## Thanks and reference
<http://jackosborne.com/articles/responsive-email-design/>   
<http://blog.fogcreek.com/responsive-html-emails-a-different-strategy/>   
<https://www.campaignmonitor.com/guides/mobile/>   
