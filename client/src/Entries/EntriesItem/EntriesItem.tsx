import React from 'react';
import './EntriesItem.css';

interface ObjectProps {
    item: any
    handleDelete(e: React.MouseEvent): void,
    handleChecked(e: React.MouseEvent): void,
}

const EntriesItem: React.FunctionComponent <ObjectProps> = (props) => {

    const { id, checked, content } = props.item;
    const { handleDelete, handleChecked } = props;

    return(
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

export default EntriesItem;