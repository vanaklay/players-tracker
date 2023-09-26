export const getTodayDate = () => new Date().toISOString().slice(0, 10);

export const isProvidedBody = (body) => Object.keys(body).length !== 0;

export const isValidBody = (body) => {
  const firstName = body.firstName;
  const lastName = body.lastName;

  if (!firstName || !lastName) return false;

  if (body.firstName === undefined || body.lastName === undefined) return false;

  return true;
};
