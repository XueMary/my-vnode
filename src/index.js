
import { createElement, render, renderDom } from "./element";
import diff from './diff'
import patch from './patch'

let virtualDom1 = createElement('ui', { class: 'li-group' }, [
  createElement('li', { class: 'item' }, ['a']),
  createElement('li', { class: 'item' }, ['b'])
])

let virtualDom2 = createElement('ui', { class: 'lis-group' }, [
  createElement('div', { class: 'item' }, ['a']),
  createElement('li', { class: 'items' }, ['2'])
])

let el = render(virtualDom1)

renderDom(el, document.getElementById('root'))
/*
patches:
{ type: REPLACE, newNode } 节点替换
{ type: REMOVE, index } 节点删除
{ type: ATTRS, attrs }  属性变更
{ type: TEXT, text }  文本变更
*/
let patches = diff(virtualDom1, virtualDom2)
console.log(patches)

patch(el, patches)