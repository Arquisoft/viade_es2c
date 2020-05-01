import React, {useState} from "react";
import {Button, Card, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLDflexList} from "@solid/react";
import ShareCard from "./ShareCard/ShareCard";
import {useTranslation} from "react-i18next";

const Share2 = props => {
    const {t} = useTranslation();
    const route = props.route;
    const friends = useLDflexList('user.friends');
    const [show, setShow] = useState(false);
    let friendList = [];
    let routeFileName =  route.author.replace("profile/card#me", "viade/" + route.fileName);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    for (let i = 0; i < friends.length; i++) {
        friendList.push(
            <ShareCard friendWebID={friends[i].value} WebID={route.author} url={routeFileName}/>
        )
    }
    if(friendList.length===0){
        friendList.push(
            <Card className="text-left my-2" bg="secondary">
                <Card.Body>
                    <Card.Title className="text-white">{t("friends.noFriends")}</Card.Title>
                </Card.Body>
            </Card>
        )
    }

    return(
        <>
            <Button variant="outline-success" onClick={handleShow} block="lg">
                {t('route.share')}
            </Button>

            <Modal show={show} onHide={handleClose} size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered >
                <Modal.Header closeButton>
                    <Modal.Title>{t('route.share')}: {route.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight: "calc(75vh - 200px)"}} className="overflow-auto">
                    <div >
                        {friendList}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Share2;