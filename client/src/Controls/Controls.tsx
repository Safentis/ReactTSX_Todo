import React from 'react';
import './Controls.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import handlePathname from '../Utils/handlePathname';

interface ObjectProps {
    onAdd(entrie: string): void,
    onPagination(start: number, end: number): void,
}

const Controls: React.FunctionComponent <ObjectProps> = (props) => {
    const { onAdd, onPagination } = props;
    const [entrie, setEntrie] = useState <string> ('');

    // ------------------------------------------------------------------------
    // Функция handleChange(e: React.ChangeEvent <HTMLInputElement>) обрабатывет
    // введённый данные в текстовое поле и с помощью функции setEntrie(<string>) 
    // выставляет полученный данные в state 

    const handleChange = (e: React.ChangeEvent <HTMLInputElement>) => {
        setEntrie(e.target.value);
    }

    // ------------------------------------------------------------------------
    // Функция handleKeyPres обрабатывет нажатие клавиши Enter
    // после чего передаёт значение тектового поля функции onAdd(<string>)
    // затем, обнуляет state текстового поля

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && entrie.trim() !== '') {
            onAdd(entrie);
            setEntrie('');
        }
    }

    // ------------------------------------------------------------------------
    // Функция handlePagination(e: React.MouseEvent) принимает в качестве аргумента
    // объект события. Посредством вспомогательной функции handlePathname получает
    // два значения start и end, которые в свою очередь означают колличество записей
    // на одной странице от start до end.
    // И следом передают полученные данные в onPagination() следующий обработчик данных pagination

    const handlePagination = (e: React.MouseEvent) => {
        const [start, end] = handlePathname(e);

        onPagination(start, end);
    }

    return (
        <header className="controls">
            <label className="label controls__label" htmlFor="textField">Поле для записей</label>
            <input className="input controls__input" id="textField" type="text" placeholder="Введите запись..." 
                value={entrie}
                onChange={handleChange} 
                onKeyPress={handleKeyPress}
            />
            <nav className="nav">
                <ul className="nav__list">
                    <Link className="button button-nav" to="/">Информация</Link>
                    <Link className="button button-nav" to="/entries/0" onClick={handlePagination}>Все задачи</Link>
                    <Link className="button button-nav" to="/entries-checked/0">Выполненные задачи</Link>
                </ul>
            </nav>
        </header>
    );
}

export default Controls;