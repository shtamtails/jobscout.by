interface IDisableButtonTimer {
  time: number;
  setCounter?: Function;
  setButtonDisalbed: Function;
}

export const disableButtonTimer = ({ time = 60, setCounter, setButtonDisalbed }: IDisableButtonTimer) => {
  setButtonDisalbed(true);
  let timer = time;
  const interval = setInterval(() => {
    timer -= 1;
    setCounter && setCounter(timer);

    if (timer === 0) {
      clearInterval(interval);
      setButtonDisalbed(false);
    }
  }, 1000);
};
