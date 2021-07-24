var is_manual_capture = false;
var last_captured = 0;

// ref. https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage
function recvLog_proc(request) {
// input  : JSON
//          style : { html_log: html_log }
//          see onLogLoad() in webpage.js
// output : none
  console.log('recvLog_proc() start.');
  // check if Capture timing
  var now = Date.now();
  var is_capture = false;
  // (1) check if Manual Capture
  if (is_manual_capture == true){
    is_capture = true;
    is_manual_capture = false;
  }
  // (2) check if Auto Capture
  var is_auto_capture = document.getElementById("is_auto_capture").checked ? true : false;
  var auto_capture_cycle = parseInt(document.getElementById("auto_capture_cycle").value) * 1000;
  if (is_auto_capture == true && (now - last_captured) >= auto_capture_cycle) {
    is_capture = true;
  }
  // (3) stop process if not Capture timing.
  if (is_capture == false){
    console.log('recvLog_proc() returned. reason: skip capture.');
    return;
  }
  last_captured = now;
  var datestring =  new Date(parseInt(now)).toISOString();

  // create download file
  console.log('recvLog_proc() Create Download File');
  var download_data = new Blob([request.html_log], {type: "text/plain"});
  var download_data_url = URL.createObjectURL(download_data);
  console.log('recvLog_proc() Create Download File : ' + download_data_url);

  // print log to sidebar
  console.log('recvLog_proc() print log to sidebar.');
  var print_list = document.getElementById("log_list"); // as ul tag
    var li = document.createElement('li');
      var a = document.createElement('a');
      a.href=download_data_url;
      a.target="_blank";
      a.download = download_data_url + '.txt';
      a.textContent = datestring;
    li.insertAdjacentElement('afterbegin', a);
  print_list.insertAdjacentElement('afterbegin', li);

  // return
  console.log('recvLog_proc() finished.');
  return;
};

function set_manual_capture(e) {
  console.log('set_manual_capture() called by ' + e);
  is_manual_capture = true;
  return;
}
document.getElementById("is_manual_capture").addEventListener("click", function(e){ set_manual_capture(e); }, true);
