import React from 'react';
import './Info.css';

const Info = () => {
    return(
        <main className="info">
            <h2 className="info__title">Добро пожаловать в приложение "Todo App"</h2>
            <ul className="info__list">
                <li className="info__item">
                    На вкладке <strong>"Все задачи"</strong> Вы можете просмотреть, добавить, удалить и отметить как "выполненно" все ваши задачи
                </li>
                <li className="info__item">
                    На вкладке <strong>"Информация"</strong> Вы вернётесь к этой инструкции
                </li>
                <li className="info__item">
                    На вкладке <strong>"Выполненные задачи"</strong> Вы можете просмотреть все выполненные задачи 
                </li>
            </ul>
        </main>
    )
}

export default Info;