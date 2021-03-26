import {useState} from 'react';
import '../css/question.css';
import ReasonForYes from './ReasonForYes';
import ReasonForMYes from './ReasonForMYes';
import ReasonForMNo from './ReasonForMNo';
import ReasonForNo from './ReasonForNo';

function Question(){
    const [answerValue, setAnswerValue] = useState('')
    //var choice = document.querySelector('input[name=form1]:checked').value
    return (
        <div>
            <form>
                <div className='Question'>
                    <div className='Answer'>
                        <label for="oui">Oui</label>
                        <input type="radio" id="yes" name="form1" value="1" onClick={(e) => setAnswerValue(e.target.value)}></input>
                    </div>
                    <div className='Answer'>
                        <label for="plutot-oui">Plutôt oui</label>
                        <input type="radio" id="mYes" name="form1" value="2" onClick={(e) => setAnswerValue(e.target.value)}></input>
                    </div>
                    <div className='Answer'>
                        <label for="plutot-non">plutot-non</label>
                        <input type="radio" id="mNO" name="form1" value="3" onClick={(e) => setAnswerValue(e.target.value)}></input>
                    </div>
                    <div className='Answer'>
                        <label for="non">non</label>
                        <input type="radio" id="no" name="form1" value="4" onClick={(e) => setAnswerValue(e.target.value)}></input>
                    </div>
                </div>
            </form>
            <form>
                <div className="Reason">
                    { Switch(answerValue)}
                </div>
            </form>
        </div>
    );
}

function Switch(param){
    switch(param){
        case '1':
            return <ReasonForYes/>;
        case '2':
            return <ReasonForMYes/>;
        case '3':
            return <ReasonForMNo/>;
        case '4':
            return <ReasonForNo/>;
        default:
            return <p>Veuillez cocher une réponse</p>;
    }
}

export default Question;