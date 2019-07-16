import React from 'react'


class Mario extends React.Component {


    renderSquares() {
        const randVir = [[1, 3], [4, 6], [5, 7], [13, 1], [18, 5]]
        const viruses = [];
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 8; col++) {
                randVir.forEach((arr) => {
                    if (row === arr[0] && col === arr[1]) {
                        if (counter % 2 === 0) {
                        viruses.push(<img className="virus" style={{ gridArea: `${row}/${col}` }} src="y-virus.png" alt="" />)
                        }
                    }
                })
            }
        }
        return viruses;
    }

    render () {

        return (
            <div id = "content">
                <div className = "main-grid">
                    {this.renderSquares()}
                </div>
            </div>
        )   
    }
}

export default Mario; 