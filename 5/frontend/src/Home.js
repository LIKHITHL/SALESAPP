import React from 'react'

const Home = () => {
    return (
        <div className='container Home'>
            <div className='row'>
                <div className='col-6'>
                    <a className="btn border border-black border-start-0 border-2 fs-3 fw-bold fs-5 p-3" href="/login"> Login </a>
                </div>
                <div className='col-6'>
                    <a className="btn border border-black border-end-0 border-2 fs-3 fw-bold fs-5 p-3" href="/register"> Register </a>
                </div>
            </div>
        </div>
    )
}

export default Home