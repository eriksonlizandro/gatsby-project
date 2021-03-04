import React from 'react';
import {CollectionTileWrapper} from './styles';
import BackgroundImage from 'gatsby-background-image';

export function CollectionTile({description, title, backgroundImage}){
    return(
        <CollectionTileWrapper>
            <BackgroundImage fluid={backgroundImage}/>
            <h1>{title}</h1>
            <p>{description}</p>
        </CollectionTileWrapper>
    );
}