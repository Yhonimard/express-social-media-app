import config from "./config";
import server from "./config/express";

async function init() {
  try {
    const { port, host } = config("/");
    const express = server()
    express.listen(port, () => {
      console.log(`run on port ${port}`);
    })
  } catch (error) {
    console.log(`error from index ${error}`);
    process.exit(1);
  }
}

init();
