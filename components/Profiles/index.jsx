import React from "react";
import ProfileSection from "./ProfileSection";
import ImagesCarousel from "./ImagesCarousel";
import Notifications from "./Notification";
import NftValues from "./NftValues";
import Collapse from "./Collapse";
import FlowFeeds from "../Flow/index";
import Circle from "./Circle";
import ChatRoom from "../Chat/ChatRoom";
import Space from "../Space/index";
import Wallets from "../BranchWallet/tokenWallet";
import WalletsHead from "./WalletsHead";
import Pools from "../BranchWallet/Pools";
import ExchangeToken from "../BranchWallet/ExchangeToken";
import NewSendToken from "../BranchWallet/NewSendToken";
import AddLiquidity from "../BranchWallet/AddLiquidity";
import RecieveToken from "../BranchWallet/RecieveToken";


import { useState } from "react";
import CircleList from "./CircleList";
import LogOut from "./LogOut";


// type Props = {
// }
// const [toggle,setToggle] = React.useState<boolean>(false)

function Index() {
  const [isToggle, setToggle] = useState(false);
  const [doubleclicked, setDoubleClicked] = useState(false);
  const [isOpenWallet, setOpenWallet] = useState(false);

  const [isUpload, setUpload] = React.useState(false);

  const [isExchange, setExchange] = React.useState(false);

  const [isPool, setPool] = React.useState(false);

  const [isLiquidity, setLiquidity] = React.useState(false);

  const [isRecieved, setRecieved] = React.useState(false);
  const [isCircle, setCircle] = React.useState(false);

  const [isLogout, setLogout] = React.useState(false);
  const logOutUser = () => {
    setLogout((prevState) => !prevState)
  }

  let zIndex;
  isLogout ? (zIndex = 1) : (zIndex = -6)

  const switchCircle = () => {
    setCircle((prevState) => !prevState);
    setToggle((prevState) => !prevState)
  };

  const changeUpload = () => {
    setUpload((prevState) => !prevState);
  };
  const changeExchange = () => {
    setExchange((prevState) => !prevState);
  };
  const changePool = () => {
    setPool((prevState) => !prevState);
  };
  const changeLiquidity = () => {
    setLiquidity((prevState) => !prevState);
  };
  const changeRecieve = () => {
    setRecieved((prevState) => !prevState);
  };
  


  // change toggle state
  const toggleClick = () => {
    setToggle((prevState) => !prevState);
    // change toggle state
  };
  let index
  // isToggle  ? index= -1 : index=1
  isCircle  ? index= -1 : index=1


  const doubleClick = (e) => {
    if (e.detail == 2) {
      setDoubleClicked((prevState) => !prevState);
    }
  };
  const removeCircle = (e) => {
    if (e.detail == 1) {
      setDoubleClicked((prevState) => !prevState);
    }
  };
  const openWallet = () => {
    setOpenWallet((prevState) => !prevState);
    console.log(isOpenWallet);
  };
  

  const wallet = (
    <Wallets
      upload={changeUpload}
      exchange={changeExchange}
      pool={changePool}
      liquidity={changeLiquidity}
      changeAction={setToggle}
      toggle={isToggle}
      toggleWallet={openWallet}
      recieved={changeRecieve}
    />
  );
  return (
    <div id="profile" className=" bg-[black] flex  h-[100vh]">
      {isToggle && (
        <div>
           {!isOpenWallet ? (
            <div>
              {/* <NewProfile
                toggle={toggleClick}
                doubleClick={doubleClick}
                wallet={openWallet}
              /> */}
              <ProfileSection toggle={toggleClick}  />
            <ImagesCarousel doubleClick={doubleClick} switch={switchCircle} />
            <WalletsHead wallet={openWallet} />
            <NftValues />
            <Notifications logOutUser={logOutUser} />
              <tokenWallet />
            </div>
          ) : (
            <div>
              {wallet}
              {isExchange && (
                <ExchangeToken exchange={changeExchange} toggleWallet={openWallet} />
              )}
              {isUpload && (
                <NewSendToken upload={changeUpload} toggleWallet={openWallet} />
              )}
              {isPool && <Pools pool={changePool} toggleWallet={openWallet} />}
              {isLiquidity && (
                <AddLiquidity
                  liquidity={changeLiquidity}
                  toggleWallet={openWallet}
                />
              )}
              {isRecieved && (
                <RecieveToken
                  recieved={changeRecieve}
                  toggleWallet={openWallet}
                />
              )}
            </div>
          )}
        </div>
      )}
      { isCircle && <CircleList 
    switched={switchCircle} 
      
      /> }
      <LogOut zIndex={zIndex} revert={logOutUser} />


      {!isToggle && <Collapse toggle={toggleClick} Toggle={isToggle} circle={isCircle} index={index}/>}
      {/* <ChatRoom circle={doubleclicked} removeCircle={removeCircle} /> */}

      {/* <div className=" w-[59%] h-[100vh]  overflow-y-scroll poppins position-absolute left-542.52px">
        <FlowFeeds />
      </div> */}
      {/* <div className=" w-[39%] h-[100vh]  overflow-y-scroll poppins position-absolute left-542.52px">
        <Space />
      </div> */}

      <Circle circle={doubleclicked} removeCircle={removeCircle} />
      
    </div>
  );
}

export default Index;
