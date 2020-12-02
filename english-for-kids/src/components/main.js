import DomElementBuilder from '../utilities/node_creator';

export default function createMain() {
  new DomElementBuilder('main')
    .prepend(document.body)
    .build();
}
