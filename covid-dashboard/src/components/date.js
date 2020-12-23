import NodeBuilder from '../utilities/nodeBuilder';

const dateCont = document.querySelector('.date-container');

export default function createDate(date) {
  const fragment = document.createDocumentFragment();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();

  const timeAndDateStr = `${day}/${redefineMonth(month)}/${year}, ${addZero(hour)} : ${addZero(min)}`;

  new NodeBuilder('p').inner('Last Updated At').app(fragment).build();
  new NodeBuilder('p').class('date').inner(timeAndDateStr).app(fragment)
    .build();
  dateCont.innerHTML = '';
  dateCont.appendChild(fragment);
}

function redefineMonth(month) {
  const MONTHS = {
    0: '01', 1: '02', 2: '03', 3: '04', 4: '05', 5: '06', 6: '07', 7: '08', 8: '09', 9: '10', 10: '11', 11: '12',
  };
  return MONTHS[month];
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
