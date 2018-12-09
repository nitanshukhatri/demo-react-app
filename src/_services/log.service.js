import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://7ea2cd74e711492aafe34bd6988df33e@sentry.io/1340380"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
