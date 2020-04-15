import React from 'react';

import {Header, TimelineContainer, TimelineWrapper} from './timeline.style';
import RdftoRouteParser from "../../utils/parser/RdfToRouteParser";
import SmallRow from "../Delay/Delay";
import {Loader} from '@util-components';
import {withTranslation} from 'react-i18next';
import SharedNotificationToRouteParser from "../../utils/parser/SharedNotificationToRouteParser";

type Props = {
    webId: String,
    t: Function
};

/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
class TimeLine extends React.Component {

    state = {isLoading: true};

    constructor({webId}: Props) {
        super();
        this.parserShared = new SharedNotificationToRouteParser(webId);
        this.webID = webId.replace("profile/card#me", "viade/");
        this.parser = new RdftoRouteParser();
        this.parser.addRoutes(this.webID);
        this.parserShared.addRoutes(this.webID);
    }

    loaded = () => this.setState({isLoading: false});

    render() {
        const { t } = this.props;
        setTimeout(this.loaded, 3000);
        return (
            <TimelineWrapper data-testid="timeline-wrapper">
                <TimelineContainer data-testid="timeline-container">
                    <Header data-testid="timeline-header">
                        <h1>{t('timeline.seeRoutes')}</h1>
                    </Header>
                    <SmallRow webID={this.webID}/>
                </TimelineContainer>
                {this.state.isLoading && <Loader absolute/>}
            </TimelineWrapper>
        );

    }
}

export {TimeLine};
export default withTranslation()(TimeLine);