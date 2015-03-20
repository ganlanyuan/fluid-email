# Fluid-email
Mobile-first email framework build with scss.  
[[demo]](http://designdev.christianpost.com/develop/fluid-email/docs/demo.html)     [[view tests]](https://litmus.com/pub/b160eab/screenshots)  

**Tips**    
+ Don't use standard tags like `h1`, `h2`,...,`p`.
+ Every element only can have a maximum of one class. But if you will bring css inline later, ignore this rule.
+ Don't use css shorthand like: font: 10px/18px Arial, sans-serif.
+ Give your images a short and simple name: like logo.png, not logo_email_2011_08.png.

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
<table class="row">
  <tr>
    <td class="column-left">
      column left
    </td>
    <td class="column-right">
      column right
    </td>
  </tr>
</table>
````
```` sass
@include col($col, $cols, $gt, $last);
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
<table class="row">
  <tr>
    <td class="sub-column-4">
      <a href=""><img src="http://placehold.it/300x250" alt="" class="fluid" /></a>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sint perferendis nostrum ipsam fugiat? Expedita vel impedit culpa accusantium <a href="">sit fugit commodi est a eaque nihil, quae recusandae voluptate</a> exercitationem.
    </td>
    <td class="sub-column-8">
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
    <td class="cell"> item 01 </td>
    <td class="cell"> item 02 </td>
    <td class="cell"> item 03 </td>
    <td class="cell"> item 04 </td>
    <!--[if (gte mso 9)|(IE)]><tr></tr><![endif]-->
    <td class="cell"> item 05 </td>
    <td class="cell"> item 06 </td>
    <td class="cell"> item 07 </td>
    <td class="cell"> item 08 </td>
  </tr>
</table>
````
```` sass
@include gallery($cols, $gt, $gallery-container);
$cols: num // columns
$gt (optional): px // gallery-gutter
$gallery-container (optional): px // gallery-container

// e.g.
@include bp-mi(480px) {
 [class~="block-4"] { @include gallery(3); }
}
@include bp-mi(480px) {
 [class=~"block-4"] { @include gallery(4); }
}
````

**Button**  
```` html
<td class="center">
  <a href=""><span class="button">button</span></a>
</td>
````
```` sass
@include button($background-color, $padding, $border-radius);
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

**Visibility**  
```` sass
@include visible($media, $bp...);
@include hidden($media, $bp...);

// e.g.
.show-on-mobile { @include visible(screen, 800px);
.show-on-desktop { @include hidden(null, 400px 800px);
// only works on the platforms that support CSS3 mediaquery
````

## Compatibility
**Desktop Clients**
Apple Mail 7 ✓  
Apple Mail 8 ✓  
Lotus Notes 6.5 ✗  
Lotus Notes 7 ✗  
Lotus Notes 8 ✓  
Lotus Notes 8.5 ✓  
Outlook 2000 ✓  
Outlook 2002 ✓  
Outlook 2003 ✓  
Outlook 2007 ✓  
Outlook 2010 ✓  
Outlook 2011 ✓  
Outlook 2013 ✓  
Outlook 2016 ✓  
Thunderbird 31 ✓  

**Mobile Clients**
Android 2.3 ✓  
Android 4.2 ✓  
Gmail App (Android) ✓  
BlackBerry 5 OS ✗  
iPad (Retina) ✓  
iPad Mini ✓  
iPhone 5s (iOS 7) ✓  
iPhone 5s (iOS 8) ✓  
iPhone 6 ✓  
iPhone 6 Plus ✓  
Windows Phone 8 ✓  

**Web-based Clients**
AOL Mail (Explorer) ✗  
AOL Mail (Firefox) ✓  
AOL Mail (Chrome) ✗  
Gmail (Explorer) ✓  
Gmail (Firefox) ✓  
Gmail (Chrome) ✓  
Outlook.com (Explorer) ✓  
Outlook.com (Firefox) ✓  
Outlook.com (Chrome) ✓  
Yahoo! Mail (Explorer) ✓  
Yahoo! Mail (Firefox) ✓  
Yahoo! Mail (Chrome) ✓   

## Changelog
See [here](https://github.com/ganlanyuan/fluid-email/blob/master/changelog.md)

## Thanks and reference
<http://jackosborne.com/articles/responsive-email-design/>   
<http://blog.fogcreek.com/responsive-html-emails-a-different-strategy/>   
<https://www.campaignmonitor.com/guides/mobile/>  
<http://webdesign.tutsplus.com/tutorials/what-you-should-know-about-html-email--webdesign-12908>   
[ink](http://zurb.com/ink/)
