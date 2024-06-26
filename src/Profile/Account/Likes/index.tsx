import { useEffect, useState } from "react";
import * as client from '../../../Client';
import Song from "../../../Song";


function Likes() {
    const [likes, setLikes] = useState<any>([]);

    const setLikedPostData = async (postIds: number[]) => {
        const likes = await Promise.all(postIds.map((postId:any) => {
            return client.getPostDetails(postId);
        }))
        setLikes(likes);
    }

    useEffect(() => {
        const getCurrentUser = async () => {
            const user = await client.getProfile();

            if (user) {
                console.log(user);
                setLikedPostData(user.likes);
            }
        }
        getCurrentUser();
    }, []);

    return (
        <div>
            <h2 className="text-center">Your Liked Posts</h2>
            {likes.length > 0 ? <div className="list-group">
            {likes.map((like:any, index:number) => {
                    return (
                    <div className="list-group-item list-group-item-light" key={index}>
                        <Song song={like} />
                    </div>
                    );
                })}
            </div> :
            <div className="text-center"> 
                You have no liked posts.
            </div>}
        </div>
        
    );
}

export default Likes;