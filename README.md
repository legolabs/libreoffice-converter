# libreoffice-converter
A NestJS API server that exploits LibreOffice engine to convert documents

## Supported formats
All LibreOffice supported in/out formats. A sample list:

* ### Word processors

  Input: docx, doc, odt, rtf, txt, ott, uot, dot, docm

  Output: [all input formats] + pdf, epub, jpg, png, xml, html

* ### Spreadsheets
  
  Input: xls, ods, ots, fods, uos, dif, dbf, slk, csv, xlsm

  Output: [all input formats] + pdf, jpg, png, html

* ### Presentations
  
  Input: odp, uop, ppt, ppsx, potx, pps, pot, pptx, ppsx, potx, pptm

  Output: [all input formats] + pdf, jpg, png

## How to use
Server accepts a POST request at the endpoint: http://server:4000/convert

Conversion request post fields:

```
{
    fileBase64: base64 encoded input file
    inputFormat: input file format
    outputFormat: output file format
    timeout: conversion time limit in seconds (default: 30)
}
```

Success output:

```
{
  statusCode: 200
  fileBase64: base64 encoded output file
  format: output format (same as requested)
}
```

Error output:

```
{
  statusCode: not 200
  message: error message string
}
```

## ToDo list
- [ ] HTTPS support
- [ ] Authentication
- [ ] Output image size specification
- [ ] Images formats as input