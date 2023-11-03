'use client'

import { useState, useEffect, useContext, useRef, useReducer, useMemo, useCallback, memo } from 'react';

import Context from '../components/Context';

type ChildComponentProps = {
  name: string;
  handleClick: any;
}
const ChildComponent = memo(function ChildComponentFC({ name, handleClick }: ChildComponentProps){
  console.log(`子コンポーネント「${name}」がレンダリングされました`);
  return <button onClick={handleClick} className="bg-gray-300 hover:bg-gray-400 text-sm p-2.5 rounded">{name} +</button>;
});

export default function Home() {
  // useState
  const [count, setCount] = useState(0);
  const add = () => setCount((i) => i + 1);
	const subtract = () => setCount((i) => i - 1);

  // useEffect
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async() => {
      const response = await fetch("https://api.github.com/users/imwinterer");
      const data = await response.json();
      setUser(data.login);
    })()
  }, []);

  // useState, useEffect
  const [deg, setDeg] = useState(0);
  useEffect(() => {
    setDeg(deg => deg + 45);
  }, [count]);

  // useContext
  const context = useContext(Context);

  // useRef
  const inputRef = useRef<HTMLInputElement>(null);
  const alertRef = () => {
    if (inputRef.current) {
      console.log(inputRef.current.value);
    }
  };

  // useState, useEffect, useRef
  const firstRenderRef = useRef(true);
  const [deg2, setDeg2] = useState(0);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    setDeg2(deg2 => deg2 + 45);
  }, [count]);

  // useReducer
  const reducerFunc = (state: any, action: any) => {
    switch(action.type) {
      case 'add':
        return state + 1;
      case 'subtract':
        return state - 1;
      case 'reset':
        return 0
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducerFunc, 0);

  // useMemo
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const result1 = () => setCount1(count1 + 1);
  const result2 = () => setCount2(count2 + 1);

  const square = useMemo(() => {
    let i = 0
    while (i < 1000000000) i++
    return count2 * count2
  }, [count2]);


  // useCallback
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  const result3 = useCallback(() => {
    setCount3(count3 + 1);
  }, [count3]);
  const result4 = useCallback(() => {
    setCount4(count4 + 1);
  }, [count4]);
  

  return (
    <>
      <div className="py-20 border-b border-gray-300">
        <h1 className="text-2xl tracking-wider text-center">useState</h1>
        <div className="mt-8 flex items-center justify-center gap-x-20">
          <button onClick={subtract} className="bg-gray-300 hover:bg-gray-400 text-xl pt-1 pb-2 px-4 rounded">-</button>
          <p className="text-xl" >{count}</p>
          <button onClick={add} className="bg-gray-300 hover:bg-gray-400 text-xl py-2 px-4 rounded">+</button>
        </div>
      </div>
      
      
      <div className="py-20 border-b border-gray-300">
        <h1 className="text-2xl tracking-wider text-center">useEffect</h1>
        <p className="mt-8 text-lg tracking-wider text-center">マウント時githubユーザー名取得<br/>(取得回数の限度を超えている場合は403エラー)<br/>ユーザー：{user}</p>
      </div>
      

      <div className="py-20 border-b border-gray-300">
        <h1 className="text-2xl tracking-wider text-center">useState, useEffect</h1>
        <p className="mt-8 text-lg tracking-wider text-center">useStateのカウント増減すると下の長方形が回転<br/>マウント時にも回転する</p>
        <div className="w-8 h-1 mt-8 mx-auto bg-gray-400" style={{transform: `rotate(${deg}deg)`}}></div>
      </div>
      

      <div className="py-20 border-b border-gray-300">
        <h1 className="text-2xl tracking-wider text-center">useContext</h1>
        <p className="mt-8 text-lg tracking-wider text-center">{context}</p>
      </div>
      

      <div className="py-20 border-b border-gray-300">
        <h1 className="text-2xl tracking-wider text-center">useRef</h1>
        <div className="mt-8 flex justify-center gap-x-4">
          <input type="text" className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={inputRef} />
          <button onClick={alertRef} className="bg-gray-300 hover:bg-gray-400 text-sm p-2.5 rounded">現在の値をアラート表示</button>
        </div>
      </div>
      

      <div className="py-20 border-b border-gray-300">
        <h1 className="text-2xl tracking-wider text-center">useState, useEffect, useRef</h1>
        <p className="mt-8 text-lg tracking-wider text-center">useStateのカウント増減すると下の長方形が回転<br/>マウント時には回転しない</p>
        <div className="w-8 h-1 mt-8 mx-auto bg-gray-400" style={{transform: `rotate(${deg2}deg)`}}></div>
      </div>
      

      <div className="py-20 border-b border-gray-300">
        <h1 className="text-2xl tracking-wider text-center">useReducer</h1>
        <div className="mt-8 flex items-center justify-center gap-x-20">
          <button onClick={() => dispatch({type: 'subtract'})} className="bg-gray-300 hover:bg-gray-400 text-xl pt-1 pb-2 px-4 rounded">-</button>
          <p className="text-xl" >{state}</p>
          <button onClick={() => dispatch({type: 'add'})} className="bg-gray-300 hover:bg-gray-400 text-xl py-2 px-4 rounded">+</button>
        </div>
        <div className="mt-5 flex items-center justify-center gap-x-8">
          <button onClick={() => dispatch({type: 'reset'})} className="bg-gray-300 hover:bg-gray-400 text-sm p-2.5 rounded">リセット</button>
        </div>
      </div>
      

      <div className="py-20 border-b border-gray-300">
        <h1 className="text-2xl tracking-wider text-center">useMemo</h1>
        <p className="mt-8 text-lg tracking-wider text-center">カウント2をメモ化<br/>カウント2が更新されるときだけ重い処理が走る<br/>(1000000000回 i++の後カウント)<br/>メモ化しないとカウント1更新時も処理が走る</p>
        <p className="mt-5 text-lg tracking-wider text-center">カウント1: {count1}<br/>カウント2: {count2}<br/>カウント2の2乗: {square}</p>
        <div className="mt-5 flex items-center justify-center gap-x-8">
          <button onClick={result1} className="bg-gray-300 hover:bg-gray-400 text-sm p-2.5 rounded">カウント1 +</button>
          <button onClick={result2} className="bg-gray-300 hover:bg-gray-400 text-sm p-2.5 rounded">カウント2 +</button>
        </div>
      </div>
      

      <div className="py-20 border-b border-gray-300">
        <h1 className="text-2xl tracking-wider text-center">useCallback</h1>
        <p className="mt-8 text-lg tracking-wider text-center">関数をメモ化し不要な再レンダリングを防ぐ<br/>子コンポーネントをメモ化してあげる必要あり<br/>ボタンを押すと対応したコンポーネントのみconsole.log()実行</p>
        <p className="mt-5 text-lg tracking-wider text-center">カウント1: {count3}<br/>カウント2: {count4}</p>
        <div className="mt-5 flex items-center justify-center gap-x-8">
          <ChildComponent name="useCallBack カウンタ1" handleClick={result3} />
          <ChildComponent name="useCallBack カウンタ2" handleClick={result4} />
        </div>
      </div>
    </>
  )
}
