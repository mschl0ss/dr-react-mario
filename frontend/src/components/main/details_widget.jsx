import React from 'react';

class DetailsWidget extends React.Component {



    render() {
        return(
            <div className="details-widget">
                <h3>Controls</h3>

                <p>
                    Eliminate the viruses before your beaker overflows.  Matching
                    <strong>any 4 pieces of the same color</strong> will eliminate
                    those pieces, be they virus or pill.  Bonus points for chaining
                    combos! (probably)
                </p>

                <section className="game-pad">
                    
                    
                    <div className="arrows">
                        {/* top row */}
                        <div className="blank"></div>
                        <div className="blank"></div>
                        <div className="blank"></div>
                        
                        {/* middle row */}
                        <div>
                            {/* left arrow */}
                            <div className="arrow">&#8592;</div>
                        </div>

                        <div className="blank"></div>
                    
                        <div>
                            {/* right arrow */}
                            <div className="arrow">&#10145;</div>
                        </div>

                        {/* bottom row */}
                        <div className="blank"></div>

                        <div>
                           {/* down NEED TO CSS ROTATE*/}
                            <div className="down-arrow arrow">&#8682;</div>
                        </div>

                        <div className="blank"></div>
                       
                    </div>

                    <div className="select-start">
                       <button>pause</button>
                       <button>reset</button>
                    </div>

                    <div className="buttons">
                        <div>
                            <button>A</button>
                            <span>rL</span>
                        </div>
                        <div>
                            <button>S</button>
                            <span>rR</span>
                        </div>
                    </div>

                </section>

            </div>
        )
    }
}

export default DetailsWidget;