import React from 'react';

class DetailsWidget extends React.Component {



    render() {
        return(
            <div className="details-widget">
                <h3>controls</h3>

                <p>
                    Eliminate the viruses before your beaker overflows.  Lining up
                     <strong> any 4 single (1x1) pieces of the same color</strong> will eliminate
                    those pieces, be they virus or pill.  Bonus points for chaining
                    combos! (probably)
                </p>

                <section className="game-pad">
                    
                    
                    <div className="direction-pad">
                        {/* top row */}
                        <div className="blank"></div>
                        <div>
                            {/* down NEED TO CSS ROTATE*/}
                            <div className="arrow">&#8682;</div>
                        </div>
                        <div className="blank"></div>
                        
                        {/* middle row */}
                        <div>
                            {/* left arrow */}
                            <div className="arrow">&#8678;</div>
                        </div>

                        <div className="middle">
                            <span></span>
                        </div>
                    
                        <div>
                            {/* right arrow */}
                            <div className="arrow">&#8680;</div>
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

                            <button>&#10602;</button>
                            <button>&#8634;</button>
                    </div>

                    <div className="buttons">
                        <div><button>A</button></div>
                        <div><button>S</button></div>
                    </div>

                </section>

            </div>
        )
    }
}

export default DetailsWidget;