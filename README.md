# Firefox-NativeDark
**Dynamic theme for Firefox Quantum that colorizes the title bar, tabs, and URL bar based on your Windows accent color.**

The theme was originally meant to work with just dark colors, (specifically `#394145`, the darkest color that Windows allows) but while I was making the script to get the system accent colors, the only way to create variations was to create transparent layers of black over top. I accidentally discovered that it would work with other themes, and proceeded to put the below image together.

## Examples
**Below are examples of 11 different accent colors. Only the first is a custom color.**

The tabs and body of the toolbar is 25% darker than the accent color, and the inside of the omni bar is 50% darker than the accent color. The text color is determined by Windows as well.

![Titlebar Examples](titlebars.png)

## Usage
The theme should work with just about any accent colors, however, if you don't have a high resolution display to smooth out the black text, the font will look a little funny on lighter colors. Try to keep the accent color in windows dark enough so that the text color defaults to white.

Make sure that you have a good accent color selected from the palette in `Windows > Settings (Gear) > Personalization > Colors`.

![Settings Screenshot](settings.png)

## Issues
This is really only meant to work in Windows 10. If you try iit in another operating system, let me know what happens for sure, but don't come to me complaining when things break.

In the default Light and Dark themes, there is a thin blue line above the tabs. I like that, and I would like to have it on this theme, but I couldn't find anything in the documentation (which is very slim) about it.

When focusing on a browser window, there is a small delay in loading the toolbar, causing a flicker effect when the tabs load colors before the toolbar. This looks bad, and needs to be fixed, but it may just be a browser limitation.

Please submit issues or suggestions to the [Issues page on the GitHub repository](https://github.com/spikespaz/Firefox-NativeDark/issues).