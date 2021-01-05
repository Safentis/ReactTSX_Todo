import React from 'react';
import './EntriesItem.css';

import Button from '../../Button/Button';

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
                <Button buttonClass="button__delete item__button" int={id} handle={handleDelete}>
                    Удалить
                </Button>
                <Button buttonClass={`button button__complite item__button ${checked ? 'button__complite_checked' : ''}`} 
                    int={id} 
                    complite={checked} 
                    handle={handleChecked}
                >
                    Выполненно
                </Button>
            </div>
        </li>
    )
}

export default EntriesItem;