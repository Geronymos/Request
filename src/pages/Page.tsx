import { IonButtons, IonButton, IonIcon, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { helpCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import Request from '../components/Request';
import { filePicker } from '../data/apiStore';
import {APIDescription, APIOutput, APIRequest} from '../types/types';
import './Page.css';

// import jmespath from "jmespath";
import { useEffect, useState } from 'react';
const jmespath = require("jmespath");

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [store, setStore] = useState<APIDescription[]>(JSON.parse(localStorage.api || "[]"));

  const [output, setOutput] = useState<APIOutput[]>([]);

  async function loadAPI() {
    const files: string[] = await filePicker();
    const newAPI:APIDescription = JSON.parse(files[0]);
    if (!store.some((api:APIDescription) => api.name == newAPI.name)) setStore([...store, newAPI])
    else alert(`API named ${newAPI.name} was already saved!`);
  }

  useEffect(() => {
    localStorage.api = JSON.stringify(store);
    console.log(store);
    store[0] && getAPI(store[0]);
  }, [store]);

  async function getAPI(api: APIDescription) {

    // console.log("api", api, api.request, api.parse);
    const args = {
      subreddit: "mildlyinteresting",
      sort: "top"
    };

    const proxy = "https://cors-anywhere.herokuapp.com/";


    const request:APIRequest = jmespath.search(args, api.request );
    const response = await fetch(proxy + request.url);
    const json = await response.json();
    const data:APIOutput[] = jmespath.search(json, api.parse);

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
