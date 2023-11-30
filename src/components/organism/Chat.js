/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useState, useCallback, useEffect} from 'react';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
} from 'react-native-gifted-chat';
import {QuickReplies} from 'react-native-gifted-chat/lib/QuickReplies';

export function ChatScreen(props) {
  const [messages, setMessages] = useState([]);
  const id = props.route.params.id;
  const name = props.route.params.name;

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Tanya cepat ' + name,
        createdAt: new Date(),
        system: false,
        quickReplies: {
          type: 'radio', // or 'checkbox',
          values: [
            {
              _id: 4,
              createdAt: new Date(),
              title: '🗓️ Hari ini jualan ga ' + name + '?',
              text: '🗓️ Hari ini jualan ga ' + name + '?',
              user: {
                _id: id,
                name: name,
              },
            },
            {
              _id: 3,
              createdAt: new Date(),
              title: '📍 Posisi dimana ' + name + '?',
              text: '📍 Posisi dimana ' + name + '?',
              user: {
                _id: id,
                name: name,
              },
            },
          ],
        },
        user: {
          _id: 2,
          name: name,
          avatar:
            'https://ui-avatars.com/api/?background=0dbc3f&color=FFF&name=${' +
            name +
            '}',
        },
      },
    ]);
  }, [id, name]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showAvatarForEveryMessage={true}
      messagesContainerStyle={{backgroundColor: 'white'}}
      placeholder="Tulisnya disini yaaa..."
      onQuickReply={messages => onSend(messages)}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderQuickReplies={renderQuickReplies}
      user={{
        _id: id,
        name: name,
      }}
    />
  );
}

function renderBubble(props) {
  return (
    <Bubble
      {...props}
      textStyle={{
        left: {
          fontFamily: 'Raleway-Regular',
        },
        right: {
          fontFamily: 'Raleway-Regular',
        },
      }}
    />
  );
}

function renderInputToolbar(props) {
  return (
    <InputToolbar
      {...props}
      renderComposer={props => {
        return (
          <Composer
            {...props}
            textInputStyle={{fontFamily: 'Raleway-Regular'}}
          />
        );
      }}
    />
  );
}

function renderQuickReplies(props) {
  return (
    <QuickReplies
      {...props}
      quickReplyTextStyle={{fontFamily: 'Raleway-Regular'}}
    />
  );
}
