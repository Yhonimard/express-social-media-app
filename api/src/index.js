import db from "./config/db";
import server from "./config/server";

async function init() {
  try {
    const PORT = process.env.PORT || 3000
    server.listen(PORT, () => {
      console.log(`run on port ${PORT}`);
    })
    db.$disconnect()
  } catch (error) {
    console.log("error from index", error);
    db.$disconnect()
    process.exit(1)
  }
}

init()
