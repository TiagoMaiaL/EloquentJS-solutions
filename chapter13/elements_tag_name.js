/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 13
 * Elements by tag name
 */
 
/**
 * Gets the child elements which have tagName as the tag.
 * @param  Node node
 * @param  String tagName
 * @return array
 */
function byTagName(node, tagName) {
  var tags = [];
  
  if (node.nodeType == document.ELEMENT_NODE) {
    
    if (node.tagName.toLowerCase() == tagName.toLowerCase()) {      
      tags.push(node);
    }
  
    for (var i = 0; i < node.childNodes.length; i++) {
      tags = tags.concat(byTagName(node.childNodes[i], tagName));
    }
  }
  
  return tags;
}

console.log(byTagName(document.body, "h1").length);
// → 1
console.log(byTagName(document.body, "span").length);
// → 3
var para = document.querySelector("p");
console.log(byTagName(para, "span").length);
