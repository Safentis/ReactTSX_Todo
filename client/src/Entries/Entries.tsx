import React from 'react';
import './Entries.css';

import { useRef } from 'react';
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

    return (
        <ul className="list" ref={listElementRef}>
            {entries.map((item, i) => {

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