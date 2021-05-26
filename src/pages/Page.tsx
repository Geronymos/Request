import { IonButtons, IonButton, IonIcon, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { helpCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import Request from '../components/Request';
import { filePicker } from '../data/apiStore';
import './Page.css';

// import jmespath from "jmespath";
import { useState } from 'react';
const jmespath = require("jmespath");

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [output, setOutput] = useState([]);

  async function loadAPI() {
    const files: string[] = await filePicker();
    const api = JSON.parse(files[0]);
    console.log("api", api, api.request, api.parse);
    const args = {
      subreddit: "mildlyinteresting",
      sort: "top"
    };

    const proxy = "https://cors-anywhere.herokuapp.com/";

    // const request = jmespath.search(args, "['http://reddit.com/r/', subreddit, '.json'] | join('', @) | {method: 'GET', url: @}");

    const request = jmespath.search(args, api.request );
    console.log(request);
    const response = await fetch(proxy + request.url);
    const json = await response.json();
    console.log(json);
    // const data = jmespath.search(json, "data.children[].data[].{title: title, author: author, image: url}");
    const data = jmespath.search(json, api.parse);

    setOutput(data);
    return data;

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          <IonButtons slot="primary">
            <IonButton onClick={() => { loadAPI() }}>
              <IonIcon slot="icon-only" icon={helpCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Request output={output}/>
      </IonContent>
    </IonPage>
  );
};

export default Page;
