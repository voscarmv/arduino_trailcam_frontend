import Gallery from '../components/gallery';
import Picture from '../components/picture';
import { gallery, picture } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const GalleryMenu = () => {
    const token = useSelector(state => state.loginStore);
    const photos = useSelector(state => state.galleryStore);
    const pic = useSelector(state => state.pictureStore);
    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(gallery({ data: { token: token.data } })); // Correct
            // dispatch(gallery({ data: { token: token.data } })); // Incorrect for testing
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    const handleClick = (key, imgurl, event) => {
        console.log(imgurl);
        event.preventDefault();
        dispatch(picture({
            data: {
                id: key,
                token: token.data,
                body: {
                    viewed: true
                },
                imgurl: imgurl,
            }
        }));
        console.log("this is pic", pic);
    }
        return (
            <div>
                { photos.data ? (<Gallery table={photos.data.photos} handleClick={handleClick} />) : (<b>Log in first</b>)}
                { pic.data ? (<Picture image={pic.data.imgurl} />) : (<br></br>) }
            </div>
        )    
}