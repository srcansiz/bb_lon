import {SimpleScene} from './SimpleScene'

// Get the canvas element from the DOM.
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

console.log("Console log")
const simpleScene = new SimpleScene(canvas)
simpleScene.render()