import React from 'react'

const Navbar = () => {
    return (
        <nav>
            <span className={'brand'}>Image Scraper</span>
            <div className='menu'>
                <label className="pseudo button" htmlFor='startScrapeModal'>Start Scraping</label>
            </div>
        </nav>
    )
}

export default Navbar