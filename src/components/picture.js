import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Picture = ({ image }) => {
    if (image) {
        return (
            <div>
                <Link to={image}>{image}</Link>
                <img src={image} alt=""></img>
            </div>
        );
    } else {
        return;
    }
};

Picture.propTypes = {
    image: propTypes.string.isRequired
};

export default Picture;