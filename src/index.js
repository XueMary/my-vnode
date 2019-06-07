
import { createElement, render, renderDom } from "./element";

let virtualDom = createElement('ui', { class: 'li-group' }, [
  createElement('li', { class: 'item' }, ['a']),
  createElement('li', { class: 'item' }, ['b'])
])

let el = render(virtualDom, document.getElementById('root'))

renderDom(el, document.getElementById('root'))