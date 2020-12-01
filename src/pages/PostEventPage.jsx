import React from 'react';
import PostEventForm from "../components/Event/PostEventForm"

function PostEventPage({setUsername}){
    return (
    <div>
        <PostEventForm setUsername={setUsername} />
    </div>
    )
}

export default PostEventPage 