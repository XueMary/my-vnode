
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
const ATTRS = 'ATTRS'
const TEXT = 'TEXT'

function diffAttr(oldAttrs, newAttrs) {
  let attrs = {}
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      attrs[key] = newAttrs[key]
    }
  }

  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      attrs[key] = newAttrs[key]
    }
  }

  return attrs
}

let INDEX = 0
function diffChildren(oldChildren, newChildren, patches) {
  oldChildren.forEach((child, idx) => {
    walk(child, newChildren[idx], ++INDEX, patches)
  })
}

function isText(val){
  return (typeof val === 'string' || typeof val === 'number')
}

function walk(oldNode, newNode, index, patches) {
  if (!newNode) {
    patches[index] = { type: REMOVE }
  } else if(isText(oldNode)&&isText(newNode)){
    if(oldNode !== newNode){
      patches[index] = { type: TEXT, text: newNode }
    }
  } else if (oldNode.type !== newNode.type) {
    patches[index] = { type: REPLACE, newNode } 
    diffChildren(oldNode.children, newNode.children, patches)
  } else if (oldNode.type === newNode.type) {
    let attrs = diffAttr(oldNode.attrs, newNode.attrs)
    if (Object.keys(attrs).length) {
      patches[index] = { type: ATTRS, attrs }
    }

    diffChildren(oldNode.children, newNode.children, patches)
  }
}

function diff(oldThree, newThree) {
  let patches = {}
  let index = 0

  // 递归比较
  walk(oldThree, newThree, index, patches)

  return patches;
}



export default diff
