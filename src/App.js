import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { Amplify, API, Auth } from 'aws-amplify';
import React from 'react';
import './App.css';


Amplify.configure({
    // OPTIONAL - if your API requires authentication 
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'ap-northeast-1:b29a7f5f-2b4c-496e-b4cb-bb9f50b664e3',
        // REQUIRED - Amazon Cognito Region
        region: 'ap-northeast-1', 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'ap-northeast-1_9qsdYF2Li', 
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '10k1opd4kei0gc3fe5f3cb8q2h',
    },
    API: {
        endpoints: [
            {
                name: "develop",
                endpoint: "https://judxpr4tu5.execute-api.ap-northeast-1.amazonaws.com/develop"
            },
        ]
    }
});


function App({ signOut }) {
  const handleClick = async function () {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    const myInit = {
      headers: {
        Authorization: token,
      },
    };

    const res = await API.get('dev', '/greeting', myInit);
    console.log(res);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={handleClick}>Click me</button>
        <Button onClick={signOut}>Sign Out</Button>
      </header>
    </div>
  );
}


export default withAuthenticator(App);
