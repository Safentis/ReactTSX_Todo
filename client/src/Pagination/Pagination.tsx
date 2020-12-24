import React from 'react';
import './Pagination.css';

import { Link } from 'react-router-dom';
import handlePathname from '../Utils/handlePathname';

interface ObjectProps {
    entries: any [],
    onPagination(start: number, end: number): void,
}

const Pagination: React.FunctionComponent <ObjectProps> = (props) => {
    const { entries, onPagination } = props;

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

    return(
        <>
            <ul className="pagination">
                {
                    entries.map((item, i) => {
                        if (entries.length < 4) return;
                        if ((i % 5) === 0) {
                            let location: any = window.location.pathname.match(/\d/ig);
                            let page: number = Number(location?.join(''));
                            let pathName: string = window.location.pathname.replace(/\d/ig, '');

                            return(
                                <li className="pagination__item" key={i}>
                                    <Link className={`pagination__link ${page === i ? 'pagination__item_active' : ''}`} 
                                        to={`${pathName}${i}`} 
                                        onClick={handlePagination}>

                                    </Link>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}

export default Pagination;