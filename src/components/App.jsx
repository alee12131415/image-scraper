import React, {Component} from 'react'

import Navbar from './Navbar'
import Section from './Section'
import ViewController from './ViewController'
import Viewport from './Viewport'

class App extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='main'>
                    <ViewController />
                    <Viewport />
                    {/* <Section title={'In Progress'} />
                    <Section title={'Complete'} /> */}
                </div>
            </div>
        )
    }
}

export default App