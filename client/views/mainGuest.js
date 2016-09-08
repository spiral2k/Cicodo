
Template.mainGuest.onRendered(function() {
  let settings = "part.json";
  this.autorun(function() {
    if (particlesJS) {
      console.log("loading particles.js config from ", settings)
      /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
      particlesJS.load('top-space', settings, function () {
        console.log('callback - particles.js config loaded');
      });
    }
  });
});