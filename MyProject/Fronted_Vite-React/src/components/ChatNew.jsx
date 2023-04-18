import React from 'react'
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from "react-chat-engine-advanced";

const projectId = "82aabb46-60e7-416d-81de-705edb5e7724"
const username = "UZGjz6VcKwmA4Lwo7wXn";
const secret = "123456789";

function ChatNew() {
  const chatProps = useMultiChatLogic(projectId, username, secret);
  return (
    <>
      <MultiChatSocket {...chatProps} />

      <MultiChatWindow 
        chats={chatProps.chats}
        messages={chatProps.messages}
        activeChatId={chatProps.activeChatId}
        username={chatProps.username}
        peopleToInvite={chatProps.peopleToInvite}
        hasMoreChats={chatProps.hasMoreChats}
        hasMoreMessages={chatProps.hasMoreMessages}
        onChatFormSubmit={chatProps.onChatFormSubmit}
        onChatCardClick={chatProps.onChatCardClick}
        onChatLoaderShow={chatProps.onChatLoaderShow}
        onMessageLoaderShow={chatProps.onMessageLoaderShow}
        onMessageLoaderHide={chatProps.onMessageLoaderHide}
        onBottomMessageShow={chatProps.onBottomMessageShow}
        onBottomMessageHide={chatProps.onBottomMessageHide}
        onMessageFormSubmit={chatProps.onMessageFormSubmit}
        onInvitePersonClick={chatProps.onInvitePersonClick}
        onRemovePersonClick={chatProps.onRemovePersonClick}
        onDeleteChatClick={chatProps.onDeleteChatClick}
        style={{ height: '100vh' }} 
      />
    </>
  );
}

export default ChatNew;