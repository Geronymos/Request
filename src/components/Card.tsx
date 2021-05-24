import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonImg, IonItem, IonNote } from "@ionic/react"

interface CardInputProps {
    title?: string,
    author?: string,
    image?: string,
    authorimage?: string,
    description?: string,
    start?: string,
    end?: string
}

const Card: React.FC<CardInputProps> = ({ title, author, image, description, authorimage, start, end }) => {
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