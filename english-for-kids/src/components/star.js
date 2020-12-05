import DomBuilder from '../utilities/node_creator';

export const correct = 'correct';
export const error = 'error';

export function createStar(type) {
  let classString = 'star';
  if (type === error) {
    classString += ' star_error';
  }
  return new DomBuilder('div').class(classString).build();
}
