import axios from "axios";

async function test() {
  try {
    let symbols = await axios.get("http://localhost:3000/aapl");
    console.log(symbols.data);
  } catch (e) {
    console.log("e: ", e);
  }
}

test();
