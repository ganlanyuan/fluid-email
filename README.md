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
````
**Grid**  
You should use `attribute selectors` in your media queries to avoid a glitch which appears in Yahoo! Mail. Please refer to [this article](https://www.campaignmonitor.com/blog/post/3457/media-query-issues-in-yahoo-mail-mobile-email/).   
```` html
<table class="container">
  <tr>
    <td class="column-left">column left</td>
    <td class="column-right">column right</td>
  </tr>
</table>
````
```` sass
@include col($col, $cols: $columns, $gt: $gutter, $last: false, $bp: $grid-breakpoint);
$col: num // column
$cols (optional): num // columns
$gt (optional): px // $gutter
$last (optional): false | true // last column
$bp (optional): num // breakpoint for grid works

// e.g.
@include bp-mi(600px) {
  [class="column-left"] { @include col(8); }
  [class="column-right"] { @include col(4, null, null, true, 480); }
}
````

**Sub-grid**  
Sub grid will works on all screen.
```` html
<table>
  <tr>
    <td class="sub-column-4"><a href=""><img src="http://placehold.it/300x250" alt="" class="fluid" /></a>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sint perferendis nostrum ipsam fugiat? Expedita vel impedit culpa accusantium <a href="">sit fugit commodi est a eaque nihil, quae recusandae voluptate</a> exercitationem.</td>
    <td class="sub-column-8">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sint perferendis nostrum ipsam fugiat? Expedita vel impedit culpa accusantium sit fugit commodi est a eaque nihil, quae recusandae voluptate exercitationem.</td>
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
    <td>item 01</td>
    <td>item 02</td>
    <td>item 03</td>
    <td>item 04</td>
    <td>item 05</td>
    <td>item 06</td>
    <td>item 07</td>
    <td>item 08</td>
  </tr>
</table>
````
```` sass
@include gallery($cols, $gt: $gallery-gutter);
$cols: num // columns
$gt (optional): // gallery-gutter

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
<div class="button"><a href="">button</a></div>
````
```` sass
@include button($font-size, $padding, $margin, $background-color, $border, $border-radius);
$font-size (optional): null | px | em | rem
$padding (optional): null | px | em | rem
$margin (optional): null | px | em | rem
$background-color (optional): null | Hex | rgb | ...
$border (optional): null | ...
$border-radius (optional): null | px | em | % ...

// e.g.
.button { 
  @include button(13, 10px 15px, 10px 0 0, #25d6ec, null, 3px); 
}
````

**Breakpoint**  
```` sass
@include bp-mi(480) {...}  // output: @media (min-width: 30em) {...}
@include bp-ma(480, screen) {...}  // output: @media screen and (max-width: 30em) {...}
@include bp-mm(480, 640) {...}  // output: @media (min-width: 30em) and (max-width: 40em) {...}
.header { @include bp-mi(480) {...} }  // output: @media (min-width: 30em) { .header {...}; }
````

## Changelog
See [here](https://github.com/ganlanyuan/fluid-email/blob/master/changelog.md)

## Thanks and reference
<http://jackosborne.com/articles/responsive-email-design/>   
<http://blog.fogcreek.com/responsive-html-emails-a-different-strategy/>   
<https://www.campaignmonitor.com/guides/mobile/>  
[ink](http://zurb.com/ink/)
