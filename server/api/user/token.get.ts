export default eventHandler(async (event) => {
  return { token: await getCookie(event, "auth.token") };
});
