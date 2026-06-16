import { useState, useEffect } from "react";
import { LS } from "./utils.js";
import JoinScreen  from "./components/JoinScreen.jsx";
import ListsView   from "./components/ListsView.jsx";
import ListDetail  from "./components/ListDetail.jsx";
import HistoryView from "./components/HistoryView.jsx";

const VIEWS = { LISTS: "lists", DETAIL: "detail", HISTORY: "history" };

function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on  = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online",  on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online",  on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}

export default function App() {
  const [session,    setSession]    = useState(() => LS.get("fc_session", null));
  const [view,       setView]       = useState(VIEWS.LISTS);
  const [activeList, setActiveList] = useState(null);
  const online = useOnlineStatus();

  function openList(list) {
    setActiveList(list);
    setView(VIEWS.DETAIL);
  }

  function closeList() {
    setActiveList(null);
    setView(VIEWS.LISTS);
  }

  function handleJoin(sessionData) {
    LS.set("fc_session", sessionData);
    setSession(sessionData);
  }

  function handleLeave() {
    LS.set("fc_last_room", {
      roomId:   session.roomId,
      roomName: session.roomName || session.roomId,
    });
    LS.set("fc_session", null);
    setSession(null);
  }

  if (!session) {
    return <JoinScreen onJoin={handleJoin} />;
  }

  const screen = view === VIEWS.DETAIL && activeList
    ? <ListDetail list={activeList} session={session} onBack={closeList} />
    : view === VIEWS.HISTORY
    ? <HistoryView session={session} onBack={() => setView(VIEWS.LISTS)} />
    : <ListsView session={session} onOpen={openList} onHistory={() => setView(VIEWS.HISTORY)} onLeave={handleLeave} />;

  return (
    <>
      {!online && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
          background: "#92400e", color: "#fef3c7",
          textAlign: "center", fontSize: "0.8rem",
          padding: "6px 16px", letterSpacing: "0.01em",
        }}>
          You're offline — changes will sync when you reconnect
        </div>
      )}
      {screen}
    </>
  );
}
