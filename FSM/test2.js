// Provides the state machine descriptions and creates a new game

//First, load in all of our images
var loadCounter = 0;
var totalImg = 0;

var x1 = 20;
var y1 = 20;
var x2 = 200;
var y2 = 20;

var totoro = new Image();
totalImg++;
totoro.onload = function() {
  loadCounter++;
}
totoro.src = 'totoro2.png';

var heart = new Image();
totalImg++;
heart.onload = function() {
  loadCounter++;
}
heart.src = 'heart.png';

var face = new Image();
totalImg++;
face.onload = function() {
  loadCounter++;
}
face.src = 'face.jpg';
//Create our actors and their FSMs
var actor1 = new Actor({
  height: 100,
  width: 100,
  x: 20,
  y: 20,
  img: face,
}); 
var actor2 = new Actor({
  height: 100,
  width: 200,
  x: 200,
  y: 20,
  img: totoro,
}); 
/*var actor3 = new Actor({
  height: 50,
  width: 50,
  x: 200,
  y: 20,
  img: icon,
}); */
/*var actor4 = new Actor({
  height: 100,
  width: 100,
  x: 20,
  y: 20,
  img: face,
}); */

actor1.setFSM({ 
  states: [ 
  { 
    name: "start", 
    transitions: [ 
      { 
        event: "message",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: face
          }
        }],
        message: '$INIT$',
        endState: "start"
      }, { 
        event: "buttonpress",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: heart
          }
        }],
        endState: "start",
        target: 'button0'
      },{ 
        event: "buttonpress",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: face
          }
        }],
        endState: "start",
        target: 'button2'
      },{ 
        event: "mousedown",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: face
          }
        }],
        endState: "start"
      },{ 
        event: "mouseup",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: face
          }
        }],
        endState: "start",
      },{ 
        event: "mousemove",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: face
          }
        }],
        endState: "start"
      },{
      event: "buttonpress",  
        actions: [{
          func: Actions.runAnim,
          params: {
            movingActor: actor1,
            targetActor: actor2,
            duration: 5000,
            passOverMessage: "passover",
            endMessage: "ChangeToHeart"
          }
        }],
        endState: "start",
        target: 'button1'          
      }, { 
        event: "animstart",  
        actions: [{
          func: Actions.changeImg,
          params: {
            img: face
          }
        }], 
        endState: "start"
      },{ 
        event: "animmove",  
        actions: [{
          func: Actions.followEventPosition
        }],
        endState: "start"
      },{ 
        event: "animend",  
        actions: [{
          func: Actions.followEventPosition
        },{
          func: Actions.changeImg,
          params: {
            img: heart
          }
        },{
          func: Actions.alertend,
        }],
        endState: "start"
      }
    ] 
  }] 
});

actor2.setFSM({ 
  states: [ 
  { 
    name: "start", 
    transitions: [ 
      { 
        event: "mousedown",  
        actions: [{
          func: Actions.getDragFocus  
        }
        ],
        endState: "start"
      },{ 
        event: "dragmove",  
        actions: [{
          func: Actions.followEventPosition  
        }],
        endState: "start"
      },{ 
        event: "dragend",  
        actions: [{
          func: Actions.dropDragFocus  
        }],
        endState: "start"
      }
    ] 
  }] 
});



//When the DOM has loaded, actually setup our game
window.onload = function() { 
  var game = new Game(document.getElementById("game"));
  game.addActor(actor2);
  game.addActor(actor1);
  
  //game.addActor(actor3);
  //game.addActor(actor4);
  

  console.log(game.actors);
  
  document.getElementById("button0").addEventListener("click", function(event) {
    event = _.clone(event);
    event.type = "buttonpress";
    game.dispatchToAll(event);
  });
  
  document.getElementById("button1").addEventListener("click", function(event) {
    event = _.clone(event);
    event.type = "buttonpress";
    game.dispatchToAll(event);
  });

  document.getElementById("button2").addEventListener("click", function(event) {
    event = _.clone(event);
    event.type = "buttonpress";
    game.dispatchToAll(event);
  });

  document.getElementById("button3").addEventListener("click", function(event) {
    actor1.x = x1;
    actor1.y = y1;
    actor2.x = x2;
    actor2.y = y2;
    game.run();
  });
  
  //Wait for all of the imaages to load in before we start the game
  var runGame = function() {
    if (loadCounter >= totalImg)
      game.run();
    else
      setTimeout(function() { runGame() }, 200);
  }
  runGame();
};



