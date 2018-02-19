# Firefox-NativeDark
**Dynamic theme for Firefox Quantum that colorizes the title bar, tabs, and URL bar based on your Windows accent color.**

[![Add to Firefox](images/button.png)](https://addons.mozilla.org/firefox/downloads/file/868099/native_dark-1.2-an+fx.xpi?src=dp-btn-primary)

Get it at Add-ons for Firefox: https://addons.mozilla.org/en-US/firefox/addon/native-dark/

The theme was originally meant to work with just dark colors, (specifically `#394145`, the darkest color that Windows allows) but while I was making the script to get the system accent colors, the only way to create variations was to create transparent layers of black over top. I accidentally discovered that it would work with other themes, and proceeded to put the below image together.

## Examples
**Below are examples of 11 different accent colors. Only the first is a custom color.**

The tabs and body of the toolbar is 25% darker than the accent color, and the inside of the omni bar is 50% darker than the accent color. The text will always remain pure white, I have found that this looks best.

![Titlebar Examples](images/titlebars.png)

## Usage
The theme should work with just about any accent colors, however, the font will look a little funny on super light colors. Try to keep the accent color in Windows dark enough so that the text color doesn't conflict with the background.

Make sure that you have a good accent color selected from the palette in `Windows > Settings (Gear) > Personalization > Colors`.

![Settings Screenshot](images/settings.png)

## Issues
This is really only meant to work in Windows 10. On other systems, it just defaults to the dark theme shown in the top example. **Please don't ask me why it doesn't sync with your theme in Linux!**

In the default Light and Dark themes, there is a thin blue line above the tabs. I like that, and I would like to have it on this theme, but I couldn't find anything in the documentation (which is very slim) about it.

When focusing on a browser window, there is a small delay in loading the toolbar, causing a flicker effect when the tabs load colors before the toolbar. This looks bad, and needs to be fixed, but it may just be a browser limitation.

Please submit issues or suggestions to the [Issues page on the GitHub repository](https://github.com/spikespaz/Firefox-NativeDark/issues).
