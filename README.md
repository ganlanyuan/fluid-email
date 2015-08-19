# Fluid-email
Mobile-first email framework build with scss.  
[[demo]](http://creatiointl.org/gallery/william/fluid-email/demo.html)     
[[view tests]](https://litmus.com/pub/747e04a/screenshots)  
[[changelog]](https://github.com/ganlanyuan/fluid-email/blob/master/changelog.md)

**Tips**    
+ Don't use standard tags like `h1`, `h2`,...,`p`.
+ Every element only can have a maximum of one class. But if you will bring css inline later, ignore this rule.
+ Don't use css shorthand like: font: 10px/18px Arial, sans-serif.
+ Give your images a short and simple name: like logo.png, not logo_email_2011_08.png.
+ Use `attribute selectors` in your media queries to avoid a glitch which appears in Yahoo! Mail. Please refer to [this article](https://www.campaignmonitor.com/blog/post/3457/media-query-issues-in-yahoo-mail-mobile-email/).
+ Wider than 320px column width will break the layout in Android Gmail App.
+ Wider image than its container will break the layout in outlook 07/10/13 because of their non-support of `max-width`.

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

## Don't use SASS?
You can use `src/css/index.css` directly.

## Usage
**Basic structure**   
We use `wrapper`to constrain the main content on bigger screen, but since Lotus Notes 8 & Outlook don't support `max-width`, we need add a conditional wherever we use `wrapper`. You can change the `wrapper` width in setting.scss.   
`center` element is required to fix an layout issue on Gmail App (Android).
```` html
<body class="outlook" id="outlook">
  <table class="body" id="backgroundTable">
    <tr>
      <td>
        <center>

        <table class="wrapper">
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
</body>
````
**Settings**   
The default grid is 12 columns, gallery is 6 columns.   
You can directly change the setting in `_variables.scss`, or change it before you @import `fluid-email`.
```` sass
// *** 1 variables.scss *** //
// generate css
$generate-css: true !default;

// layout
$wrapper: 600px !default;
$row: 600px !default;
$cols: 12 !default;
$gutter: 16px !default;

$gallery-cols: 6 !default;
$gallery-align: left !default;

// *** 2 change the setting before @import it *** //
$wrapper: 640px;
$row: 620px;

@import "your/path/to/fluid-email";
````
**Grid**  
```` html
<table class="row">
  <tr>
    <td class="col-4">
      <!-- your content goes here … -->
    </td>
    <td class="col-8">
      <!-- your content goes here … -->
    </td>
  </tr>
</table>
````
**Sub-grid**  
```` html
<table class="row">
  <tr>
    <td class="main">
      <!-- your content goes here … -->
    </td>
    <td class="aside">
      <!-- your content goes here … -->
    </td>
  </tr>
</table>
````
```` sass
@mixin sub-col($key)
// pattern
$key: $column of $columns

// Usage
.main { @include sub-col(4 of 12); }
.aside { @include sub-col(8 of 12); }
````

**Gallery**   
```` html
<table class="gallery-2">
  <tr>
    <td class="item">
      <!-- your content goes here … -->
    </td>
    <td class="item">
      <!-- your content goes here … -->
    </td>
  </tr>
</table>
````

**Button**  
```` html
<td>
  <a href=""><span class="button">button</span></a>
</td>
````
```` sass
@mixin button($key)
// pattern
$key: $background-color $padding $radius

// Usage
.button { 
  @include button(#25d6ec '10px 15px' round); 
  // $radius: round; (radius | round)
}
````

**type**    
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
AOL Mail (Explorer) ✓  
AOL Mail (Firefox) ✓  
AOL Mail (Chrome) ✓  
Gmail (Explorer) ✓  
Gmail (Firefox) ✓  
Gmail (Chrome) ✓  
Outlook.com (Explorer) ✓  
Outlook.com (Firefox) ✓  
Outlook.com (Chrome) ✓  
Yahoo! Mail (Explorer) ✓  
Yahoo! Mail (Firefox) ✓  
Yahoo! Mail (Chrome) ✓   

## Thanks and reference
<http://jackosborne.com/articles/responsive-email-design/>   
<http://blog.fogcreek.com/responsive-html-emails-a-different-strategy/>   
<https://www.campaignmonitor.com/guides/mobile/>  
<http://webdesign.tutsplus.com/tutorials/what-you-should-know-about-html-email--webdesign-12908>   
<https://www.campaignmonitor.com/blog/post/4240/creating-a-centred-responsive-design-without-media-queries>    
[Email-Boilerplate](https://github.com/seanpowell/Email-Boilerplate)
[ink](http://zurb.com/ink/)
