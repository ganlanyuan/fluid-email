# Fluid-email
Mobile-first email framework build with scss.
[demo](http://designdev.christianpost.com/develop/fluid-email/docs/demo.html)  

## Process
1. Write you css/sass   
2. Bring your css inline (recommend [mailermailer inliner tool](http://www.mailermailer.com/labs/tools/magic-css-inliner-tool.rwp))   
3. Test your email at [Litmus](https://litmus.com/) or [campaignmonitor.com](https://www.campaignmonitor.com/)   

## Install
Download [Fluid-email](https://github.com/ganlanyuan/fluid-email/archive/master.zip) or install with [Bower](http://bower.io/): 
````
$ bower install fluid-email
````
Or install with [git](http://www.git-scm.com/):
````
$ git clone https://github.com/ganlanyuan/fluid-email.git
````

## Usage
**Basic structure**   
We use `container`to constrain the main content on bigger screen, but since Lotus Notes 8 & Outlook don't support `max-width`, we need add a conditional wherever we use `container`. You can change the `container` width in setting.scss. 
```` html
<table class="body">
  <tr>
    <td>
      <!--[if (gte mso 9)|(IE)]><table width="650" align="center" cellpadding="0" cellspacing="0" border="0" style="width: 650px; margin: 0 auto;" ><tr><td><![endif]-->
      <table class="container">
        <tr>
          <td>
            <!-- Your content goes here -->
          </td>
        </tr>
      </table>
      <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
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
````
**Grid**  
You should use `attribute selectors` in your media queries to avoid a glitch which appears in Yahoo! Mail. Please refer to [this article](https://www.campaignmonitor.com/blog/post/3457/media-query-issues-in-yahoo-mail-mobile-email/).   
```` html
<table class="container">
  <tr>
    <td class="column-left">
      column left
    </td><td class="column-right"> <!-- Make sure the tags are directly next to each other -->
      column right
    </td>
  </tr>
</table>
````
```` sass
@include col($col, $cols: $columns, $gt: $gutter, $last: false);
$col: num // column
$cols (optional): num // columns
$gt (optional): px // $gutter
$last (optional): false | true // last column

// e.g.
@include bp-mi(600px) {
  [class~="column-left"] { @include col(8); }
  [class~="column-right"] { @include col(4, null, null, true, 480); }
}
@include bp-ma(599px) {
  [class~="column-left"],
  [class~="column-right"] { @include col(12, $last: true); }
}
````

**Sub-grid**  
Sub grid will works on all screen sizes.
```` html
<table>
  <tr>
    <td class="sub-column-4">
      <a href=""><img src="http://placehold.it/300x250" alt="" class="fluid" /></a>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sint perferendis nostrum ipsam fugiat? Expedita vel impedit culpa accusantium <a href="">sit fugit commodi est a eaque nihil, quae recusandae voluptate</a> exercitationem.
    </td><td class="sub-column-8"> <!-- Make sure the tags are directly next to each other -->
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sint perferendis nostrum ipsam fugiat? Expedita vel impedit culpa accusantium sit fugit commodi est a eaque nihil, quae recusandae voluptate exercitationem.
    </td>
  </tr>
</table>
````
```` sass
@include sub-col($col,$cols: $columns);
$col: num // column
$cols (optional): num // columns

// e.g.
.sub-column-4 { @include sub-col(4,12); padding-right: 5%;}
.sub-column-8 { @include sub-col(8,12); }
````

**Gallery**  
```` html
<table class="block-4">
  <tr>
    <td>
      item 01
    </td><td> <!-- Make sure the tags are directly next to each other -->
      item 02
    </td><td>
      item 03
    </td><td>
      item 04
    </td><!--[if (gte mso 9)|(IE)]><tr></tr><![endif]--><td>
      item 05
    </td><td>
      item 06
    </td><td>
      item 07
    </td><td>
      item 08
    </td>
  </tr>
</table>
````
```` sass
@include gallery($cols, $gt: $gallery-gutter, $gallery-container: $container);
$cols: num // columns
$gt (optional): px // gallery-gutter
$gallery-container (optional): px // gallery-container

// e.g.
@include bp-mi(480px) {
 [class="block-4"] { @include gallery(3); }
}
@include bp-mi(480px) {
 [class="block-4"] { @include gallery(4); }
}
````

**Button**  
```` html
<td class="center">
  <a href=""><span class="button">button</span></a>
</td>
````
```` sass
@include button($background-color: #3ab7e4, $padding: 15px 20px, $border-radius: 3px);
$background-color (optional): null | Hex | rgb | ...
$padding (optional): null | px | em | rem
$border-radius (optional): null | px | em | % ...

// e.g.
.button { 
  @include button(#25d6ec, 10px 15px, 3px); 
}
````

**Breakpoint**  
```` sass
@include bp-mi(480) {...}  // output: @media (min-width: 30em) {...}
@include bp-ma(480, screen) {...}  // output: @media screen and (max-width: 30em) {...}
@include bp-mm(480, 640) {...}  // output: @media (min-width: 30em) and (max-width: 40em) {...}
.header { @include bp-mi(480) {...} }  // output: @media (min-width: 30em) { .header {...}; }
````
## Compatibility
**Desktop Clients**  
Apple Mail 7 ✓   
Apple Mail 8 ✓   
Lotus Notes 8 ✓   
Lotus Notes 8.5 ✓   
Outlook 2000 ✓   
Outlook 2002 ✓   
Outlook 2003 ✓   
Outlook 2011 ✓   
Outlook 2016 ✓   
Thunderbird 31 ✓   

**Mobile Clients**  
Android 2.3 ✓   
Android 4.2 ✓   
iPad (Retina) ✓   
iPad Mini ✓   
iPhone 5s (iOS 7) ✓  
iPhone 5s (iOS 8) ✓  
iPhone 6 ✓  
iPhone 6 Plus ✓  
Windows Phone 8 ✓  

**Web-based Clients**  
AOL Mail (Firefox) ✓  
Gmail (Explorer) ✓  
Gmail (Firefox) ✓  
Gmail (Chrome) ✓  
Outlook.com (Explorer) ✓  
Outlook.com (Firefox) ✓  
Outlook.com (Chrome) ✓  
Yahoo! Mail (Explorer) ✓  
Yahoo! Mail (Firefox) ✓  
Yahoo! Mail (Chrome) ✓  

**other**
Color Blindness ✓ 

Lotus Notes 6.5 ✗  
Lotus Notes 7 ✗  
Outlook 2007 ✗  
Outlook 2010 ✗  
Outlook 2013 ✗  
Gmail App (Android) ✗  
BlackBerry 4 OS ✗  
BlackBerry 5 OS ✗  
AOL Mail (Explorer) ✗  
AOL Mail (Chrome) ✗

## Changelog
See [here](https://github.com/ganlanyuan/fluid-email/blob/master/changelog.md)

## Thanks and reference
<http://jackosborne.com/articles/responsive-email-design/>   
<http://blog.fogcreek.com/responsive-html-emails-a-different-strategy/>   
<https://www.campaignmonitor.com/guides/mobile/>  
[ink](http://zurb.com/ink/)
