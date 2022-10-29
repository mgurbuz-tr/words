import { useEffect, useState } from 'react';
import './App.css';
import RangeComponent from './Components/RangeComponent';
import WordComponent from './Components/WordComponent';
import jsonData from './utils/words.json';

function App() {

  const [jsonDatas, setJsonDatas] = useState<object>();
  const [startVal, setStartVal] = useState<number>();
  const [endVal, setEndVal] = useState<number>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRangeComponent, setIsRangeComponent] = useState(true);
  const [isShowWordComponent, setIsShowWordComponent] = useState(false);




  function rangeComponent_onClick(startVal: number, endVal: number): void {
    setStartVal(startVal);
    setEndVal(endVal);
  }

  function getEnWord(currentIndex: number): string {
    return Object.keys(jsonDatas as any)[currentIndex];
  }

  function getTrWord(currentIndex: number): string {
    return Object.values(jsonDatas as any)[currentIndex] as string;
  }

  useEffect(() => {
    const datas = JSON.parse(JSON.stringify(jsonData));
    console.log(datas);
    setJsonDatas(datas);

  }, []);

  useEffect(() => {
    if (startVal == null || endVal == null)
      return;
    setIsRangeComponent(false);
    setCurrentIndex(startVal);
    setIsShowWordComponent(true)
  }, [startVal, endVal]);


  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      {isRangeComponent && <RangeComponent onClick={rangeComponent_onClick} />}
      {isShowWordComponent && <WordComponent enWord={getEnWord(currentIndex)} trWord={getTrWord(currentIndex)} onSuccess={() => { setCurrentIndex(currentIndex + 1) }} />}
    </div>
  );
}

export default App;
