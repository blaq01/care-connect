import React, { useEffect, useRef } from 'react';
import { View, Button, Text } from 'react-native';
import { RtcEngine, AgoraView } from 'react-native-agora';
import AgoraUIKit from 'agora-rn-uikit';

const VideoCallScreen = () => {
  let rtcProps = {
    appid: '8f1389a78f4f4e4cb163179433c1b814',
    channel: 'test',
  }
  return <AgoraUIKit rtcProps={rtcProps} />
};

export default VideoCallScreen;
