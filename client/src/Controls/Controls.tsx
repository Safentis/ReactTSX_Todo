import React from 'react';
import './Controls.css';

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import handlePathname from '../Utils/handlePathname';
import Button from '../Button/Button';

interface ObjectProps {
    onAdd(entrie: string): void,
    onPagination(start: number, end: number): void,
}

const Controls: React.FunctionComponent <ObjectProps> = (props) => {
    const { onAdd, onPagination } = props;
    const [entrie, setEntrie] = useState <string> ('');
    const $ul = useRef <HTMLUListElement> (null);

    // ------------------------------------------------------------------------
    // Функция handleChange(e: React.ChangeEvent <HTMLInputElement>) обрабатывет
    // введённый данные в текстовое поле и с помощью функции setEntrie(<string>) 
    // выставляет полученный данные в state 

    const handleChange = (e: React.ChangeEvent <HTMLInputElement>): void => {
        setEntrie(e.target.value);
    }

    // ------------------------------------------------------------------------
    // Функция handleKeyPres обрабатывет нажатие клавиши Enter
    // после чего передаёт значение тектового поля функции onAdd(<string>)
    // затем, обнуляет state текстового поля

    const handleKeyPress = (e: React.KeyboardEvent): void => {
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

    const handlePagination = (e: React.MouseEvent): void => {
        const [start, end] = handlePathname(e);

        onPagination(start, end);
    }

    // ------------------------------------------------------------------------
    // Функция

    const handleActive = (e: React.MouseEvent): void => {
        let target = e.target as HTMLUListElement;
        
        if (!target.matches('a')) return;
        
        let buttons = $ul.current?.querySelectorAll('button');
        let button = target.closest('button')

        buttons?.forEach(item => {
            if (item.classList.contains('button_active')) {
                item.classList.remove('button_active');
            }
        });

        button?.classList.add('button_active');
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
                <ul className="nav__list" ref={$ul} onClick={handleActive}>
                    <Button buttonClass="button-nav button_active">
                        <Link className="button-link" to="/">
                            Информация
                        </Link>
                    </Button>
                    <Button buttonClass="button-nav">
                        <Link className="button-link" to="/entries/0" onClick={handlePagination}>
                            Все задачи
                        </Link>
                    </Button>
                    <Button buttonClass="button-nav">
                        <Link className="button-link" to="/entries-checked/0" onClick={handlePagination}>
                            Выполненные задачи
                        </Link>
                    </Button>
                </ul>
            </nav>
        </header>
    );
}

export default Controls;