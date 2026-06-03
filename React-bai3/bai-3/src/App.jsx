import { useState, useEffect, use } from "react";


function App() {
  const [count, setCount] = useState(10);
  const [IsCounting, setIsCounting] = useState(true);

  useEffect(() => {
    alert("chuong trinh flashsale bat dau")
  }, []);

  useEffect(() => {
    if (IsCounting === false) {
      return;
    }

    if (count === 0) return;

    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
      console.log("dong ho dang dem nguoc: ", count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log("dem xong");
    };
  }, [count, IsCounting]);

  return (
    <>
      <h1>san deal ngay bay gio</h1>
      {count === 0 ? (
        <h2>het thoi gian san sale</h2>
      ) : (
        <p>chuong trinh se ket thuc trong {count} giay </p>
      )}
      {count >0 && (
        <button onClick={() => {
        setIsCounting(!IsCounting)
      }}>dung</button>
      )}
      {count ===0 && (
         <button onClick={() => setCount(10)}>reset dem nguoc </button>
      )}
    </>
  );
}
export default App