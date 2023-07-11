const { contextBridge, ipcRenderer, systemPreferences } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  requestWebcamAccess: async () => {
    try {
      const accessGranted = await systemPreferences.askForMediaAccess("camera");
      if (accessGranted) {
        console.log("Webcam access granted");
        // Your code to use the webcam here
      } else {
        console.log("Webcam access denied");
        // Handle denial of access
      }
    } catch (error) {
      console.error("Error requesting webcam access:", error);
      // Handle error
    }
  },
});
