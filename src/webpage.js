console.log('Loading webpage.js...');

// onLogLoad
function handleResponse(message){
  // nop.
  console.log('handleResponse(): ' + message.response); // message object is defined in sidebar.js
}
function handleError(error){
  // nop.
  console.log('handleError(): ' + error);
}
function onLogLoad() {
  var target = top.document.documentElement;

  var village_log_html = JSON.parse(JSON.stringify(target.innerHTML));
  var village_msg = { html_log: village_log_html};
  var send_object = browser.runtime.sendMessage(village_msg);
  send_object.then(handleResponse).catch(handleError);
}
setInterval(onLogLoad, 300);

console.log('Loaded.');