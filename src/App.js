import Header from './view/Header';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import appReducer from './reducers/index'
import Main from './view/Main/index';
import Login from './view/Login/index'
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import './App.less';


const store = createStore(appReducer);

function App() {
  const f=()=>{
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  useEffect(()=>{
      window.addEventListener("beforeunload", f);
    return ()=>{
      window.removeEventListener("beforeunload", f);
    }
  },[])

  const [visible,setvisible]=useState(false)
  const Cancel=()=>{
    setvisible(false)
  }
  const doLogin=()=>{
    setvisible(true)
  }
  return (
      <Provider store={store}>
        <div className='App' >
          <Header handlelogin={doLogin} />
          <Main/>
          <Modal
            visible={visible}
            title="账密登录"
            onCancel={Cancel}
            footer={null}
          >
            <Login loginSuccess={Cancel} />
          </Modal>
          
        </div>
      </Provider>
      
  );
}

export default App;
