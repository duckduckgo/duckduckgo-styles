# DuckDuckGo Styles

This package contains the common styling elements used on DuckDucKGo.

e.g. buttons. form elements, inline separators, nav menu

*Please note*

This repository makes use of a number of includes from [compass](http://compass-style.org),
and assumes that it will be used in combination with [litestrap](https://github.com/duckduckgo/litestrap)
and thus makes use of a number of the variables therein.

## Updating Icon Font
1. First install deps: `npm install`
2. Install [fontforge](https://fontforge.org) (required by grunt-webfont):
   ```
   sudo add-apt-repository ppa:fontforge/fontforge;
   sudo apt-get update;
   sudo apt-get install fontforge;
   ```
3. Add new SVG files to `/icons/src/svgs`
4. Add new icon to `/icons/src/codepoints.json`
5. `grunt`
