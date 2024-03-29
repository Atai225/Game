import { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import "./Game.css";
import {
  incIncorrects,
  incCorrects,
  setClock,
  changeGameStatus,
  setHistory,
  clearCurrent,
  colorChanger,
  setCurrentClue,
  clearCluesStatus
} from "../../store/reducers/game.reducer";
import { useNavigate } from "react-router-dom";

function Game() {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const result = useSelector((store) => store.game.currentGame);
  const categories = useSelector((store) => store.game.categories);
  const clues = useSelector((store) => store.game.questions);
  const status = useSelector((store) => store.game.status);

  const [show, setShow] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentCat, setCurrentCat] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [timerActive, setTimerActive] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(false);
  const [target, setTarget] = useState(null)

  const getCat = (id) => {
    setCurrentCat(categories[id]);
  };

  const showQuestion = (clue, i) => {
    setShow(true);
    setCurrentQuestion(clue);
    setTimerActive(true);
    getCat(i);
  };

  const changeHandler = (e) => {
    if (e.target.value !== "") {
      setAnswer(e.target.value);
    }
    setTarget(e.target)
  };
  const clearField =() => {
    target.value = '';
  }
  const submitHandler = (e) => {
    e.preventDefault();
    setShow(false);
    dispatch(setCurrentClue(currentQuestion.id));
    if (answer !== currentQuestion.answer) {
      dispatch(incIncorrects(currentQuestion?.value));
      setAnswerStatus(false);

      dispatch(colorChanger(false));
    } else if (answer === currentQuestion.answer) {
      dispatch(incCorrects(currentQuestion?.value));
      setAnswerStatus(true);

      dispatch(colorChanger(true));
    }
    clearField();
    setTimerActive(false);
    setSeconds(60);
    setAnswered(true);
    setCurrentPoints(currentQuestion?.value);
  };

  useEffect(() => {
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
          <button onClick={() => changeStatus(true)} className="btn-start">
            Начать играть
          </button>
        </div>
      ) : (
        <div className="game">
          <div>
            {categories.map((cat, i) => (
              <div key={i} className="categories">
                <div className="categories__title">
                  <span className="categories__name">{cat}</span>
                </div>
                <div className="categories__clues">
                  {clues[i].map((res, index) => (
                    <div key={index}>
                      {res.right === true && (
                        <button className="categories__correct categories__btn">
                          Верно
                        </button>
                      )}
                      {res.right === false && (
                        <button className="categories__wrong categories__btn">
                          Неверно
                        </button>
                      )}
                      {res.right === null && (
                        <button
                          className="categories__value categories__btn"
                          onClick={() => showQuestion(res, i)}
                        >
                          {res.value}
                        </button>
                      )}
                    </div>
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
                        <div className="result-points">+{currentPoints}</div>
                      </div>
                    ) : (
                      <div className="result incorrect">
                        <div>Ответ неверный !!!</div>
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
                    setAnswered(false);
                    setAnswerStatus(null);
                    dispatch(clearCluesStatus())
                    nav('/statistics')
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
              <div onClick={submitHandler} className="close"><GrClose className="x-symbol"/></div>
              <form
              onSubmit={submitHandler}
                className="answer-form text-center"
              >
                <div className="form__header">
                  <div>
                    <span className="form__title">{currentCat}</span>
                  </div>{" "}
                  <div>
                    <span className="form__points">
                      {currentQuestion.value}
                    </span>
                  </div>
                </div>
                <p className="question">{currentQuestion?.question}?</p>
                <p className="answer">{currentQuestion?.answer}</p>
                <input
                  onChange={changeHandler}
                  className="answer-field"
                  type="text"
                  id="question"
                  placeholder="Введите ответ"
                />
                <div className="form__footer">
                  <div>
                    <p>Осталось {seconds} секунд</p>
                  </div>
                  <div>
                    <button className="btn-send mt-3">Ответить</button>
                  </div>
                </div>
              </form>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
