import { render, Element, setAttr } from "./element";

let allPatches
let index = 0
function patch(node, patches) {
  allPatches = patches
  walk(node)
}

function walk(node) {
  let currentPatch = allPatches[index++]
  let childNodes = node.childNodes
  if (childNodes) {
    childNodes.forEach(child=>{
      walk(child)
    })
  }

  if (currentPatch) {
    doPatch(node, currentPatch)
  }
}

const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
function doPatch(node, patches) {
  switch (patches.type) {
    case REMOVE:
      node.remove()
      break;
    case REPLACE:
      let newNode
      if (patches.newNode instanceof Element) {
        newNode = render(patches.newNode)
      } else {
        newNode = document.createTextNode(patches.newNode)
      }
      node.parentNode.replaceChild(newNode, node)
      break;
    case ATTRS:
      // 挂载属性
      for (let key in patches.attrs) {
        let value = patches.attrs[key]
        if (value) {
          setAttr(node, key, value)
        } else {
          node.removeAttribute(key)
        }

      }
      break;
    case TEXT:
      node.textContent = patches.text
      break;
    default:
      break;
  }
}

export default patch
