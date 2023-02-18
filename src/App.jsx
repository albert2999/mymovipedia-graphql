import './App.css';
import { useQuery } from '@apollo/client';
import { test } from './gql/Query';



function App() {
  const {loading, error, data} = useQuery(test)
  console.log("🚀 ~ file: App.js:10 ~ App ~ loading", loading)
  console.log("🚀 ~ file: App.js:10 ~ App ~ error", error)
  console.log("🚀 ~ file: App.js:10 ~ App ~ data", data)
  return (
    <div className="App">
      <div>
      { 
        data?.movies.map(e => (
          <>
          <h1>
          {e.name}
          </h1>
          </>
          ))
      }
      </div>
    </div>
  );
}

export default App;
