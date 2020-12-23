import NodeBuilder from '../utilities/nodeBuilder';

export default class ControlBar {
  constructor(view, states, container) {
    this.view = view;
    this.states = states;
    this.container = container;
  }

  init() {
    const buttonLeft = new NodeBuilder('span').class('arrow-left').app(this.container).build();
    buttonLeft.addEventListener('click', this.view.changeStateFromButton.bind(this.view));

    const select = new NodeBuilder('select').class('button-text').app(this.container).build();
    select.addEventListener('change', this.view.changeStateFromSelect.bind(this.view));
    new NodeBuilder('option').attr('disabled', 'true').inner('Choose indicator:').app(select)
      .build();
    this.states.forEach((item, index) => {
      if (index === 0) {
        new NodeBuilder('option').attr('value', item).attr('selected', 'true').inner(item)
          .app(select)
          .build();
      } else {
        new NodeBuilder('option').attr('value', item).inner(item).app(select)
          .build();
      }
    });

    const buttonRight = new NodeBuilder('span').class('arrow-right').app(this.container).build();
    buttonRight.addEventListener('click', this.view.changeStateFromButton.bind(this.view));

    this.view.selectField = select;
  }
}
