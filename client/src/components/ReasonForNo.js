function ReasonForNo(){
    return(
        <form>
            <div className='form'>
                <div className='choice'>
                    <input type="checkbox" id="choice1" name="choice1" value='1'></input>
                    <label for="choice1">La question est mal formulée</label>
                </div>
                <div className='choice'>
                    <input type="checkbox" id="choice2" name="choice2" value='2'></input>
                    <label for="choice2">Vous avez des difficultés pour vous concentrer</label>
                </div>
                <div className='choice'>
                    <input type="checkbox" id="choice3" name="choice3" value='3'></input>
                    <label for="choice3">La question n'est pas intéressante'</label>
                </div>
                <div className='choice'>
                    <input type="checkbox" id="choice4" name="choice4" value='4'></input>
                    <label for="choice4">Autre raison</label>
                </div>
            </div>
        </form>
    );
}

export default ReasonForNo;