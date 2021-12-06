import React from 'react'
import { Link } from "react-router-dom";

const Presentacion = () => {
    return (
        <div>
            <Link to="/usuarios">
                <button className="mt-5 p-2 pl-5 pr-5 bg-green-300 text-gray-800 hover:bg-green-800 hover:text-gray-200 text-lg rounded-lg">
                  Usuario
                </button>
              </Link>
        </div>
    )
}

export default Presentacion
