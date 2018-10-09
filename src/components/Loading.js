import React from 'react'
import classNames from 'classnames';

export default function Loading(props) {

    let classes = classNames({
        'loading': true,
        'is-visible': props.isVisible
    });

    return <div className={classes} />
}