# Tatjana Marković Custom Video Player
## Table of contents

  - [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [Author](#author)

## Overview
![Overview](./images/screenshots/player.jpg)

- On first load and on Ended
  1. On screen displayed Play button is shown for 1 second.
  2. Active buttons: Play, sound On, wide screen, speed x 1 (normal)

- App controls
  1. Play - Pressing Play button or Pressing Screen.
  2. Stop - Pressing Stop button or Pressing Screen.
  3. Sound - Toggle Sound button   between muted and full sound,
           - Hover Sound button -> show Sound slider to change volume
  4. Speed - Toggle Speed button between show and hide speed list,
           - Chosen Speed -> show on Speed button,
  5. Screen - Toggle Screen button between full screen and normal,
            - Full screen -> Show message
            - Esc key -> close full screen,
  6. Duration - Progress bar show progress of the video, duration and elapsed time ,
              - User can "jump" on the desire moment of the video by moving slider left or right,


## The challenge

You need to make a Custom Video Player; visual design (colors, fonts, etc.) is free to choose, it is only important to be responsive.

The videos you can use are in the following archive: 
![Videos](https://drive.google.com/file/d/19tmFoS7OOt5eb7n5s1T_mSe6v49etyM2/view?usp=sharing)

Use only Browser Video & Audio API and make custom controls:
- Yes the video can be played / paused
- To be able to increase the volume
- That sound can be mutated
- That the video playback speed can be changed (default is 1.0x, and there should be 0.5x, 0.75x, 1.5x, 2.0x)
- To have FullScreen mode
- Create a progress bar for the time (duration of the video) that can be clicked and that takes the user to the exact second of the video.

The Video Player should look and work like this: 
![Example](https://drive.google.com/file/d/1zGt-IHlrBeRHJpBuOuGE2AIAjU1OJTta/view?usp=sharing)

### Screenshot

![Desktop-init ](./images/screenshots/dt-start.png)
![Desktop-Active ](./images/screenshots/dt-active.png)
![Desktop-Active ](./images/screenshots/dt-active1.png)
![Desktop-max ](./images/screenshots/dt-fullscreen.png)
![Tablet-768 ](./images/screenshots/tablet-fullscreen.png)
![Tablet-landscape ](./images/screenshots/tablet-landscape.png)
![Mobile-375 ](./images/screenshots/mobile.png)
![Mobile-fullscreen ](./images/screenshots/mobile-fullscreen.png)
![Mobile-landscape ](./images/screenshots/mobile-landscape.png)
![Mobile-landscape-fullscreen ](./images/screenshots/mobile-landscape-fullscreen.png)

### Links

- Solution URL: [GitHub](https://github.com/tatjama/zadatak7-custom-video-player/tree/develop)
- Preview: [Vercel](https://zadatak7-custom-video-player-f6p4t3vkk-tatjana.vercel.app/)
- Live Site URL: [Vercel](https://zadatak7-custom-video-player.vercel.app/)

## My process

1. Create a new project
2. Initializing git repositories main and develop
3. Import git repositories to the Vercel project
4. Create HTML structure
5. Create CSS Utility
6. Create JavaScript Custom Video Player
7. Style for Desktop
8. Responsive Mobile
9. Manual Test for bugs
10. Compare original designs with my work
11. Create screenshots
12. Change README-template.md to README.md
13. Open Pull request
14. Solve Issue
15. Merge develop branch into master branch
### Built with

1. Semantic HTML5 markup
2. CSS custom properties
- FlexBox
- Media queries
- Centering elements, content and text
- Element positioning
- Customize font,width and size
- Hover
- CSS variables
- gradient
3. JavaScript
- DOM manipulation   
- Event handling
- Browse Audio && Video API
## Author

- Website - [Tatjana Markovic](https://my-react-portfolio-tatjana.vercel.app/)
- LinkedIn - [Tatjana Marković](https://www.linkedin.com/in/tatjana-markovi%C4%87-919501189/)
- GitHub - [tatjama](https://github.com/tatjama)