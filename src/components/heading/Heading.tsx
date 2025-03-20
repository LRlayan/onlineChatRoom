import React from 'react';

interface AnchorProps {
    name:string;
    classes: string;
}

export const Heading1: React.FC<AnchorProps> = ({
    name,
    classes
}) => {
    return(
        <>
            <h1 className={classes}>{name}</h1>
        </>
    )
}

export const Heading2: React.FC<AnchorProps> = ({
    name,
    classes
}) => {
    return(
        <>
            <h2 className={classes}>{name}</h2>
        </>
    )
}

export const Heading3: React.FC<AnchorProps> = ({
    name,
    classes
}) => {
    return(
        <>
            <h1 className={classes}>{name}</h1>
        </>
    )
}

export const Heading4: React.FC<AnchorProps> = ({
    name,
    classes
}) => {
    return(
        <>
            <h1 className={classes}>{name}</h1>
        </>
    )
}

export const Heading5: React.FC<AnchorProps> = ({
    name,
    classes
}) => {
    return(
        <>
            <h1 className={classes}>{name}</h1>
        </>
    )
}