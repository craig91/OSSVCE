const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    sayHello: () => 'Hello from preload!'
});