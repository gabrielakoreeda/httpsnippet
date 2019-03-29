/**
 * @description
 * HTTP code snippet generator for R using httr
 *
 * @author
 * @gabrielakoreeda
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

var util = require('util')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function(source, options){
 // Start snippet
 var code = new CodeBuilder()

 // Import httr
 code.push('library(httr)')
     .blank()

 // Set URL
 code.push('url <- "%s"', source.url)
     .blank()

 // Construct query string
 var query
 var qs = source.queryObj
 var queryCount = Object.keys(qs).length

 if (queryCount === 1) {
     for (query in qs) {
       code.push('queryString <- list(\'%s\' = \'%s\')', query, qs[query])
           .blank()
     }
 } else if (queryCount > 1) {
     var count = 1
   
     code.push('queryString = list(')
   
     for (query in qs) {
       if (count++ !== queryCount) {
         code.push(1, '\'%s\' = "%s",', query, qs[query])
       } else {
         code.push(1, '\'%s\' = "%s"', query, qs[query])
       }
     }
   
     code.push(1, ')')
         .blank()
 }
   
 // Construct payload
 var payload = JSON.stringify(source.postData.text)

 if (payload) {
   code.push('payload <- %s', payload)
       .blank()
 }

 // Define encode
 var encode
 if (source.postData.text || source.postData.jsonObj || source.postData.params){
   switch (source.postData.mimeType) {
     case 'application/x-www-form-urlencoded':
       code.push('encode <- "form"')
           .blank()
       break;

     case 'application/json':
       code.push('encode <- "json"')
           .blank()
       break;

     case 'multipart/form-data':
       code.push('encode <- "multipart"')
           .blank()
       break;

     default:
       code.push('encode <- "raw"')
           .blank()
       break;
   }
 }

 // Construct headers
 var header
 var headers = source.allHeaders
 var headerCount = Object.keys(headers).length

 if (headerCount === 1) {
     for (header in headers) {
       code.push('headers <- list(\'%s\' = \'%s\')', header, headers[header])
           .blank()
     }
 } else if (headerCount > 1) {
   var count = 1

   code.push('headers <- list(')

   for (header in headers) {
     if (count++ !== headerCount) {
       code.push(1, '\'%s\' = "%s",', header, headers[header])
     } else {
       code.push(1, '\'%s\' = "%s"', header, headers[header])
     }
   }

   code.push(1, ')')
       .blank()
 }

 // Construct request
 var method = source.method
 var request = util.format('response <- VERB("%s", url', method)

 if (payload) {
   request += ', body = payload'
 }

 if (headerCount > 0) {
   request += ', add_headers(headers)'
 }

 if (qs) {
   request += ', query = queryString'
 }

 if (encode) {
   request += ', encode = encode'
 }

 request += ')'

 code.push(request)
     .blank()

     // Print response
     .push('content(response, "text")')
 
 return code.join()
}

module.exports.info = {
   key: 'httr',
   title: 'httr',
   link: 'https://cran.r-project.org/web/packages/httr/vignettes/quickstart.html',
   description: 'R HTTP library'
}