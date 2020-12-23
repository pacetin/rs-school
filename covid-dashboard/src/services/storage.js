function set(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

function get(name, subst = null) {
  return JSON.parse(localStorage.getItem(name) || subst);
}

function del(name) {
  localStorage.removeItem(name);
}

export { set, get, del };
