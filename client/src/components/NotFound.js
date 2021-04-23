import React from 'react';
import {Title} from './Title';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom'



export const NotFound = () => {
    const history = useHistory();
    return (
        <div>
              <div className="container">
                <header className="jumbotron">
                    <Title data="404 | This page does not exist," />
                    <Link to="/" >
                        <Title noUnderline={true} subHeader={true} data="Go back to homepage" />
                    </Link>
                </header>
            </div>
        </div>
    )
}
