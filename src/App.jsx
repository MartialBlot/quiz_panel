import React from "react";
import {Home} from "./components/Home";
import {NextUIProvider} from "@nextui-org/react";
import {Toaster} from "react-hot-toast";
import {Quiz} from "./components/Quiz";

function App() {
    const [page, setPage] = React.useState("home")
    const [players, setPlayers] = React.useState([]);
    const [scores, setScores] = React.useState({})

    const goQuizPage = () => setPage("quiz")
    const goToHomePage = () => setPage("home")

    React.useEffect(() => {
        const quizInProgress = localStorage.getItem('save')
        if(quizInProgress) {
            const data = JSON.parse(quizInProgress)
            setPlayers(data?.players)
            setScores(data?.scores)
            goQuizPage()
        }
    }, [])

    return (
        <NextUIProvider className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg size-full">
            <Toaster/>
            {
                page == "home" && <Home players={players}
                   setPlayers={setPlayers}
                   goQuizPage={goQuizPage}
                />
            }
            {
                page === "quiz" &&
                    <Quiz players={players} scores={scores} setScores={setScores} goToHomePage={goToHomePage} setPlayers={setPlayers}/>
            }
        </NextUIProvider>
    )
}

export default App
