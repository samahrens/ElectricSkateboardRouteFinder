import './App.css';
import getSegments from './auth/getSegments';

//initial access token and refresh token
let accessToken = process.env.REACT_APP_accessToken;
const refreshToken = process.env.REACT_APP_refreshToken;

const makeGetRequest = async () => {
  let response = await getSegments(accessToken, refreshToken);
  if (response == null) {
    return;
  }
};

function App() {
  return (
    <div className="App">
      <button onClick={makeGetRequest}>hello</button>
    </div>
  );
}

export default App;
