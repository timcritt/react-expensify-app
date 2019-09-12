import React from 'react';
import ReactDom from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share.</p>}
            <WrappedComponent {...props}/>
        </div>
    );
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAthenticated ? (
                <WrappedComponent {...props}/>
            ) : (
            <p>Login required to view this information</p>
            )}
        </div>
    );
}




const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


//ReactDom.render(<AdminInfo isAdmin={true} info="there are the details" />, document.getElementById('app'));
ReactDom.render(<AuthInfo isAthenticated={false} info="there are the details" />, document.getElementById('app'));
