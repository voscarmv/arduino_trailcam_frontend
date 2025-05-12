import propTypes from 'prop-types';

const Picture = ({ image }) => {
    if(image){
    return (
        <img src={image} alt=""></img>
    );
} else {
    return;
}
};

Picture.propTypes = {
    image: propTypes.string.isRequired
};

export default Picture;