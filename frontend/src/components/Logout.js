//frontend/src/components/Logout.js

import { useAuth0 } from "@auth0/auth0-react";

import React from 'react'

const Logout = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-primary">
                            <div className="card-header bg-primary text-white">
                                <h5 className="mb-0">Login</h5>
                            </div>
                            <div className="card-body">
                                <button onClick={() => logout()} className="btn btn-danger">
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Logout