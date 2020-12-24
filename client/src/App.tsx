import React from 'react';
import './App.css';

import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import Info from './Info/Info';

import Controls from './Controls/Controls';
import Entries from './Entries/Entries';
import Pagination from './Pagination/Pagination';

const REQUEST_URL = 'http://localhost:8081/api/entries';
const REQUEST_URL_CHECKED = 'http://localhost:8081/api/entries-checked';

interface Entrie {
  id: number,
  content: string,
  checked: boolean
}

interface PaginationEntrie {
  start: number,
  end: number
}

const App: React.FunctionComponent = () => {
  const [entries, setEntries] = useState <Entrie[]> ([]);
  const [entriesChecked, setEntriesChecked] = useState <Entrie[]> ([]);
  const [pagination, setPagination] = useState <PaginationEntrie> ({ start: 0, end: 5 });

  // Функция handleErrpor(err: any) получает в качетсве
  // аргумента объект ошибки и выводит в консоль 
  // данные о ней
  const handleError = (err: any): void => {
    console.error(err.message);
    console.log(err);
  }

  // ------------------------------------------------------------------------
  // Функция getEntries(url : String)
  // принимает в качестве аргумента строку URL 
  // и делает запрос на сервер, после чего
  // с помощью функцияя setEntries(<Array>)
  // выставляет полученный массив записей в состояние entries.

  const getEntries = async (url: string) => {
    try {
      const response = await fetch(url);
      const result = await response.json();

      setEntries(result);
    } catch (err) {
      handleError(err);
    }
  }
  
  // ------------------------------------------------------------------------
  // useEffect вызывает функцию
  // getEntries(url : String) при рендеринге страницы.

  useEffect(() => {
    getEntries(REQUEST_URL);
  }, []);

  // ------------------------------------------------------------------------
  // Функция getId(arr : any[]) возвращает порядковый номер записи
  // getId принимает в качестве аргумента массив, на основе которого
  // возвращает инкрементированый id типа number последнего элемента.

  const getId = (arr: any[]): number => (arr.length !== 0) ? arr[arr.length - 1].id + 1 : 0;

  // ------------------------------------------------------------------------
  // Функция creqteEntrieFunc(entrie: string, entries: any[]): Entrie принимает
  // в качестве аргументов строку entrie(что получаем из input) и массив записей entries
  // после чего возвращает объект с полями id, content, checked, где id является 
  // результатом вызова фукции getId(entries)

  const createEntrieFunc = (entrie: string, entries: any[]): Entrie => {
    return {
      id: getId(entries),
      content: entrie,
      checked: false,
    };
  }

  // ------------------------------------------------------------------------
  // Функция setEntrieOnServer(url: string, entries: Entrie) создаёт новую запись в DB

  const setEntrieOnServer = async (url : string, entrie: Entrie) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(entrie)
    };

    try {
      await fetch(url, options);
    
    } catch (err) {
      handleError(err);
    } 
  }

  // ------------------------------------------------------------------------
  // Функция addHandle(entrie: string) принимает в качестве аргумента строку.
  // Клонирует массив entries и создаёт объект createEntrie
  // на основе полученных данных с поля ввода
  // и функции createEntrieFunc(entrie: Entrie, entries: any[])
  // После чего объединяет копию массива и новые данные
  // а затем выставляет новый массив записей в state
  // при помощи функции setEntries(<any[]>)
  // и создаёт новую запись в DB при помощи setEntrieOnSrver(url: string, createEntrie: Entrie).

  const addHandle = (entrie: string): void => {
    let cloneEntries: any[] = [...entries];
    let createEntrie: Entrie = createEntrieFunc(entrie, entries);

    cloneEntries = cloneEntries.concat([], createEntrie);
    
    setEntries(cloneEntries);
    setEntrieOnServer(REQUEST_URL, createEntrie);
  }

  // ------------------------------------------------------------------------
  // Функция deleteEntrieFromServer(id: number) в качестве аргумента принимает id
  // и делавет запрос к DB и удаляет запись соответствующую id

  const deleteEntrieFromServer = async (id: number) => {
    const deleteURL: string = `${REQUEST_URL}/${id}`;
    
    try {
      await fetch(deleteURL, { method: 'DELETE' });

    } catch (err) {
      handleError(err);
    }
  }

  // ------------------------------------------------------------------------
  // Функция deleteHandle(id: number) в качетве аргумента принимает id 
  // и удаляет соответствующее представление

  const deleteHandle = (id: number): void => {
    let cloneEntries: Entrie[], filterEntries: Entrie[];

    cloneEntries = [...entries];
    filterEntries = cloneEntries.filter(item => item.id !== id);
    
    setEntries(filterEntries);
    deleteEntrieFromServer(id);
  }

  // ------------------------------------------------------------------------
  // Функция checkedEntrieOnServer (id: number, entrie: Entrie) 
  // принимает в качестве аргумента id записи и саму изменяемую запись entrie 
  // и на основе полученных данных делает (PATCH) запрос к DB

  const checkedEntrieOnServer = async (id: number, entrie: Entrie) => {
    const CHECKED_URL: string = `${REQUEST_URL}/${id}`;
    const OPTIONS = { 
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: entrie.id,
        content: entrie.content,
        checked: entrie.checked,
      }) 
    }

    try {
      await fetch(CHECKED_URL, OPTIONS);

    } catch (err) {
      handleError(err);
    }
  }

  // ------------------------------------------------------------------------
  // Функция checkedHandle(id: number) принимает в качестве атрибута id записи
  // создаёт копию массива entries выбирает запись этого массива, 
  // которая соответствует id и выставляет свойство checked(true || false)
  // С помощью функции checkedEntrieOnServer(id, entrie) делает (PATCH) запрос к DB
  
  const checkedHandle = (id: number): void => {
    let cloneEntries: any[], cloneEntriesChecked: any[], selectedEntrie: Entrie;
    
    cloneEntries = [...entries];
    cloneEntries.map(item => item.id === id ? item.checked = !item.checked : item);
    
    cloneEntriesChecked = [...entriesChecked];
    cloneEntriesChecked = cloneEntries.filter((item, i) => {
      if (item.checked === true || item.checked === 1) {
          return item;
      }
    });

    setEntries(cloneEntries);
    setEntriesChecked(cloneEntriesChecked);

    selectedEntrie = cloneEntries.find(item => item.id === id);
    
    checkedEntrieOnServer(id, selectedEntrie);
  }

  // ------------------------------------------------------------------------
  // Функция handlePagination(start: number, end: number) принимает в качестве 
  // аргумента два числа start и end, где start 1-й элемент на странице и end 
  // соответственно замыкающий и выставляет state на основе полученных данных

  const handlePagination = (start: number, end: number) => {
    let clonePagination = {...pagination};

    clonePagination.start = start;
    clonePagination.end = end;

    setPagination(clonePagination);
  }


  // ------------------------------------------------------------------------
  // Функция getCheckedEntries делает (GET)запрос к DB и получает все записи,
  // которые были отмечены, как выполненно.
  // И выставляет их в state при помощи функции setEntrieChecked

  const getCheckedEntries = async () => {
    const response = await fetch(REQUEST_URL_CHECKED);
    const result = await response.json();

    setEntriesChecked(result);
  }

  // ------------------------------------------------------------------------
  // useEffect вызывает функцию
  // getCheckedEntries(url : String) при рендеринге страницы.

  useEffect(() => {
    getCheckedEntries();
  }, [])

  return (
    <>
      <div className="container">
        <Controls onAdd={addHandle} onPagination={handlePagination}/>

        {/* INFO PAGE */}
        <Route exact path="/">
          <Info />
        </Route>

        {/* ENTRIES PAGE */}
        <Route path="/entries">
          <Entries onDelete={deleteHandle} onChecked={checkedHandle} pagination={pagination} entries={entries}/>
          <Pagination onPagination={handlePagination} entries={entries}/>
        </Route>

        {/* COMPLITE ENTRIES PAGE */}
        <Route path="/entries-checked">
          <Entries onDelete={deleteHandle} onChecked={checkedHandle} pagination={pagination} entries={entriesChecked}/>
          <Pagination onPagination={handlePagination} entries={entriesChecked}/>
        </Route>        
      </div>
    </>
  );
}

export default App;
