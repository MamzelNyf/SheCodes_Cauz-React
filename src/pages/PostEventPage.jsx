import React from 'react';
import PostEventForm from "../components/Event/PostEventForm"

function PostEventPage({setUsername}){
    return (
    <div>
        <h1>This is Post Event Page</h1>
        <PostEventForm setUsername={setUsername} />
    </div>
    )
}

export default PostEventPage 