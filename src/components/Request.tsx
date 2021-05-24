import { IonAvatar, IonItem, IonList, IonNote, IonLabel, IonCard } from "@ionic/react";
import jmespath from "jmespath";
import React, { useEffect, useState } from "react";
import Card from "./Card";


const Request: React.FC = () => {


    const [output, setOutput] = useState([])

    async function getData() {
        const response = await fetch("https://cors-anywhere.herokuapp.com/https://reddit.com/r/mildlyinteresting.json");
        const json = await response.json();
        const data = jmespath.search(json, "data.children[].data");
        console.log(data);
        setOutput(data);
    }

    useEffect(() => { getData() }, []);

    return (
        <div>
            {output?.map(({ title, author, id, thumbnail: image }) => <Card title={title} image={image} author={author} key={id}></Card>)}
        </div>
    );
};

export default Request;