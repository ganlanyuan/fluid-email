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
$grid-breakpoint: 600; // 600px: grids start work
````
**Grid**  
1. Grid will works only on screen bigger than 600px.
2. It's better to use `attribute selectors` in your media queries to avoid a glitch which appears in Yahoo! Mail. Please refer to [this article](https://www.campaignmonitor.com/blog/post/3457/media-query-issues-in-yahoo-mail-mobile-email/).   
Since we use media queries inside our `grid` @mixin and `gallery` @mixin, it's also recommend to use `attribute selectors` when you use `grid` or `galllery`.
```` sass
@include col($col, $cols: $columns, $gt: $gutter, $last: false, $bp: $grid-breakpoint);
$col: num // column
$cols (optional): num // columns
$gt (optional): px // $gutter
$last (optional): false | true // last column
$bp (optional): num // breakpoint for grid works
// e.g.
[class="column-8"] { @include col(8); }
[class="column-4"] { @include col(4, null, null, true, 480); }
````

**Sub-grid**  
```` sass
@include sub-col($col,$cols: $columns);
$col: num // column
$cols (optional): num // columns
// e.g.
.sub-column-4 { @include sub-col(4,12); padding-right: 5%;}
.sub-column-8 { @include sub-col(8,12); }
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
