# drawingFinal
 Final Project for Drawing on the Web

## Theme
The project consists of three drawings, each illustrating a beautiful different time of day: sunrise, rainfall in the afternoon, and nighttime.

## Navigation Page
The user navigates to each of the three drawings using a clock on the navigation page, following the main theme of time. I really enjoy minimalistic, classic clock faces.
### Draft 1 (commit 1)
I created a bare-bones, ugly clock with a non-functional hour hand. I decided on just having roman numerals for 4 different hours, because I thought it would make the nicest looking clock.
Work will have to be done to get the color of the clock face right. I think I will either go with a different, softer hue of grey, or maybe even a light bronze.
I will also have to find a different, more stylistic font for the numbers on the face.
One of the challenges of animating will be translating the hour hand the correct number of pixels as it rotates around the different times.
### Draft 2 (commit 3)
Didn't actually change anything yet, but I realized a fatal flaw with my plan - a clock usually spans 12 hours. As a result, sunrise and nighttime overlap on a 12 hour clock. X.X
### Final (commit 4)
In the end, I decided to go with a digital clock. Spent a lot of time making the numbers work and preventing invalid entries of 24 hour time (e.g. no 2800hrs). Changing the hour correspondingly when the minutes exceeded 59, or went below 00, was also another fun challenge.
There are still some bugs that I will hope to fix after submission, but currently the page works and the user cannot break the page.
Another problem I wish I solved was that the page would not work on smaller screen sizes.

## Sunrise page
The focus of this page will be, of course, the sun rising. I strove to make the animation as smooth and as balanced as I could. I also decided to give it a little x-translation, because suns rarely just rise straight up.
The sky will also change into different hues of blue, orange and red as the sun rises.
### Draft 1 (commit 1)
I got a very basic sun-rising animation on a simple colored background. It wasn't much work getting all the elements into place.
I foresee that my main challenge may be coloring the sky in a pretty way. I am looking for possibly lighter, pastel shades, that are still very colorful - possibly something like Taylor Swift's Lover album shades, a mix of pink, purple, blue, and the lightest of oranges.
### Draft 2 (commit 2)
First, I figured out how to slowly change the hue, saturation, and lightness (hsl) of the sky as the sun rose. Then, I thought it would be nice to add a little halo around the horizon where the sun is rising, and here I decided on using a radial gradient for the half-visible divs I had that I wanted a color gradient on. The gradient is mainly for showing differences in brightness/color relative to distance to the sun, so that areas closer would be brighter.
Then, I looked for feedback from my girlfriend and dad on how to improve the drawing to make it feel more like a sunrise. They mentioned that the unchanging yellow sun color looked like a moon, and the lack of difference in ground color didn't feel real, so these were my next targets.
A lot of time was spent tweaking the hsl of the sun because I initially wanted a pastel like feel, but in the end realized that it didn't quite fit the vividness and sheer brilliance of colors you'd see in a rising sun.
After changing the colors of the sun and the ground, I really enjoyed the feel of the piece, so I kept it as it was.
For the audio, I looked for a background piece with birds chirping. At first, I was going for peaceful nature, but I wanted some crescendo as the sun rose. I managed to get this effect with an audio file that had a car driving past halfway into the audio file. I also added in a cock crowing, one of the symbolic sounds of the morning.
### Credits
“Sound effects obtained from https://www.zapsplat.com“

## Rain page
At first, I wanted to convert a video of drops of water falling into a mosaic of small circles. However, finding a suitable video proved difficult mainly because I could not get the speed and amount of drops falling to fit my vision, and shooting one of my own was similarly tough as I could not find a background of the right color. Therefore, I went with javascript coding of colored circles falling into each other.
### Draft 1 (commit 2)
Getting the water drops falling was quite difficult, and I spent over 2 hours troubleshooting an issue that arose because I made a mathematical operation error when converting row&column to index, via misplacement of parenthesis. At first I was working with a canvas of 200x200 circles, but I made this down to 10x10 for easy troubleshooting because we can easily scale it back up later.
My biggest challenge will probably be figuring out the behavior of drops when they collide into one another. As I am iterating over the array of raindrops from top to bottom, I need to ensure that when the droplets on top trickle down into the next row, they are not once again iterated over, or raindrops will disappear off the page in one single iteration; however, this needs to be balanced with making sure that drops with a drop of water below them are able to both move down.
Another challenge will probably be - what to do when droplets reach the bottom, and how to make droplets come from the top in a way that looks nice?
### Draft 2 (commit 3)
This page gave me so much trouble.
The problem in draft 1 of raindrops being iterated over from top to bottom in 1 loop was solved by giving the cell the drop trickled to a value that wouldn't let it be iterated over again. However, how do you solve the issue with stacked raindrops? Then the drops below the top one do not get iterated over and the whole batch becomes stationary.
I tried iterative and recursive solutions, but for some reason solutions that seemed logically sound (i.e. not infinite loop) could never seem to load on the browser. I ended up giving cells with raindrops that was supposed to receive another drop from above a new value that would be iterated over but would be treated differently from regular, single drops.
The lightning effect was achieved with a background div mix-blended, with flashes of white to emulate lightning flashes; then, the only thing left to do was ensuring the colors and lightness were right.
However, I was dissatisfied here with single flashes of light, because lightning rarely just comes in a single flash; furthermore, it was proving hard to find short, single claps of thunder. Therefore, I created a couple of longer lightning flashes in a flashArray that would be iterated over, along with thunder audio with corresponding lengths.
A seemingly straightforward page that turned out to have many small, really persistent bugs and little issues.
### Credits
“Sound effects obtained from https://www.zapsplat.com“

## Night Page
I spent a while thinking of inspiration for the night scene, and I thought - night time has to be about the moon. I'm probably going to use 3.js for this, creating a night-sky globe surrounding with a 3d moon sphere in the middle. Emphasis will probably be on making the lighting look good on the surface of the moon sphere.
### Final (commit 4)
This was hard. I changed my mind a lot, especially about how to do the background. In the end, I went with a lovely sky picture I found on unSplash by Patrick Fore. Beautiful.
### Credits
Photo by Patrick Fore on Unsplash
Song, *Wet Hands*, by C418, from the game *Minecraft*
