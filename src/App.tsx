import { items } from "./data/etsy";
import { Listing } from "./components/Listing";
import "./main.css";

function App() {
  return (
    <div className="wrapper">
      <Listing items={items} />
    </div>
  );
}
export default App;
