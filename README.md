# Fluid-email
Mobile-first email framework build with scss.  
[[demo]](http://designdev.christianpost.com/develop/fluid-email/docs/demo.html)     
[[view tests]](https://litmus.com/pub/b160eab/screenshots)  
[[changelog]](https://github.com/ganlanyuan/fluid-email/blob/master/changelog.md)

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
`center` element is required to fix an layout issue on Gmail App (Android).
```` html
<table class="body">
  <tr>
    <td>
      <center>
      
      <table class="container">
        <tr>
          <td>
            <!-- Your content goes here -->
          </td>
        </tr>
      </table>
      
      </center>
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
<table class="wrapper">
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
@mixin span($key);
// pattern
$key: ($column of $columns) last

// Usage
@include bp(min 600) {
  [class~="column-left"] { @include col(8); }
  [class~="column-right"] { @include col(4 last); }
}
@include bp(max 599) {
  [class~="column-left"],
  [class~="column-right"] { @include col(12 last); }
}
````

**Sub-grid**  
Sub grid will works on all screen sizes.
```` html
<table class="wrapper">
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
@mixin sub-span($key)
// pattern
$key: $column of $columns

// Usage
.sub-column-4 { @include sub-span(4 of 12); padding-right: 5%;}
.sub-column-8 { @include sub-span(8 of 12); }
````

**Button**  
```` html
<td class="center">
  <a href=""><span class="button">button</span></a>
</td>
````
```` sass
@mixin button($key)
// pattern
$key: $background-color $padding $border-radius

// Usage
.button { 
  @include button(#25d6ec '10px 15px' 3px); 
}
````

** type **
`type` is a shorthand mixin for type.     
```` scss
@mixin type($key);
// pattern
$key: $font-size $font-weight $font-style $line-height $font-family $text-align $text-transform 

h1 { @include type(20px 'Georgia, Helvetica, sans-serif' center 1.4 bold italic) }
// font-size: 20px;
// font-weight: bold; 
// font-style: italic; 
// font-family: 'Georgia, Helvetica, sans-serif';
// text-align: center;
// line-height: 1.4;

// Tips: to set 'font-weight', 'font-style', 'text-align' or 'text-transform' value 
// to 'inherit' or 'normal', 
// you need add prefix 'weight-', 'style-' or 'transform-'.

// $ro-font-weights: thin, hairline, 'extra light', 'ultra light', lighter, light, normal, medium, 'semi bold', 'demi bold', bold, bolder, 'extra bold', black, heavy, 100, 200, 300, 400, 500, 600, 700, 800, 900, weight-normal, weight-inherit !default;
// $ro-font-styles: italic, oblique, style-normal, style-inherit !default;
// $ro-text-aligns: left, right, center, justify, align-inherit !default;
// $ro-text-transforms: capitalize, uppercase, lowercase, none, full-width, transform-inherit !default;
````

**Breakpoint**  
```` sass
@include bp(min 480) {...}  // output: @media (min-width: 30em) {...}
@include bp(max 480 screen) {...}  // output: @media screen and (max-width: 30em) {...}
@include bp(480 640) {...}  // output: @media (min-width: 30em) and (max-width: 40em) {...}
.header { @include bp(min 480) {...} }  // output: @media (min-width: 30em) { .header {...}; }
````

**Visibility**  
```` sass
@include visible($key);
@include hidden($key);
// pattern
$key: $media $breakpoints

// Usage
.show-on-mobile { @include visible(screen 800);
.show-on-desktop { @include hidden(null 400 800);
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

## Things need to be fixed
**Max-width**  
lotus 6.5/7  

## Thanks and reference
<http://jackosborne.com/articles/responsive-email-design/>   
<http://blog.fogcreek.com/responsive-html-emails-a-different-strategy/>   
<https://www.campaignmonitor.com/guides/mobile/>  
<http://webdesign.tutsplus.com/tutorials/what-you-should-know-about-html-email--webdesign-12908>   
[ink](http://zurb.com/ink/)
