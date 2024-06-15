//frontend/src/components/Login.js

import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';

const Login = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-0 rounded-0 shadow-lg">
                            <div className="card-header bg-primary text-white text-center">
                                <h1 className="mb-0">NeuroFish</h1>
                            </div>
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <img src="https://as1.ftcdn.net/v2/jpg/04/55/12/90/1000_F_455129054_9oiFztF64ifXofv2aQVJkDHr0w7rjv5x.jpg" alt="NeuroFish Icon" className="img-fluid" style={{ width: "100px", height: "100px" }} />
                                </div>
                                <p className="card-text text-center">Welcome! Please sign in to access the application.</p>
                                <div className="d-grid gap-2">
                                    <button onClick={() => loginWithRedirect()} className="btn btn-primary">
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Login;
