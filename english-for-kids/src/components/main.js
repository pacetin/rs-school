import DomBuilder from '../utilities/node_creator';

export default function createMain() {
  new DomBuilder('main').prepend(document.body).build();
}
