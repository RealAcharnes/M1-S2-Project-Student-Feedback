function ReasonForMYes(){
    return(
        <form>
            <div className='form'>
                <div className='choice'>
                    <input type="checkbox" id="choice1" name="choice1" value='1'></input>
                    <label for="choice1">Vous avez correctement lu la question</label>
                </div>
                <div className='choice'>
                    <input type="checkbox" id="choice2" name="choice2" value='2'></input>
                    <label for="choice2">Vous etiez concentré</label>
                </div>
                <div className='choice'>
                    <input type="checkbox" id="choice3" name="choice3" value='3'></input>
                    <label for="choice3">Vous comprenez le sens de la question</label>
                </div>
                <div className='choice'>
                    <input type="checkbox" id="choice4" name="choice4" value='4'></input>
                    <label for="choice4">Autre raison</label>
                </div>
            </div>
        </form>
    );
}

export default ReasonForMYes;