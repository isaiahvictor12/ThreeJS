# three.js-Football-Game

**Very Important:** You need to run it on a server for it to work. 

The game is pretty simple. There is a QB mode and a WR mode. You can click s to switch between them.

In QB mode use the left and right arrow keys to aim the football at the player. Use the up arrow to throw the football.

In WR mode, use the left and right arrow keys to move side to side to catch the football. Imagine you are viewing the field and ball from the perspective of a receivers hands. 

## Explanation

The function "init" is called when the webpage loads, and it sets up the initial state of the game. The scene, camera, and renderer are created, and a football is added to the scene. The camera is positioned and there is a plane that shows an image of a football field. A light is added that always points to the football. A player target is also added to the scene with a random x position. Two text objects are created but both are made invisible. The game variable is set to 1.

In game 1, the camera and football are set up so that the football appears right in front of you. The targeet is visible. When you press the left or right arrow keys, the football is rotated toward that direction and the x_vel variable is adjusted. When you press the up arrow, the throw variable is set to true, causing the behavior of the football to change. The football begins to move away from the camera in the z direction, move left or right according to the x_vel variable which depends on what way you rotated the football, and spin. Once the football reaches a certain z value, its distance to the target is calculated. If it is close enough, the text saying "Nice throw!" is set visible for one second. Then the thrown value is set to false and the football is reset. The target goes to a new random x position.

In game 2, the camera and football are set up so that the football is far away. The target is made invisible. When you press the left or right arrow keys, the camera travels in that direction. The football is constantly moving toward the camera in the z direction and also moving left or right according to a random value for x_vel. Once the football passes the camera in the z direction, the x values of each are compared to see if they are close. If they are close enough, the text saying "Nice catch!" is set visible for one second. Then the football's position is reset and it is given a new random value for x_vel.

You can switch between these games with the s key which calls init1 or init2 to switch the game. These functions are pretty short and mostly just change the position of the football and camera, as well as change the values for a few variables. Most of the difference in behavior is handled by changing the game variable which affects the update function and keyPressed function a lot.

