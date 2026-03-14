const KG_PER_STONE = 6.35029;
const KG_PER_LB = 0.453592;

interface StoneLbs {
  stones: number;
  lbs: number;
}

function kgToStoneLbs(kg: number): StoneLbs {
  let stones = Math.floor(kg / KG_PER_STONE);
  const remainderKg = kg - stones * KG_PER_STONE;
  let lbs = Math.round((remainderKg / KG_PER_LB) * 10) / 10;

  if (lbs >= 14.0) {
    stones += 1;
    lbs = 0.0;
  }

  return { stones, lbs };
}

function stoneLbsToKg(stones: number, lbs: number): number {
  return Math.round((stones * KG_PER_STONE + lbs * KG_PER_LB) * 10) / 10;
}

function init() {
  const kgInput = document.getElementById('kg') as HTMLInputElement;
  const stInput = document.getElementById('st') as HTMLInputElement;
  const lbsInput = document.getElementById('lbs') as HTMLInputElement;

  kgInput.addEventListener('input', () => {
    const kg = parseFloat(kgInput.value);
    if (isNaN(kg) || kgInput.value === '') {
      stInput.value = '';
      lbsInput.value = '';
      return;
    }
    const { stones, lbs } = kgToStoneLbs(kg);
    stInput.value = String(stones);
    lbsInput.value = lbs.toFixed(1);
  });

  function onImperialInput() {
    if (stInput.value === '' && lbsInput.value === '') {
      kgInput.value = '';
      return;
    }
    const stones = parseFloat(stInput.value) || 0;
    const lbs = parseFloat(lbsInput.value) || 0;
    const kg = stoneLbsToKg(stones, lbs);
    kgInput.value = kg.toFixed(1);
  }

  stInput.addEventListener('input', onImperialInput);
  lbsInput.addEventListener('input', onImperialInput);
}

init();
