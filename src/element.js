
class Element {
  constructor(type, attrs, children) {
    this.type = type
    this.attrs = attrs
    this.children = children
  }
}

function createElement(type, attrs, children) {
  return new Element(type, attrs, children)
}

function setAttr(node, key, value){
  switch(key){
    case 'value': // input textarea
      if(node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA'){
        node[key] = value
      } else{
        node.setAttribute(key, value)
      }
      break;
    case 'style':
      node.style.cssText = value
      break;
    default:
      node.setAttribute(key, value)
      break;
  }
}

function render(virtualDom){
  const { type, attrs, children } = virtualDom
  let el = document.createElement(type)

  // 挂载属性
  for(let key in attrs){
    setAttr(el, key, attrs[key])
  }

  children.forEach(child=>{
    if(child instanceof Element){
      // 节点
      el.appendChild(render(child))
    }else{
      // 文本
      let textNode = document.createTextNode(child)
      el.appendChild(textNode)
    }
  })
  return el
}

function renderDom(el, target){
  target.appendChild(el)
}

export { createElement, render, renderDom, Element, setAttr }