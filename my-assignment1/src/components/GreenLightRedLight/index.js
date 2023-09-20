import { Component } from 'react'

import './index.css'

const RedGreenArray = [
    { id: 1, color: "green" }, { id: 2, color: "red" }
]

const levelsArray = [{ id: 1, level: "Easy", minimum: 10 }, { id: 2, level: "Medium", minimum: 15 }, { id: 3, level: "Hard", minimum: 25 }]

class GreenLightRedLight extends Component {

    state = { isLoginVisible: true, userName: "", userEmail: "", gameRunning: true, userMobileNumner: "", userSelectionLevel: levelsArray[0].level, timer: 40, isStart: true, changeColor: "", result: 0 }


 //This start function will  be call when the start button is clicked.
//In this I used the setInterval method to implement the timer.
// 
    startTime = () => {
        const { timer } = this.state
        let count = timer
        this.startTimeInterVal = setInterval(() => {
            count = count - 1
            if (count > -1) {
                this.setState({ timer: count, gameRunning: true })
            }
            else {
                this.setState({ gameRunning: false })
            }

        }, 2000)

    }

//In this function I get the user name input field value and using that I update the state..
    getUserName = (event) => {
        this.setState({ userName: event.target.value })
    }

    //In this I get the user email input field value and using that I update the state.

    getUserMail = (event) => {
        this.setState({ userEmail: event.target.value })
    }

    //In this I get the user mobile input field value and using that I update the state.
    getUserMobile = (event) => {
        this.setState({ userMobileNumner: event.target.value })
    }

    //In this I get the user seleted option value and using that I update the state.

    getUserOption = (event) => {
        this.setState({ userSelectionLevel: event.target.value })
    }


    

    //I call this function to stop the forms default behavior and  
    //I wrote a logic to submit the function if the fields in the forms are not empty

    submitForm = (event) => {
        const { userEmail, userMobileNumner, userSelectionLevel, userName } = this.setState
        event.preventDefault()

        if (userEmail !== "" && userMobileNumner !== "" && userName !== "" && userSelectionLevel !== "") {
            this.setState({ isLoginVisible: false })
        }

    }

    startGame = () => {
        this.setState({ timer: 40 })
        this.startTime()
        this.setState({ isStart: false })
        this.setTimerForColorChange()
    }

// i used this funtion to alternate colors based on timer 
    setTimerForColorChange = () => {
        let count = 0
        this.startTimeInterValRed = setInterval(() => {
            if (count % 2 === 0) {
                const colorDis = RedGreenArray[0].color
               
                this.setState({ changeColor: colorDis })

            }
            else {
                const colorDis = RedGreenArray[1].color
                this.setState({ changeColor: colorDis })
                
            }
            count = count + 1
        }, 1000)

    }


    //using this function i stop the game.

    stopPlay = () => {
        const { changeColor, result, userSelectionLevel } = this.state
       
        if (changeColor === "red") {
            this.setState({ isStart: false, gameRunning: false })
            clearInterval(this.startTimeInterValRed)
            clearInterval(this.startTimeInterVal)

        }
        else {
            const array = levelsArray.filter((eachItem) => (eachItem.level === userSelectionLevel))
            if (array[0].level === userSelectionLevel && result < array[0].minimum) {
                this.setState((preState) => ({ result: preState.result + 1 }))
            }
            else {
                clearInterval(this.startTimeInterValRed)
                clearInterval(this.startTimeInterVal)
                this.setState({ isStart: false, gameRunning: false })

            }

        }
    }

 //using this function i display the game card

    gameCard = () => {
        const { userName, timer, isStart, changeColor, result, gameRunning, userSelectionLevel } = this.state

        let minimuCount = 0
        if (userSelectionLevel === "Easy") {
            minimuCount = 10
        }
        else if (userSelectionLevel === "Medium") {
            minimuCount = 15
        }
        else {
            minimuCount = 25
        }

        let isWin;

        isWin = result === minimuCount
        console.log(isWin)


        return (
            <div >
                <nav className='navBar'>

                    <h1 className=''>Welcome....<span className='welcomepage'>{userName}</span></h1>
                    <h1>Your Score : <span className='welcomepage'>{result}</span></h1>
                    <h1>Time : <span className='welcomepage'>{timer}</span></h1>
                </nav>
                <div className='gamecard'>{
                    isStart ?
                        (
                            <button onClick={this.startGame} className='startButton'>Start</button>
                        ) : (
                            <div>
                                {gameRunning ?
                                    (<button className={`gameCardButton ${changeColor}`} onClick={this.stopPlay}>Click on Green Color to Increase Count</button>
                                    ) : (
                                        <div>
                                            {
                                                isWin ? (
                                                    <div className='successCard'>You Win....<span className='gameSuccess'>{userSelectionLevel}</span>Level</div>
                                                ) : (
                                                    <div className='failureCard'>Game Over!</div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                }
                </div>
            </div >)
    }



    //using this function i display the login form
    loginForm = () => {
        const { userEmail, userMobileNumner, userName, userSelectionLevel } = this.state
        return (
            <div className='LoginPage'>
                <form className='myForm form-controls' onSubmit={this.submitForm}>
                    <h1 className='register-heading'>Register Here...</h1>
                    <div className='labelItem'>
                        <label htmlFor='userName'>Name</label>
                        <input type='text' id="userName" className="input-Element" onChange={this.getUserName} required value={userName} />
                    </div>
                    <div className='labelItem'>
                        <label htmlFor='userEmail'>Email</label>
                        <input type='email' id="userEmail" onChange={this.getUserMail} required value={userEmail} />
                    </div>
                    <div className='labelItem'>
                        <label htmlFor='userMobile'>Mobile Number</label>
                        <input type='tel' id="userMobile" onChange={this.getUserMobile} required value={userMobileNumner} />
                    </div>
                    <div className='labelItem' required>
                        <label htmlFor='userSelectionOption'>Difficulty Level</label>
                        <select id="userSelectionOption" onChange={this.getUserOption} value={userSelectionLevel}>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div className='buttonEle'><button type='submit' className='buttonElement'>Login</button></div>
                </form>
            </div>)
    }

    render() {
        const { isLoginVisible } = this.state

        return (
            <div>
                {
                    isLoginVisible ? (this.loginForm()) : (this.gameCard())
                }
            </div>
        )
    }

}
export default GreenLightRedLight