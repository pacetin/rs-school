/**
* @param {String} tagName
* @param {String} className
* @param {HTMLElement} parent
* @param  {String} text
*/

export default class DomBuilder {
  constructor(tagName) {
    this.tagName = tagName;
  }

  class(className) {
    this.className = className.split(' ');
    return this;
  }

  addId(id) {
    this.id = id;
    return this;
  }

  prepend(parent) {
    this.parent = ['prepend', parent];
    return this;
  }

  append(parent) {
    this.parent = ['append', parent];
    return this;
  }

  inner(text) {
    this.text = text;
    return this;
  }

  attr(attrName, attrString) {
    if (this.attribute) {
      this.attribute.push([attrName, attrString]);
    } else {
      this.attribute = [];
      this.attribute[0] = [attrName, attrString];
    }
    return this;
  }

  build() {
    const element = document.createElement(this.tagName);
    if (this.className) {
      this.className.forEach((item) => {
        element.classList.add(item);
      });
    }
    if (this.id) {
      element.setAttribute('id', this.id);
    }
    if (this.parent) {
      if (this.parent[0] === 'append') {
        this.parent[1].appendChild(element);
      } else {
        this.parent[1].prepend(element);
      }
    }
    if (this.text) {
      element.textContent = this.text;
    }
    if (this.attribute) {
      this.attribute.forEach((item) => {
        element.setAttribute(item[0], item[1]);
      });
    }
    return element;
  }
}
