import { states } from '../constants/common';

export function getFieldAccordingState(stateArray) {
  const isRelative = (stateArray[0] !== 'absolute');
  const indicator = stateArray[1];
  let field;
  switch (indicator) {
    case states[1][0]:
      field = isRelative ? 'casesPer100K' : 'cases';
      break;
    case states[1][1]:
      field = isRelative ? 'deathsPer100K' : 'deaths';
      break;
    case states[1][2]:
      field = isRelative ? 'recoveredPer100K' : 'recovered';
      break;
    case states[1][3]:
      field = isRelative ? 'todayCasesPer100K' : 'todayCases';
      break;
    case states[1][4]:
      field = isRelative ? 'todayDeathsPer100K' : 'todayDeaths';
      break;
    case states[1][5]:
      field = isRelative ? 'todayRecoveredPer100K' : 'todayRecovered';
      break;
    default:
      // no default case
      break;
  }
  return field;
}

export function getSelectElement(optionText, selectFields) {
  /* eslint-disable arrow-body-style */
  const element = selectFields.find((item) => {
    return Array.from(item.options).some((option) => option.value === optionText);
  });
  return element;
}
