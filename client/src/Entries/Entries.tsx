import React from 'react';
import './Entries.css';

interface ObjectProps {
    entries: any[],
    pagination: {
        start: number,
        end: number
    },
    onDelete(id: number): void,
    onChecked(id: number): void,
}

const Entries: React.FunctionComponent <ObjectProps> = (props) => {
    const { entries, pagination, onDelete, onChecked } = props;


    const handleDelete = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        const id: number = Number(target.dataset.int);

        onDelete(id);
    }


    const handleChecked = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        const id: number = Number(target.dataset.int);
        
        onChecked(id);
    }

    return (
        <ul className="list">
            {entries.map(({id, content, checked}, i) => {

                if (i >= pagination.start && i < pagination.end) {
                    return (
                        <li className={`item list__item ${checked ? 'item_checked' : ''}`} key={id}>
                            <p className={`item__content ${checked ? 'item__content_checked' : ''}`}>
                                {content}
                            </p>
                            <div className="item__controls">
                                <button className="button button__delete item__button" type="button" 
                                    data-int={id} 
                                    onClick={handleDelete}
                                >
                                    удалить
                                </button>
                                <button className={`button button__complite item__button ${checked ? 'button__complite_checked' : ''}`} type="button" 
                                    data-int={id} 
                                    data-complite={checked} 
                                    onClick={handleChecked}
                                >
                                    выполненно
                                </button>
                            </div>
                        </li>
                    )
                }
            })}
        </ul>
    )
}

export default Entries;