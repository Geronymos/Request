import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonImg, IonItem, IonNote } from "@ionic/react"

import {APIOutput} from '../types/types';

const Card: React.FC<APIOutput> = ({ title, author, image, description, authorimage, start, end }) => {
    return (
        <IonCard>
            {image && <IonImg src={image} />}
            <IonCardHeader>
                {author && <IonCardSubtitle>{author}</IonCardSubtitle>}
                {authorimage && <IonAvatar slot="start">
                    <img src={authorimage}></img>
                </IonAvatar>}
                {title && <IonCardTitle>{title}</IonCardTitle>}
                {start || end && <IonNote>{start} | {end}</IonNote>}
            </IonCardHeader>
            <IonCardContent>
                {description}
            </IonCardContent>
        </IonCard>
    )
}

export default Card;