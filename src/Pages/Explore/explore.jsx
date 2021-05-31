import React, { Component } from 'react'
import Cards from '../../components/Body/Cards/Cards'

export class Explore extends Component {

    render() {
        const animals =[
        {id:1, animal:"Dog"},
        {id:2, animal:"Dog"},
        {id:3, animal:"Dog"},
        {id:4, animal:"Dog"},]
        return (
            <div className="container">
                 <div className="LabelCaption">
                    <div className="cardHolder">
                        {animals.map(item => (
                            <Cards></Cards>
                        ))}
                        
                        {animals.map(item => (
                            <Cards></Cards>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Explore
