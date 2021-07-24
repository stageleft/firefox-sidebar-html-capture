// refs: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage
"use strict";

console.log('Loading sidebar.js...');

var recvLog_lock = false;

function recvLog(request) {
  try{
    if (recvLog_lock == false) {
      recvLog_lock = true;
      recvLog_proc(request);
      recvLog_lock = false;
    };
    return Promise.resolve({response: "OK"});  
  } catch (error) {
    return Promise.reject({response: error});  
  }
};
browser.runtime.onMessage.addListener(recvLog);

console.log('Loaded.');