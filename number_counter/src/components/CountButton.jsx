import React from 'react';

function CountButton({ title, onClick }) {

    return (
        <div>
            <button onClick={ onClick }>{ title }</button>
        </div>
    );
}

export default CountButton;