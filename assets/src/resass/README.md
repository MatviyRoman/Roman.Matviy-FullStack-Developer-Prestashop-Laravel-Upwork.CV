# resass [![NPM version](https://img.shields.io/npm/v/resass.svg?style=flat)](https://www.npmjs.com/package/resass) [![NPM monthly downloads](https://img.shields.io/npm/dm/resass.svg?style=flat)](https://npmjs.org/package/resass) [![NPM total downloads](https://img.shields.io/npm/dt/resass.svg?style=flat)](https://npmjs.org/package/resass) [![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E2H8329XLYRKQ&source=url)

##sass media queries mixin

- [Getting started](#getting-started)
  - [Install](#install)
  - [Download](#download)
- [Usage](#usage)
- [Documentation](#documentation)
  - [Include](#include)
  - [Examples](#examples)
    - [Full include](#full-include)
    - [Short include](#short-include)
  - [List of supported devices](#list-of-supported-devices)
    - [Groups](#groups)
    - [Phones](#phones)
    - [Tablets](#tables)
    - [Laptops](#laptops)
  - [Expanding the list of devices](#expanding-the-list-of-devices)
- [Demo](#demo)
  - [Helpful links](#helpful-links)
    - [Important](#important)
- [About](#about)
  - [Contributing](#contributing)
  - [Release](#relese-history)
  - [Credits](#credits)
  - [License](#license)
- [Donate](#donate)

## Getting started

### Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install resass
```

Install with [github](https://github.com):

```sh
$ git clone https://github.com/MatviyRoman/resass.git
```

Install with [curl](https://matviy.pp.ua):

```sh
$ curl -O https://raw.githubusercontent.com/MatviyRoman/resass/master/mq.scss
```

### Download

[download](https://github.com/matviyroman/resass/archive/master.zip)

## Usage

1. Include resass to app:

```scss
@import "resass/r";
```

or

```scss
@import "resass/mq";
```

## Documentation

Mixins for checking **device by width and height** (width, min-width, max-width, height, min-height, max-height) or **group of devices** (mobile, tablet, laptop, desktop) or **device by name** (iPhone 5, iPhone X, iPhone 11 Pro Max, iPad Pro 12.9, etc). Expandable and very simple for usage.

### Include

#### Full include

Before

```scss
1) @include screen()
2) @include min-screen()
3) @include max-screen()
4) @include height()
5) @include min-screen-height()
6) @include max-screen-height()
7) @include landscape()
8) @include portrait()
```

After

```css
1) @media only screen and (min-width: width) and (max-width: width)
2) @media only screen and (min-width: width)
3) @media only screen and (max-width: width)
4) @media only screen and (min-height: height) and (max-height: height)
5) @media only screen and (min-height: height)
6) @media only screen and (max-height: height)
7) @media only screen and (orientation: landscape)
8) @media only screen and (orientation: portrait)
```

#### Short include

Before

```scss
1) @include s()
2) @include smin()
3) @include smax()
4) @include h()
5) @include hmin()
6) @include hmax()
7) @include l()
8) @include p()
```

After

```css
1) @media only screen and (min-width: width) and (max-width: width)
2) @media only screen and (min-width: width)
3) @media only screen and (max-width: width)
4) @media only screen and (min-height: height) and (max-height: height)
5) @media only screen and (min-height: height)
6) @media only screen and (max-height: height)
7) @media only screen and (orientation: landscape)
8) @media only screen and (orientation: portrait)
```

### Examples:

It can be used like this:

scss

```scss
@include screen(min-width, max-width, orientation) {
  /*...*/
}
@include s(min-width, max-width, orientation) {
  /*...*/
}
```

Before:

```css
@include screen(320px, 768px, portrait) {
  /*...*/
}
@include s(0, 768px, l) {
  /*...*/
}
```

After:

```css
@media only screen and (min-width: 320px) and (max-width: 768px) and (orientation: portrait) {
  /*...*/
}
@media only screen and (max-width: 768px) and (orientation: landscape) {
  /*...*/
}
```

Or like this:

```scss
@include device(iPhone5, portrait) {
  // portrait orientation
  // iPhone 5, iPhone 5s, iPhone 5c, iPhone SE
}
@include device(iPhone6Plus iPhoneXR, landscape) {
  // landscape orientation
  // iPhone 6+, iPhone 6s+, iPhone 7+, iPhone 8+, iPhone XR, iPhone 11
}
@include device(iPadPro10 iPadPro11 iPadPro12) {
  // all orientations
  // iPad Pro 10.5, iPad Pro 11, iPad Pro 12.9
}
```

Or like this:

```scss
@include device(desktop) {
  // all orientations
  // desktop
}
@include device(mobile tablet laptop, landscape) {
  // landscape orientation
  // mobile, tablet, laptop
}
```

Or even like this:

```scss
@include device(mobile-landscape tablet laptop) {
  // landscape orientation
  // mobile

  // all orientations
  // tablet, laptop
}
@include device(mobile-landscape tablet laptop, portrait) {
  // landscape orientation
  // mobile

  // portrait orientation
  // tablet, laptop
}
```

Before

```scss
@include s(325px, 0) {
  /*...*/
}
```

After

```css
@media only screen and (min-width: 325px) {
  /*...*/
}
```

Before

```scss
Before @include s(0, 325px) {
  /*...*/
}
```

After

```css
@media only screen and (max-width: 325px) {
  /*...*/
}
```

There are also common mixins:

```scss
@include screen(min-width, max-width, orientation) {
  /*...*/
}
@include screen(min-width, max-width, orientation) {
  /*...*/
}
@include min-screen(width, orientation) {
  /*...*/
}
@include max-screen(width, orientation) {
  /*...*/
}
@include screen-height(min-height, max-height, orientation) {
  /*...*/
}
@include min-screen-height(height, orientation) {
  /*...*/
}
@include max-screen-height(height, orientation) {
  /*...*/
}
```

Orientations:

```scss
@include landscape() {
  /*...*/
}
@include portrait() {
  /*...*/
}
```

### List of supported devices:

#### Groups

- Mobiles 320-767px `mobile` `mobile-portrait` `mobile-landscape`
- Tablets 768-1023px `tablet` `tablet-portrait` `tablet-landscape`
- Laptops 1024-1199px `laptop` `laptop-portrait` `laptop-landscape`
- Desktop >=1200px `desktop` `desktop-portrait` `desktop-landscape`

#### Phones

- iPhone 5, 5s, 5c, SE `iphone5` `iphone5s` `iphone5c` `iphonese`
- iPhone 6, 6s, 7, 8 `iphone6` `iphone6s` `iphone7` `iphone8`
- iPhone 6+, 6s+, 7+, 8+ `iphone6plus` `iphone6splus` `iphone7plus` `iphone8plus`
- iPhone X, XS, 11 Pro `iphonex` `iphonexs` `iphone11pro`
- iPhone XR, 11 `iphonexr` `iphone11`
- iPhone XS Max, 11 Pro Max `iphonexsmax` `iphone11promax`

#### Tablets

- iPad 1, 2, Mini, Air `ipad1` `ipad2` `ipadmini` `ipadair`
- iPad 3, 4, Pro 9.7" `ipad3` `ipad4` `ipadpro9`
- iPad Pro 10.5" `ipadpro10`
- iPad Pro 11.0" `ipadpro11`

#### Laptops

- iPad Pro 12.9" `ipadpro12`

_Well, Yes. iPad Pro 12.9" is a laptop because of its size._

---

### Expanding the list of devices:

You can add support for custom devices or group of devices without editing the source.
Before `@import "resass/mq"`, you must specify `$ms-devices` variable with a list of additional devices:

```scss
$ms-devices: (
  desktop-sm: (
    group: true,
    // group of devices
      min: 1200px,
    max: 1919px
  ),
  desktop-md: (
    group: true,
    // group of devices
      min: 1920px,
    max: 2879px
  ),
  desktop-lg: (
    group: true,
    // group of devices
      min: 2880px
  ),
  pixel2xl: (
    group: false,
    // specific device
      width: 411px,
    // or 412px?..
      height: 823px,
    pixel-ratio: 3.5
  ),
  macbook12: (
    group: false,
    // specific device
      orientation: landscape,
    width: 1440px,
    height: 900px,
    pixel-ratio: 2
  ),
  imac27: (
    group: false,
    // specific device
      orientation: landscape,
    width: 5120px,
    height: 2880px
  )
);
```

## Demo

### Helpful Links

- [Demo 1](http://scss-mq-mix.matviy.pp.ua)
- [Demo 2](http://resass.matviy.pp.ua)

### Important

> Don't check the adaptability in the browser DevTools, there are [incorrectly calculated dimensions](https://codepen.io/matviy/pen/ZEQOrmv) of the sides in the landscape orientation of the device.
> It is better to check on a real device or in a simulator (for example, xCode Simulator).

> Use [group-css-media-queries](https://github.com/Se7enSky/group-css-media-queries) to optimize media queries. Without it, a lot of the same `@media ...` code is generated, especially if for the sake of convenience to use the mixin `@include device()` in each selector separately. Wrapper for Gulp - [gulp-group-css-media-queries](https://github.com/avaly/gulp-group-css-media-queries).

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Relese History

| **DATE**   | **VERSION** | **CHANGES**                                        |
| ---------- | ----------- | -------------------------------------------------- |
| 2020-06-20 | v1.0.5      | Fix error                                          |
| 2020-06-18 | v1.0.4      | Add short include                                  |
| 2020-06-15 | v1.0.3      | Fix error                                          |
| 2020-06-10 | v1.0.2      | Fix error                                          |
| 2020-06-3  | v1.0.1      | Fix [#fix](https://github.com/romanmatviy/resass/) |
| 2020-06-1  | v1.0.0      | upload                                             |

### Credits

**Roman Matviy**

- [GitHub Profile](https://github.com/matviyroman)
- [LinkedIn Profile](https://linkedin.com/in/romanmatviy)
- [Portfolio Profile](https://matviy.pp.ua)
- [Resume Profile](https://roman.matviy.pp.ua)

### License

Copyright © 2020, [Roman Matviy](https://github.com/matviyroman).

Released under the [MIT License](LICENSE).

## Donate

Buy me a coffee :)

QR Code

<img src="https://github.com/MatviyRoman/resass/blob/master/img/qr-code.png?raw=true" alt="donation resass media queries">

Or PayPall

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E2H8329XLYRKQ&source=url)

<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick" />
<input type="hidden" name="hosted_button_id" value="E2H8329XLYRKQ" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" src="https://www.paypal.com/en_UA/i/scr/pixel.gif" width="1" height="1" />
</form>

Thank You!
