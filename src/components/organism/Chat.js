/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

export function ChatScreen(props) {
  const [messages, setMessages] = useState([]);
  const id = props.route.params.id;
  const name = props.route.params.name;

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello ' + name,
        createdAt: new Date(),
        quickReplies: {
          type: 'checkbox', // or 'checkbox',
          values: [
            {
              title: '😋 Yes',
              value: 'yes',
            },
            {
              title: '📷 Yes, let me show you with a picture!',
              value: 'yes_picture',
            },
            {
              title: '😞 Nope. What?',
              value: 'no',
            },
          ],
        },
        user: {
          _id: 2,
          name: 'React Native',
          avatar:
            'https://icons.iconarchive.com/icons/hopstarter/bioman/256/Bioman-Avatar-2-Green-icon.png',
        },
      },
    ]);
  }, [name]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.prepend(previousMessages, messages),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showAvatarForEveryMessage={true}
      messagesContainerStyle={{backgroundColor: 'white'}}
      placeholder="Tulisnya disini yaaa..."
      user={{
        _id: id,
        name: name,
        avatar:
          'https://icons.iconarchive.com/icons/hopstarter/bioman/256/Bioman-Avatar-2-Green-icon.png',
      }}
    />
  );
}
