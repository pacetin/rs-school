export function set(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

export function get(name, subst = null) {
  return JSON.parse(localStorage.getItem(name) || subst);
}

export function del(name) {
  localStorage.removeItem(name);
}
