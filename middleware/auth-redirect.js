export default function ({ $auth, redirect, route, next, ...rest }) {
  // if the user is not authenticated, and we are not on the login or sign up page then redirect to the login page.
  if (!$auth.loggedIn && !["/login", "/sign-up"].includes(route.path)) {
    return redirect({ path: "/login", query: { from: route.path } });
    // if the user is authenticated, and we are not on the home page then redirect to the home page.
  } else if ($auth.loggedIn) {
    return next();
  }
}
