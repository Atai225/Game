import { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import "./Game.css";
import {
  incIncorrects,
  incCorrects,
  setClock,
  changeGameStatus,
  setHistory,
  clearCurrent,
} from "../../store/reducers/game.reducer";
import Statisctic from "../Statistic/Statisctic";

function Game() {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesId, setCategoriesId] = useState([
    11496, 11499, 11544, 11498, 11513,
  ]);
  const result = useSelector((store) => store.game.currentGame);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentCat, setCurrentCat] = useState(null);
  const [answer, setAnswer] = useState(null);
  const dispatch = useDispatch();
  const [answerStatus, setAnswerStatus] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const status = useSelector((store) => store.game.status);
  const [clicked, setClicked] = useState(0)

  const getCat = (id) => {
    setCurrentCat(categories[id]);
  };

  const showQuestion = (clue, id, index) => {
    setCurrentQuestion(clue);
    getCat(id);
    setShow(true);
    setTimerActive(true);
    setClicked(index)
  };

  const changeHandler = (e) => {
    if (e.target.value !== "") {
      setAnswer(e.target.value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (answer !== currentQuestion.answer) {
      dispatch(incIncorrects(currentQuestion?.value));
      setAnswerStatus(false);
    } else if (answer === currentQuestion.answer) {
      dispatch(incCorrects(currentQuestion?.value));
      setAnswerStatus(true);
    }
    setShow(false);
    setSeconds(60);
    setTimerActive(false);
    setAnswered(true);
    setCurrentPoints(currentQuestion?.value);
  };

  useEffect(() => {
    const fetchCats = () => {
      const allCats = categoriesId.map((cat) => {
        return new Promise((resolve) => {
          fetch(`https://jservice.io/api/category?id=${cat}`)
            .then((response) => response.json())
            .then((data) => {
              resolve(data);
            });
        });
      });
      Promise.all(allCats).then((res) => {
        setCategories(res);
      });
    };
    fetchCats();

    const interval = setInterval(() => {
      timerActive &&
        setSeconds((seconds) => (seconds > 0 ? seconds - 1 : reset()));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timerActive]);

  const reset = () => {
    if (answer !== currentQuestion.answer) {
      dispatch(incIncorrects(currentQuestion?.value));
      setAnswerStatus(false);
    } else if (answer === currentQuestion.answer) {
      dispatch(incCorrects(currentQuestion?.value));
      setAnswerStatus(true);
    }
    setShow(false);
    setSeconds(60);
    setTimerActive(false);
  };

  //   useEffect(() => {
  // 	const fetchData = async() => {
  // 		const response = await axios.get(`https://jservice.io/api/random?count=5`);
  // 		setRes(response.data);
  // 	}
  // 	fetchData();
  // }, [])

  const changeStatus = (play) => {
    const now = new Date().toLocaleString();
    dispatch(setClock(now));
    if (play === false) {
      dispatch(changeGameStatus(play));
      dispatch(setHistory());
      dispatch(clearCurrent());
    } else {
      dispatch(changeGameStatus(play));
    }
  };

  return (
    <div className="container">
      {!status ? (
        <div className="start-game">
          <button
            onClick={() => changeStatus(true)}
            className="btn-start"
          >
            Начать играть
          </button>
        </div>
      ) : (
        <div className="game">
          <div>
            {categories.map((cat, i) => (
              <div key={i} className="categories">
                <div className="categories__title">
                  <span className="categories__name">{cat.title}</span>
                </div>
                <div className="categories__clues">
                  {cat.clues.map((clue, index) => (
                    <btn
                      className="categories__value"
                      onClick={() => showQuestion(clue, i, clue.id)}
                      key={index}
                    >
                      {answered ? (
                        <>
                          {clicked === clue.id ? <>
                            {answerStatus ? (
                              <span>Верно</span>
                            ) : (
                              <span>Неверно</span>
                            )}
                          </> : <span>{clue.value}</span>}
                        </>
                      ) : (
                        <span>{clue.value}</span>
                      )}
                    </btn>
                  ))}
                </div>
              </div>
            ))}

            <div className="game__footer">
              <div>
                {answered && (
                  <div className="result">
                    {answerStatus ? (
                      <div className="result correct">
                        <div>Ответ верный !!!</div>
                        <div className="result-points">{currentPoints}</div>
                      </div>
                    ) : (
                      <div className="result incorrect">
                        <div>
                          Ответ неверный !!!
                        </div>
                        <div className="result-points">-{currentPoints}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="game__footer--right">
                <span className="game__points">
                  Счет: <span>{result.points}</span>
                </span>
                <button
                  onClick={() => {
                    changeStatus(false);
                    setAnswered(false)
                    setAnswerStatus(null)
                  }}
                  className="game__stop-btn"
                >
                  Завершить
                </button>
              </div>
            </div>
          </div>
          {currentQuestion && (
            <Modal show={show}>
              <form onSubmit={submitHandler} className="answer-form text-center">
                <div className="form__header"><div><span className="form__title">{currentCat.title}</span></div> <div><span className="form__points">{currentQuestion.value}</span></div></div>
                <p className="question">{currentQuestion?.question}?</p>
                <input
                  onChange={changeHandler}
                  className="answer-field"
                  type="text"
                  id="question"
                  placeholder="Введите ответ"
                />
                <div className="form__footer">
                  <div><p>Осталось {seconds} секунд</p></div>
                  <div><button className="btn-send mt-3">Ответить</button></div>
                </div >
              </form>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
