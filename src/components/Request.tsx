import { IonAvatar, IonItem, IonList, IonNote, IonLabel, IonCard } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Card from "./Card";
interface CardInputProps {
    title?: string,
    author?: string,
    image?: string,
    authorimage?: string,
    description?: string,
    start?: string,
    end?: string
}

const Request: React.FC<{output: CardInputProps[]}> = ({output}) => {

    // useEffect(() => { getData() }, []);

    return (
        <div>
            {output?.map(({ title, author, image }, id) => <Card title={title} image={image} author={author} key={id}></Card>)}
        </div>
    );
};

export default Request;