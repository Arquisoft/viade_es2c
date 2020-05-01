import React from 'react';
import {TimelineRouteCard, TimelineRouteDetail} from './timelineroute.style';
import Ruta from "../../Ruta"
import 'bootstrap/dist/css/bootstrap.min.css';
import Name from "@solid/react/lib/components/Name";
import Share2 from "../../Share/Share2";

const TimeLineRoute = props => {
    let route = props.route;
    const title = route.name;
    const description = route.description;

    return (
        <TimelineRouteCard className="card">
            <TimelineRouteDetail data-testid="welcome-detail">
                <h3>{title} - <Name src={"[" + route.author + "]"}/></h3>
                <p>{description}</p>
                <Ruta route={route}/>
                <Share2 route={route}/>
            </TimelineRouteDetail>
        </TimelineRouteCard>
    );
};

export default TimeLineRoute;