export async function requireAuth() {
  const storeOne = localStorage.getItem("user");
  const storeTwo = JSON.parse(storeOne);
  const isLoggedIn = storeTwo === null ? false : true;

  if (!isLoggedIn) {
    return true;
  }
  return isLoggedIn;
}
