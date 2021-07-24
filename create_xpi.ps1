# Powershell script to create firefox-sidebar-html-capture.xpi

if (Test-Path 'firefox-sidebar-html-capture.xpi' ){
    Remove-Item 'firefox-sidebar-html-capture.xpi'
}
if (Test-Path 'firefox-sidebar-html-capture.zip' ){
    Remove-Item  'firefox-sidebar-html-capture.zip'
}

Compress-Archive -Path 'src\*' -DestinationPath 'firefox-sidebar-html-capture.zip'

Rename-Item 'firefox-sidebar-html-capture.zip' 'firefox-sidebar-html-capture.xpi'
