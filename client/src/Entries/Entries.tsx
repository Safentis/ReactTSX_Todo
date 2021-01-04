import React from 'react';
import './Entries.css';

import { useRef } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import EntriesItem from './EntriesItem/EntriesItem';

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
    const { pagination, entries, onDelete, onChecked } = props;
    const listElementRef = useRef <HTMLUListElement> (null);

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

    const location = useLocation();

    return (
        <ul className="list" ref={listElementRef}>
            {entries.map((item, i) => {
                // if (listElementRef.current?.children.length === 1 && entries.length > 1) {
                //     pagination.start -= 5;
                //     pagination.end -= 5;
                //     <Redirect to={{ pathname: "/entries/0", state: { from: location } }} />
                // }

                if (i >= pagination.start && i < pagination.end) {
                    
                    return (
                        <EntriesItem key={i} item={item} handleDelete={handleDelete} handleChecked={handleChecked}/>
                    )
                }
                
            })}
        </ul>
    )
}

export default Entries;