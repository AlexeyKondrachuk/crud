
import { Notes } from "./components/notes";
import "./App.css"



const App = () => {

  return (
    <>
      <Notes url={`http://localhost:7070/notes`}/>
    </>
  );
};

export default App;