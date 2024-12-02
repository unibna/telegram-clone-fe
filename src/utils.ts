const isDefaultTimestamp = (lastSeen: string) => {
  const defaultDate = new Date("0001-01-01T00:00:00Z");
  const userDate = new Date(lastSeen);
  return userDate.getTime() === defaultDate.getTime();
};

export {
  isDefaultTimestamp
}
