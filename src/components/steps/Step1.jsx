import React from 'react';


function Step1(pros){
    return(
        <div>
            <div className="stepOneContainer">
                <div className="booksizeSmall" onClick={() => this.selectSmall()}>

                </div>
                <div className="booksizeMedium" onClick={() => this.selectMedium()}>

                </div>
                <div className="booksizeLarge" onClick={() => this.selectLarge()}>

                </div>
            </div>
        </div>
    )
}
export default Step1;