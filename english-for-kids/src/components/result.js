import DomBuilder from '../utilities/node_creator';

export default function createResult(mistakes) {
  const fragment = document.createDocumentFragment();
  let classString = 'result';
  let text;

  if (mistakes !== 0) {
    classString += ' result_failure';
    text = (mistakes === 1) ? `You made ${mistakes} mistake!` : `You made ${mistakes} mistakes!`;
  } else {
    text = 'Awesome!!!';
  }

  new DomBuilder('div').class('congrats').inner(text).append(fragment)
    .build();
  new DomBuilder('div').class(classString).append(fragment).build();

  return fragment;
}
