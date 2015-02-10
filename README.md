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
**Basic structure**   
We have a `container`to constrain the main content on bigger screen, but since Lotus Notes 8 & Outlook don't support `max-width`, we need add a conditional wherever we have a `container`. You can change the `container` width in setting.scss. 
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
**Settings**   
Before start using the grid, you need set up some basic setting in setting.scss.
```` sass
$container: 650px;
$columns: 12;
$gutter: 20px;
$gallery-gutter: 20px;
$breakpoint: 600; // 600px: grids start work
````
**Grid**  
```` sass
@include col($col, $cols: $columns, $gt: $gutter, $last: false, $bp: $breakpoint);
$col: num // column
$cols (optional): num // columns
$gt (optional): px // $gutter
$last (optional): false | true // last column
$bp (optional): num // breakpoint for grid works
````

**Sub-grid**  
```` sass
````

**Gallery**  
```` sass
````

**Button**  
```` sass
````

**Breakpoint**  
```` sass
````

## Thanks and reference
<http://jackosborne.com/articles/responsive-email-design/>   
<http://blog.fogcreek.com/responsive-html-emails-a-different-strategy/>   
<https://www.campaignmonitor.com/guides/mobile/>   
