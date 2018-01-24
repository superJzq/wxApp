import clientInterface from "/clientInterface.js";

function jsonToStr (json) {

  var returnParam = ""
  var str = ["jsonOnly=1"];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  returnParam += str.join("&")
  return returnParam
}

function dellUrl(url, params, method, loginToken){
  var post = {
    url: "",
    method: "", 
    params: {}
  }
  if (!params) {
    params = {}
  }
   if (!loginToken){
    loginToken = ''
  } 
   let Rand = Math.random();
  params.loginToken = loginToken
  params.__ajax_random__ = Rand
  if(!method){
    method = "get"
  }
  if(method == "all"){
    method = post;
  }
  
  console.log(params)
  if (url.substring(0, 6) == "Client") {
    post.url =  clientInterface[url].url;
  } else {
    post.url =  url
  }
  if (!method || method == 'get') {
    
    post.params = '?' + jsonToStr(params)
    post.url = post.url + post.params
  } else {
    post.params = params
  }
  post.method = method;
  
  console.log(post)
  return post;
}



export { dellUrl }