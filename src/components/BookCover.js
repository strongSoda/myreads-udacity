import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

function BookCover(props) {

    let image = (props.book.imageLinks && props.book.imageLinks.smallThumbnail)
        ? props.book.imageLinks.smallThumbnail
        : '';

    let classes = classNames({
        'book-cover': true,
        'no-cover': !image
    });

    let style = (image)
        ? { width: 128, height: 193, backgroundImage: `url("${image}")` }
        : { width: 128, height: 193 };

    return (
        <div
            className={classes}
            style={style} />
    )
}


BookCover.propTypes = {
    book: PropTypes.object.isRequired,
};

export default BookCover