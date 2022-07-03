import { ref } from 'vue';

export default startValue => {
  const count = ref(startValue);
  const doDownCount = () => {
    if (count.value > 1) {
      count.value -= 1;
    }
  };

  const doUpCount = () => {
    count.value += 1;
  };

  return {
    count,
    doUpCount,
    doDownCount
  };
};
