# Powershell script to create html-capture.xpi

if (Test-Path 'html-capture.xpi' ){
    Remove-Item 'html-capture.xpi'
}
if (Test-Path 'html-capture.zip' ){
    Remove-Item  'html-capture.zip'
}

Compress-Archive -Path 'src\*' -DestinationPath 'html-capture.zip'

Rename-Item 'html-capture.zip' 'html-capture.xpi'
