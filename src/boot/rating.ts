/* eslint-disable prefer-const */
import { boot } from 'quasar/wrappers';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do

  app.directive('rate', {
    mounted: (el: HTMLElement, binding) => {
      const ratings: { rate: number }[] = binding.value;
      let rate = 0;
      const count = ratings.length;
      const totalSumRate = ratings.reduce(
        (x, y: { rate: number }) => x + y.rate,
        0
      );
      rate = totalSumRate / count;
      if (isNaN(rate) || rate < 1) {
        el.classList.add('text-red-14');
        el.innerHTML += '<span>0.0</span>';
      } else {
        el.classList.add('text-green-14');
        el.innerHTML += `<span>${rate.toFixed(1)}</span>`;
      }
    },
    
  });
});
