/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React from 'react';
import {SelectorCard, SelectorOption, SelectorWrapper} from "./RouteSelector.style";
import {withRouter} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


type Props = {webId: String};

function goTo(path) {
    window.location.href=path;
}

const CreateRouteSelector = ({ webId }: Props) => {
    const { t } = useTranslation();

    return (
        <SelectorWrapper data-testid="selector-wrapper">
            <SelectorCard className="card">
                <SelectorOption data-testid="selector-option-parsers">
                    <h3>{t('createRoute.archive')}</h3>
                    <Button
                        variant="outline-success"
                        onClick={() => goTo('#/createroutegpx')}
                        data-testid="goTo-gpx"
                    >
                        Gpx
                    </Button>
                    <Button
                        variant="outline-success"
                        onClick={() => goTo('#/createroutegeojson')}
                        data-testid="goTo-geojson"
                    >
                        GeoJSON
                    </Button>
                    <Button
                        variant="outline-success"
                        onClick={() => goTo('#/createroutejsonld')}
                        data-testid="goTo-jsonld"
                    >
                        JSON-LD
                    </Button>
                </SelectorOption>
                <SelectorOption data-testid="selector-option-map">
                    <h3>{t('createRoute.map')}</h3>
                    <Button
                        variant="outline-success"
                        onClick={() => goTo('#/createroute')}
                        data-testid="goTo-map"
                    >
                        {t('createRoute.here')}
                    </Button>
                </SelectorOption>
            </SelectorCard>
        </SelectorWrapper>
    );

};

export default withRouter (CreateRouteSelector);