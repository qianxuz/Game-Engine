/**
 * @constructor
 * @param {props} An object containing properties for the actor
 */
function Actor(props) {
  this.parent = null; //Set in the game.addActor method
  this.states = [];
  this.currentState = null;
  this.x = props.x;
  this.y = props.y;
  this.width = props.width;
  this.height = props.height;
  this.img = props.img;
  //this.addEventListener("onmousedown", this.deliverEvent(event));

  //TODO add additional properties for each eactor

};

/**
 * Sets the FSM for the particular actor. 
 * @param {Object} FSM object as detailed in the instructions
 */
Actor.prototype.setFSM = function(fsm) {
  this.states = fsm.states;
  this.currentState = fsm.states[0];
}

/**
 * Recieves an event from dispatch and transitions the FSM appropriately
 * @param {Event} The event object recieved, which includes certain information depending on the event type
 * @return {boolean} True if the event was consumed by the actor, false if it was not consumed
 */
Actor.prototype.deliverEvent = function(event) {
  //console.log(event.type);
	for(var i = 0; i < this.states.length; i++){
    if(this.currentState.name === this.states[i].name){
  		for(var j = 0; j < this.states[i].transitions.length; j++){
        if(matchEvent(event, this.states[i].transitions[j])){
          this.makeTransition(event, this.states[i].transitions[j]);
  			  return true;
        }
		  }
	  }
  }
  return false;
  //TODO
}

/**
 * Transitions the FMS for a particular transition and event
 * @param {Event} event object recieved, which includes certain information depending on the event type
 */
Actor.prototype.makeTransition = function(event, transition) {
  for (var l = 0; l<this.states.length;l++){
    if(this.states[l].name===transition.endState)
      this.currentState = this.states[l];
  }
  for (var i = 0; i < transition.actions.length; i++){
    transition.actions[i].func(event, transition.actions[i].params, this);
  }
  //TODO
}

/**
 * Draws the actor on the canvas based on its parameters
 * @param {Context} The HTML5 canvas context object to be drawn on. 
 */
Actor.prototype.draw = function(context) {
	context.drawImage(this.img, this.x, this.y, this.width, this.height);
  //TODO
}

/**
 * Matches a particular event with the appropriate transition
 * @param {Event} event to match
 * @param {Object} transition to match
 * @return {boolean} True if the transition and even match, false otherwise
 */ 
var matchEvent = function(event, transition) {
  // console.log(event.type === transition.event + " " + event.target)
  if((transition.event === event.type) && 
    (event.message === transition.message) &&
    (transition.target === undefined || event.target.id === transition.target)){
    return true;
  } else {
    return false;
  }
  //TODO
}
