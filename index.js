var hue = require("node-hue-api"),
   HueApi = hue.HueApi,
   lightState = hue.lightState;

var host = "10.90.0.1";
var username = "Lm8qvSNjMRYDSTT9goaHcAuCdQKAo5V70U4QUtpH";
var api = new HueApi(host, username);
var state = lightState.create();
var numberOfLights = 0;
var counter = 1;
var currentState = false;

api.lights((error, data)=> {
  if(error) throw error;
  numberOfLights = data.lights.length;
  data.lights.forEach((light)=> {
    api.setLightState(light.id, state.off())
  });
});

function random(){
  api.lights((error, data)=> {
    if(error) throw error;
    data.lights.forEach((light)=> {
      if(Math.random() >= 0.5){
        api.setLightState(light.id, state.off())
      } else {
        api.setLightState(light.id, state.on())
      }
    });
  });
}

function blink(){
  api.lights((error, data)=> {
    if(error) throw error;
    data.lights.forEach((light)=> {
      if(currentState){
        api.setLightState(light.id, state.off())
      } else {
        api.setLightState(light.id, state.on())
      }
    });
    currentState = !currentState;
  });
}

function cycle(){
  api.lights((error, data)=> {
    if(error) throw error;
    data.lights.forEach((light)=> {
      if(light.id != counter){
        api.setLightState(light.id, state.off())
      } else {
        api.setLightState(light.id, state.on())
      }
    });
  });
  counter++;
  if(counter > numberOfLights) counter = 1;
}

console.log("Looping");
console.log("ctrl + c to quit");
setInterval(cycle, 1000);
