import config from "./config";
import express from "./config/express"



async function init() {
  try {
    const server = express()
    const { port, host } = config("/");

    server.listen(port, host, () => {
      console.log(`run on port ${port}`);
    })

  } catch (error) {
    console.log(`error from index ${error}`);
    process.exit(1);
  }
}

init();
