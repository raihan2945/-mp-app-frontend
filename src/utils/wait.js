export const wait = async (time) => {
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
