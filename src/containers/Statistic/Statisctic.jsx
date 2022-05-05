import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeGameStatus,
  clearCurrent,
  setClock,
  clearHistory,
  setHistory,
  clearCluesStatus
} from "../../store/reducers/game.reducer";
import { useNavigate } from "react-router-dom";
import "./Statisctic.css";

function Statisctic() {
  const user = useSelector((store) => store.auth.user);
  const results = useSelector((store) => store.game.currentGame);
  const status = useSelector((store) => store.game.status);
  const history = useSelector((store) => store.game.history);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const theEnd = () => {
    const now = new Date().toLocaleString();
    dispatch(setClock(now));
    dispatch(changeGameStatus(false));
    dispatch(setHistory());
    dispatch(clearCurrent())
    dispatch(clearCluesStatus())
    nav('/')
  }

  return (
    <div className="statistic__container">
      <h1 className="title">Статистика</h1>
      <h2>Имя игрока: {user}</h2>
      {status && (
        <div className="statistic__table">
          <h2 className="statistic__title">Текущая игра</h2>
          <div className="statistic__game">
            <div className="statistic__item">
              <div className="item__title">Количество вопросов</div>
              <div className="item__value">{results.attemps}</div>
            </div>
            <div className="statistic__item">
              <div className="item__title">Верные ответы</div>
              <div className="item__value">{results.correct}</div>
            </div>
            <div className="statistic__item">
              <div className="item__title">Неверные ответы</div>
              <div className="item__value"> {results.incorrect}</div>
            </div>

            <div className="statistic__item">
              <div className="item__title">Сумма баллов </div>
              <div className="item__value">{results.points}</div>
            </div>

            <div className="statistic__item">
              <div className="item__title">Когда было создано</div>
              <div className="item__value">{results.clock[0]}</div>
            </div>
            <div className="statistic__item">
              <div className="item__title">Действия</div>
              <div className="item__value item__btns">
                <button
                  onClick={() => {
                    nav("/game");
                  }}
                  className="item__btn btn-success"
                >
                  Продолжить
                </button>
                <button
                  onClick={theEnd}
                  className="item__btn btn-danger"
                >
                  Завершить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {history && (
       
       <div className="statistic__table">
         <h2 className="statistic__title">История игр</h2>

                <div className="statistic__game">
                  <div className="statistic__item">
                    <div className="item__title">Количество вопросов</div>
                    {history.map(res => {
                      return <div key={res.clock[1]} className="item__value">{res.attemps}</div>
                      })
                    }
           
                  </div>
                  <div className="statistic__item">
                    <div className="item__title">Верные ответы</div>
                    {history.map(res => {
                      return <div key={res.clock[1]} className="item__value">{res.correct}</div>
                      })
                    }
              
                  </div>
                  <div className="statistic__item">
                    <div className="item__title">Неверные ответы</div>
                 
                    {history.map(res => {
                      return <div key={res.clock[1]} className="item__value">{res.incorrect}</div>
                      })
                    }

                  </div>
  
                  <div className="statistic__item">
                    <div className="item__title">Сумма баллов </div>
                    {history.map(res => {
                      return <div key={res.clock[1]} className="item__value">{res.points}</div>
                      })
                    }
                    
                  </div>
  
                  <div className="statistic__item">
                    <div className="item__title">Когда было создано</div>
                    {history.map(res => {
                      return <div key={res.clock[1]} className="item__value">{res.clock[0]}</div>
                      })
                    }
                  </div>
                  <div className="statistic__item">
                    <div className="item__title">Завершено</div>
                    {history.map(res => {
                      return <div key={res.clock[1]} className="item__value">{res.clock[1]}</div>
                      })
                    }
                    
                  </div>
                </div>

              <button className="btn-clear" onClick={() => dispatch(clearHistory())}>
                  Очистить историю
                </button>
          </div>
      )}
         
    </div>
  );
}

export default Statisctic;
