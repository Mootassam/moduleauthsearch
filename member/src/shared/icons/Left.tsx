import React from "react";
import whatsApp from "./whatsApp";
import telegram from "./Telegram";
import alarm from "./Alarm";
import instagram from "./Instagram";
import Message from "./Message";
import facebook from "./Facebook";
import ExtractItem from "../../utils/ExtractItem";
import twitter from "./Twitter";
import { BsImage } from "react-icons/bs";
import { AiFillAlipayCircle, AiFillWechat } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import {RiSnapchatLine} from  'react-icons/ri'
function Left() {
  let whats = ExtractItem.getItem(whatsApp);
  let teleg = ExtractItem.getItem(telegram);
  let instag = ExtractItem.getItem(instagram);
  let message = ExtractItem.getItem(Message);
  let wechat = <AiFillWechat  />
  let alipay = <AiFillAlipayCircle size={13} />
  let tiktok = <FaTiktok size={11} />
  let snapchat = <RiSnapchatLine size={13} />
  let twitt = ExtractItem.getItem(twitter);
  let data = ExtractItem.convertToArray(
    whats,
    teleg,
    instag,
    message,
    wechat,
    alipay,
    twitt,
    snapchat,
    tiktok,
  );

  return <>{data}</>;
}

export default Left;
