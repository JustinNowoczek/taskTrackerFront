function dateConvert(date) {
  let isOverdue;
  date = new Date(date);
  date = date - Date.now();
  isOverdue = date < 0 ? (isOverdue = true) : (isOverdue = false);
  date = Math.abs(date);

  let units = [0, 0, 0, 0, 0];
  let accumulatedMS = 0;

  function mulCalc(lvl) {
    let multipliers = [1000, 60, 60, 24, 7],
      calculated = 1;
    for (let i = 0; i < lvl; i++) {
      calculated *= multipliers[i];
    }
    return calculated;
  }
  function updateMS(lvl) {
    accumulatedMS += Math.floor(units[5 - lvl]) * mulCalc(lvl);
  }

  units[0] = date / mulCalc(5);
  updateMS(5);
  units[0] = Math.floor(units[0]);

  units[1] = (date - accumulatedMS) / mulCalc(4);
  updateMS(4);
  units[1] = Math.floor(units[1]);

  units[2] = (date - accumulatedMS) / mulCalc(3);
  updateMS(3);
  units[2] = Math.floor(units[2]);

  units[3] = (date - accumulatedMS) / mulCalc(2);
  updateMS(2);
  units[3] = Math.floor(units[3]);

  units[4] = (date - accumulatedMS) / mulCalc(1);
  updateMS(1);
  units[4] = Math.floor(units[4]);
  return { dueDate: units, isOverdue };
}

export default dateConvert;
