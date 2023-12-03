# Building a Website Workflow

1. Finish Figma Design
2. Clone the Vite Template Repository from GitHub
   1. run npm install
   2. run npm run dev
3. Copy Colors to SCSS Variables (maybe use that function to make darker and ligher shader?)
4. Copy Font Sizes to SCSS Variables (use https://royalfig.github.io/fluid-typography-calculator/ )
5. Plan the Layout before Executing the Code
6. Start coding like a Pro

# Useful Tools

-  https://royalfig.github.io/fluid-typography-calculator/
-  https://utopia.fyi/
-  https://whatunit.com/
-  https://tinypng.com/

# Notes

-  When adding margin or padding, you should always think of elements pushing down stuff, that makes sense.
-  We can use different size images for bigger screens such as Retinas, normal size images 1x for normal screens and for Retinas we download the images from Figma in 2x quality.
-  I learned about the picture html tag, which lets me use different sizes of the same image in different screen sizes
   -  The srcset attribute helps chrome to choose between 1x and 2x image version, it all depends on the screen pixel density, if for example the screen that the website is loaded is low res, the chrome engine will choose the 1x version, otherwise will choose 2x version.

```html
<picture>
   <!-- Desktop version images -->
   <source
      media="(min-width: 1024px)"
      srcset="/img/feature-desktop.jpg 1x, /img/feature-desktop-2x.jpg 2x"
   />

   <!-- Mobile version images (default) -->
   <img
      class="feature__img"
      src="/img/feature-mobile.jpg"
      alt="The Oslo Opera House"
      srcset="/img/feature-mobile.jpg, 2x"
   />
</picture>
```

-  I have to make projects work for Netlify, not for GitHub, don't give a damn about the url paths for GitHub Pages, make them work for real world hosting sites such as Netlify. (CodeCoder didn't upload the challenge on GitHub Pages, she did it on Netlify for a reason)
-  Learned a new way of using media queries in scss

```scss
.header {
   width: 20px;

   @media (width >= 1110px) {
      width: 40px;
   }
}
```

-  We put width and height inside img tags so that when the image is loading, it doesn't load without aspect ratio first and then become adjusted.

-  You can use functions inside variables in :root, but you have to use interpolation in order to make them really work:

```css
// This will not work
:root {
   --f-large: clamp(2rem, 5vh, 10rem);
}

// This will work
:root {
   --f-large: #{clamp(2rem, 5vh, 10rem)};
}
```

-  Make sure to use transition property when applying some animations to particular tags, so we don't animate everything

```css
a,
a:visited,
a:hover {
   transition: 150ms ease-in-out;
   transition-property: color, background-color;
}
```

-  Learned the pointer-events: none; command which lets you click through elements, makes elements interactable through that overlay element
-  Learned accessibility features:

```js
// Accessibility features
// - We don't want to select items with tab that are not shown on the screen, with this code when we press tab we can select the closebtn and the menu links that are not even visible on the screen
document.addEventListener("keyup", (e) => {
   if (e.key == "Tab") {
      console.log(document.activeElement);
   }
});
```
