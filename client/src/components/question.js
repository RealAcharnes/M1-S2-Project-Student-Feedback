import {useState} from 'react';
import '../css/question.css';
//import ReasonForYes from './ReasonForYes';
//import ReasonForMYes from './ReasonForMYes';
//import ReasonForMNo from './ReasonForMNo';
//import ReasonForNo from './ReasonForNo';

function Question({formType, choice}){
    const [answerValue, setAnswerValue] = useState('')
    const [otherReasonValue,setOtherReasonValue] = useState(false)
    //var choice = document.querySelector('input[name=form1]:checked').value
    switch (formType){
        case "question":
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
        case "reason":
            switch (choice){
                case '1':
                    return (
                        <form>
                            <div className='form'>
                                <div className='choice'>
                                    <input type="checkbox" id="yesReason1" name="yesReason1" value='1'></input>
                                    <label for="choice1">Vous avez bien lu la question</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="yesReason2" name="yesReason2" value='2'></input>
                                    <label for="choice2">Vous etiez suffisamment concentré</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="yesReason3" name="yesReason3" value='3'></input>
                                    <label for="choice3">La question vous intéresse</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="yesReason4" name="yesReason4" value={true} onClick={(e) => setOtherReasonValue(e.target.value)}></input>
                                    <label for="choice4">Autre raison</label>
                                    {OtherReason(otherReasonValue)}
                                </div>
                            </div>
                        </form>
                    );
                case '2':
                    return (
                        <form>
                            <div className='form'>
                                <div className='choice'>
                                    <input type="checkbox" id="MYesReason1" name="MYesReason1" value='1'></input>
                                    <label for="choice1">Vous avez correctement lu la question</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="MYesReason2" name="MYesReason2" value='2'></input>
                                    <label for="choice2">Vous etiez concentré</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="MYesReason3" name="MYesReason3" value='3'></input>
                                    <label for="choice3">Vous comprenez le sens de la question</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="MYesReason4" name="MYesReason4" value={true} onClick={(e) => setOtherReasonValue(e.target.value)}></input>
                                    <label for="choice4">Autre raison</label>
                                    {OtherReason(otherReasonValue)}
                                </div>
                            </div>
                        </form>
                    );
                case '3':
                    return (
                        <form>
                            <div className='form'>
                                <div className='choice'>
                                    <input type="checkbox" id="MNoReason1" name="MNoReason1" value='1'></input>
                                    <label for="choice1">Vous avez mal lu la question</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="MNoReason2" name="MNoReason2" value='2'></input>
                                    <label for="choice2">Vous n'etiez pas suffisamment concentré</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="MNoReason3" name="MNoReason3" value='3'></input>
                                    <label for="choice3">La question ne vous intéresse pas</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="MNoReason4" name="MNoReason4" value={true} onClick={(e) => setOtherReasonValue(e.target.value)}></input>
                                    <label for="choice4">Autre raison</label>
                                    {OtherReason(otherReasonValue)}
                                </div>
                            </div>
                        </form>
                    );
                case '4':
                    return (
                        <form>
                            <div className='form'>
                                <div className='choice'>
                                    <input type="checkbox" id="NoReason1" name="NoReason1" value='1'></input>
                                    <label for="choice1">La question est mal formulée</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="NoReason2" name="NoReason2" value='2'></input>
                                    <label for="choice2">Vous avez des difficultés pour vous concentrer</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="NoReason3" name="NoReason3" value='3'></input>
                                    <label for="choice3">La question n'est pas intéressante'</label>
                                </div>
                                <div className='choice'>
                                    <input type="checkbox" id="NoReason4" name="NoReason4" value={true} onClick={(e) => setOtherReasonValue(e.target.value)}></input>
                                    <label for="choice4">Autre raison</label>
                                    {OtherReason(otherReasonValue)}
                                </div>
                            </div>
                        </form>
                    );
                default:
                    return <p>Missing the choice</p>
            }
        default:
            return <p>Wrong formType</p>;
    }
    
}

function Switch(param){
    switch(param){
        case '1':
            return <Question formType="reason" choice="1"/>;
        case '2':
            return <Question formType="reason" choice="2"/>;
        case '3':
            return <Question formType="reason" choice="3"/>;
        case '4':
            return <Question formType="reason" choice="4"/>;
        default:
            return <p>Veuillez cocher une réponse</p>;
    }
}

function OtherReason(value){
    var reason =""
    if (value){
        return (
            <div>
            <textarea name="otherReason" placeholder="Veuillez saisir une autre raison" onChange={(e) => reason= e.target.value}/>
            <button name="test" onClick={() => alert(reason)}>Envoyer</button>
            </div>
        );
    }    
}

export default Question;